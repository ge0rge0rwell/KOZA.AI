import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';
import { useUI } from './UIContext';
import * as dbApi from '../lib/db';
import { db } from '../lib/firebase';
import { truncate, randomId, todayKey } from '../utils/helpers';
import { maskProfanity } from '../utils/safety';
import { analytics } from '../lib/analytics';
import { SEED_COMMUNITY } from '../config/seedContent';

const StoryContext = createContext(null);

const CREATIONS_KEY = 'koza-creations';
const LOCAL_COMMUNITY_KEY = 'koza-community-local';
const INTERACTIONS_KEY = 'koza-interactions';

const loadJSON = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

const loadInteractions = () => loadJSON(INTERACTIONS_KEY, { hearted: [], hugged: [], read: [] });

/** Gerçek öğeleri tohumların üstüne birleştirir; id ile tekilleştirir. */
const mergeCommunity = (real, seeds) => {
    const map = new Map();
    real.forEach((i) => map.set(String(i.id), i));
    seeds.forEach((i) => { if (!map.has(String(i.id))) map.set(String(i.id), i); });
    return [...map.values()];
};

export const StoryProvider = ({ children }) => {
    const { user: authUser } = useAuth();
    const { profile, awardOz, bump } = useUser();
    const { addToast } = useUI();

    const cloudReady = Boolean(authUser && !authUser.local && db);

    const [creations, setCreations] = useState(() => loadJSON(CREATIONS_KEY, []));
    /* Topluluk: gerçek öğeler + tohumlar (tohumlar altta, gerçekler üstte) */
    const [community, setCommunity] = useState(() => {
        const local = db ? [] : loadJSON(LOCAL_COMMUNITY_KEY, []);
        return mergeCommunity(local, SEED_COMMUNITY);
    });
    const [communityLoading, setCommunityLoading] = useState(() => Boolean(db));
    const [interactions, setInteractions] = useState(loadInteractions);

    /* ---------- Kalıcılık ---------- */
    useEffect(() => {
        localStorage.setItem(CREATIONS_KEY, JSON.stringify(creations.slice(0, 100)));
    }, [creations]);

    useEffect(() => {
        localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(interactions));
    }, [interactions]);

    /* ---------- Bulut: kişisel eserler ---------- */
    useEffect(() => {
        if (!cloudReady) return undefined;
        return dbApi.subscribeCreations(authUser.uid, (cloudItems) => {
            setCreations((local) => {
                const map = new Map();
                local.forEach((c) => map.set(String(c.id), c));
                cloudItems.forEach((c) => map.set(String(c.id), c));
                return [...map.values()].sort(
                    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                );
            });
        });
    }, [cloudReady, authUser]);

    /* ---------- Bulut: topluluk (tohumlar anında, gerçekler üstte) ---------- */
    useEffect(() => {
        if (!cloudReady) return undefined;
        return dbApi.subscribeCommunity((items) => {
            const real = (items || []).filter((i) => (i.reports || 0) < 3);
            setCommunity(mergeCommunity(real, SEED_COMMUNITY));
            setCommunityLoading(false);
        });
    }, [cloudReady]);

    /* ---------- Eser kaydetme ---------- */
    const saveCreation = useCallback(
        (content, userInput) => {
            const creation = {
                id: randomId(),
                ...content,
                userInput,
                sharedId: null,
                createdAt: new Date().toISOString(),
            };
            setCreations((prev) => [creation, ...prev]);

            const counterByType = { story: 'storiesCreated', game: 'gamesCreated', letter: 'lettersCreated' };
            bump(counterByType[content.type]);
            awardOz(`create_${content.type}`, `${content.title}`);
            analytics.event('creation_made', { type: content.type, source: content.source });

            if (cloudReady) dbApi.saveCreation(authUser.uid, creation).catch((e) => console.error('Eser kaydı:', e));
            return creation;
        },
        [cloudReady, authUser, awardOz, bump]
    );

    const removeCreation = useCallback(
        (id) => {
            setCreations((prev) => prev.filter((c) => String(c.id) !== String(id)));
            if (cloudReady) dbApi.deleteCreation(authUser.uid, id).catch((e) => console.error('Eser silme:', e));
        },
        [cloudReady, authUser]
    );

    const getCreation = useCallback(
        (id) => creations.find((c) => String(c.id) === String(id)) || null,
        [creations]
    );

    /* ---------- Toplulukla paylaşma (anonim) ---------- */
    const shareCreation = useCallback(
        async (creation) => {
            // Gizlilik: ham deneyim metni (userInput) ASLA paylaşılmaz.
            const firstText =
                creation.type === 'story'
                    ? creation.pages?.[0]?.content
                    : creation.type === 'game'
                        ? creation.levels?.[0]?.scenario
                        : creation.letter?.paragraphs?.[0];

            const payload = {
                type: creation.type,
                title: creation.title,
                preview: maskProfanity(truncate(firstText, 180)),
                category: creation.category || 'diger',
                themeColor: creation.themeColor,
                reflectionQuestion: creation.reflectionQuestion || null,
                growthLesson: creation.growthLesson || null,
                pages: creation.pages || null,
                levels: creation.levels || null,
                letter: creation.letter || null,
                authorPseudonym: profile.pseudonym || 'Anonim Kelebek',
                authorEmoji: profile.emoji || '🦋',
                authorColor: profile.color || '#6A52DC',
                ownerUid: authUser?.uid || 'local',
                day: todayKey(),
            };

            let sharedId;
            if (cloudReady) {
                sharedId = await dbApi.shareToCommunity(payload);
            } else {
                sharedId = `local-${randomId()}`;
                const item = { ...payload, id: sharedId, hearts: 0, hugs: 0, reads: 0, heartedBy: [], huggedBy: [], createdAt: new Date().toISOString() };
                setCommunity((prev) => {
                    const realItems = prev.filter((i) => !String(i.id).startsWith('local-seed-'));
                    const next = mergeCommunity([item, ...realItems], SEED_COMMUNITY);
                    localStorage.setItem(LOCAL_COMMUNITY_KEY, JSON.stringify(next.filter((i) => !String(i.id).startsWith('local-seed-'))));
                    return next;
                });
            }

            setCreations((prev) => prev.map((c) => (c.id === creation.id ? { ...c, sharedId } : c)));
            if (cloudReady) dbApi.saveCreation(authUser.uid, { ...creation, sharedId }).catch(() => {});

            bump('sharesCount');
            awardOz('share_community', 'Toplulukla paylaşıldı');
            analytics.event('creation_shared', { type: creation.type });
            return sharedId;
        },
        [cloudReady, authUser, profile, awardOz, bump]
    );

    /* ---------- Topluluk etkileşimleri ---------- */
    const updateLocalCommunity = useCallback((id, updater) => {
        setCommunity((prev) => {
            const next = prev.map((i) => (i.id === id ? updater(i) : i));
            if (!db) localStorage.setItem(LOCAL_COMMUNITY_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const heartItem = useCallback(
        (item) => {
            if (interactions.hearted.includes(item.id)) return;
            setInteractions((p) => ({ ...p, hearted: [...p.hearted, item.id] }));
            updateLocalCommunity(item.id, (i) => ({ ...i, hearts: (i.hearts || 0) + 1 }));
            if (cloudReady && !String(item.id).startsWith('local-'))
                dbApi.heartCommunityItem(item.id, authUser.uid).catch(() => {});
            bump('heartsGiven');
            awardOz('heart_given', 'Kalp gönderildi 💜');
        },
        [interactions, updateLocalCommunity, cloudReady, authUser, bump, awardOz]
    );

    const hugItem = useCallback(
        (item) => {
            if (interactions.hugged.includes(item.id)) return;
            setInteractions((p) => ({ ...p, hugged: [...p.hugged, item.id] }));
            updateLocalCommunity(item.id, (i) => ({ ...i, hugs: (i.hugs || 0) + 1 }));
            if (cloudReady && !String(item.id).startsWith('local-'))
                dbApi.hugCommunityItem(item.id, authUser.uid).catch(() => {});
            bump('hugsGiven');
            awardOz('hug_given', '"Hemhal" — ben de yaşadım 🤝');
        },
        [interactions, updateLocalCommunity, cloudReady, authUser, bump, awardOz]
    );

    const markExplored = useCallback(
        (item) => {
            if (interactions.read.includes(item.id)) return;
            setInteractions((p) => ({ ...p, read: [...p.read, item.id] }));
            updateLocalCommunity(item.id, (i) => ({ ...i, reads: (i.reads || 0) + 1 }));
            if (cloudReady && !String(item.id).startsWith('local-')) dbApi.markCommunityRead(item.id).catch(() => {});
            bump('worksExplored');
            awardOz(item.type === 'game' ? 'play_community' : 'read_community', 'Bir yolculuğa tanıklık ettin');
        },
        [interactions, updateLocalCommunity, cloudReady, bump, awardOz]
    );

    const reportItem = useCallback(
        (item) => {
            if (cloudReady && !String(item.id).startsWith('local-')) dbApi.reportCommunityItem(item.id).catch(() => {});
            addToast('info', 'Bildirim alındı', 'Bu içerik ekibimiz tarafından incelenecek. Teşekkürler.');
            analytics.event('content_reported', { id: item.id });
        },
        [cloudReady, addToast]
    );

    const getCommunityItem = useCallback(
        (id) => community.find((c) => String(c.id) === String(id)) || null,
        [community]
    );

    const value = useMemo(
        () => ({
            creations, saveCreation, removeCreation, getCreation,
            community, communityLoading, getCommunityItem,
            shareCreation, heartItem, hugItem, markExplored, reportItem,
            interactions,
        }),
        [creations, saveCreation, removeCreation, getCreation, community, communityLoading, getCommunityItem, shareCreation, heartItem, hugItem, markExplored, reportItem, interactions]
    );

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};

export const useStory = () => {
    const ctx = useContext(StoryContext);
    if (!ctx) throw new Error('useStory, StoryProvider içinde kullanılmalı');
    return ctx;
};
