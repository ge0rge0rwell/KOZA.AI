import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { useUI } from './UIContext';
import * as dbApi from '../lib/db';
import { db } from '../lib/firebase';
import { OZ_REWARDS, PLANS, COUNSELOR_EMAILS } from '../config/constants';
import { findNewAchievements } from '../utils/achievements';
import { stageTransition } from '../utils/stages';
import { todayKey } from '../utils/helpers';
import { randomAvatar } from '../utils/pseudonyms';
import { analytics } from '../lib/analytics';

const UserContext = createContext(null);

const PROFILE_KEY = 'koza-profile';

const defaultProfile = () => ({
    pseudonym: null,
    ...randomAvatar(),
    totalOz: 0,
    dailyStreak: 0,
    lastVisit: null,
    storiesCreated: 0,
    gamesCreated: 0,
    lettersCreated: 0,
    worksExplored: 0,
    heartsGiven: 0,
    hugsGiven: 0,
    sharesCount: 0,
    reflectionsAnswered: 0,
    achievements: [],
    plan: 'free',
    role: 'student',
    onboarded: false,
    creationsToday: { date: todayKey(), count: 0 },
    joinedAt: new Date().toISOString(),
});

const loadLocal = () => {
    try {
        const raw = JSON.parse(localStorage.getItem(PROFILE_KEY));
        return raw ? { ...defaultProfile(), ...raw } : defaultProfile();
    } catch {
        return defaultProfile();
    }
};

export const UserProvider = ({ children }) => {
    const { user: authUser } = useAuth();
    const { addToast, celebrate } = useUI();

    const [profile, setProfile] = useState(loadLocal);
    const [cloudSynced, setCloudSynced] = useState(false);
    const cloudReady = Boolean(authUser && !authUser.local && db);
    const saveTimer = useRef(null);
    const skipNextCloudWrite = useRef(false);

    /* ---------- Tek noktadan profil güncelleme: ÖZ → rozet → aşama → kalıcılık ---------- */
    const applyUpdate = useCallback(
        (updater, { silent = false } = {}) => {
            setProfile((prev) => {
                let next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };

                // Yeni rozetler (rozet ÖZ'leri de eklenir)
                const fresh = findNewAchievements(next, next.achievements);
                if (fresh.length) {
                    next = {
                        ...next,
                        achievements: [...next.achievements, ...fresh.map((a) => a.id)],
                        totalOz: next.totalOz + fresh.reduce((s, a) => s + a.oz, 0),
                    };
                    if (!silent) {
                        fresh.forEach((a) => addToast('achievement', 'Yeni rozet!', `${a.icon} ${a.name} · +${a.oz} ÖZ`));
                        analytics.event('achievement_unlocked', { ids: fresh.map((a) => a.id).join(',') });
                    }
                }

                // Aşama geçişi kutlaması
                const newStage = stageTransition(prev.totalOz, next.totalOz);
                if (newStage && !silent) celebrate(newStage);

                return next;
            });
        },
        [addToast, celebrate]
    );

    /* ---------- ÖZ kazanımı ---------- */
    const awardOz = useCallback(
        (rewardKey, reason) => {
            const amount = OZ_REWARDS[rewardKey] ?? 0;
            if (!amount) return;
            applyUpdate((p) => ({ ...p, totalOz: p.totalOz + amount }));
            addToast('oz', `+${amount} ÖZ`, reason);
            analytics.event('oz_awarded', { key: rewardKey, amount });
        },
        [applyUpdate, addToast]
    );

    const bump = useCallback(
        (field, n = 1) => applyUpdate((p) => ({ ...p, [field]: (p[field] || 0) + n })),
        [applyUpdate]
    );

    /* ---------- Günlük seri ---------- */
    useEffect(() => {
        const today = todayKey();
        if (profile.lastVisit === today) return;
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
        const newStreak = profile.lastVisit === yesterday ? profile.dailyStreak + 1 : 1;
        applyUpdate((p) => ({
            ...p,
            lastVisit: today,
            dailyStreak: newStreak,
            totalOz: p.totalOz + (p.lastVisit ? OZ_REWARDS.daily_visit : 0),
        }));
        if (profile.lastVisit) addToast('oz', `+${OZ_REWARDS.daily_visit} ÖZ`, `Günlük ziyaret · ${newStreak} günlük seri 🔥`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile.lastVisit]);

    /* ---------- Günlük üretim limiti (monetizasyon) ---------- */
    const plan = PLANS[profile.plan] || PLANS.free;
    const creationsToday = profile.creationsToday?.date === todayKey() ? profile.creationsToday.count : 0;
    const creationsLeft = plan.dailyCreations === Infinity ? Infinity : Math.max(0, plan.dailyCreations - creationsToday);

    const registerCreation = useCallback(() => {
        applyUpdate((p) => {
            const isToday = p.creationsToday?.date === todayKey();
            return { ...p, creationsToday: { date: todayKey(), count: isToday ? p.creationsToday.count + 1 : 1 } };
        }, { silent: true });
    }, [applyUpdate]);

    const setPlan = useCallback(
        (planId) => {
            applyUpdate({ plan: planId });
            analytics.event('plan_changed', { plan: planId });
        },
        [applyUpdate]
    );

    /* ---------- Onboarding ---------- */
    const completeOnboarding = useCallback(
        ({ pseudonym, emoji, color }) => {
            applyUpdate((p) => ({
                ...p,
                pseudonym,
                emoji,
                color,
                onboarded: true,
                totalOz: p.totalOz + OZ_REWARDS.onboarding_done,
            }));
            addToast('oz', `+${OZ_REWARDS.onboarding_done} ÖZ`, 'Yolculuk başladı 🦋');
        },
        [applyUpdate, addToast]
    );

    /* ---------- Yerel kalıcılık ---------- */
    useEffect(() => {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }, [profile]);

    /* ---------- Bulut eşitleme ---------- */
    useEffect(() => {
        if (!cloudReady) {
            setCloudSynced(false);
            return undefined;
        }
        let cancelled = false;

        (async () => {
            try {
                const remote = await dbApi.getProfile(authUser.uid);
                if (cancelled) return;
                if (remote) {
                    skipNextCloudWrite.current = true;
                    setProfile((local) => ({
                        ...defaultProfile(),
                        ...remote,
                        // Yerel ilerleme buluttan yüksekse koru (çevrimdışı kullanım)
                        totalOz: Math.max(remote.totalOz || 0, local.totalOz || 0),
                    }));
                } else {
                    await dbApi.createProfile(authUser.uid, loadLocal());
                }
                setCloudSynced(true);
            } catch (e) {
                console.error('Profil eşitleme hatası:', e);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [cloudReady, authUser?.uid]);

    useEffect(() => {
        if (!cloudReady || !cloudSynced) return undefined;
        if (skipNextCloudWrite.current) {
            skipNextCloudWrite.current = false;
            return undefined;
        }
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            dbApi.updateProfile(authUser.uid, profile).catch((e) => console.error('Bulut yazma hatası:', e));
        }, 1800);
        return () => clearTimeout(saveTimer.current);
    }, [profile, cloudReady, cloudSynced, authUser?.uid]);

    /* ---------- Rehber (okul) erişimi ---------- */
    const isCounselor =
        profile.role === 'counselor' || COUNSELOR_EMAILS.includes(authUser?.email || '');

    const value = useMemo(
        () => ({
            profile,
            applyUpdate,
            awardOz,
            bump,
            plan,
            creationsLeft,
            registerCreation,
            setPlan,
            completeOnboarding,
            cloudSynced,
            isCounselor,
        }),
        [profile, applyUpdate, awardOz, bump, plan, creationsLeft, registerCreation, setPlan, completeOnboarding, cloudSynced, isCounselor]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser, UserProvider içinde kullanılmalı');
    return ctx;
};
