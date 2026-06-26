/**
 * Firestore veri katmanı.
 * Koleksiyonlar:
 *  - users/{uid}/data/profile        → kullanıcı profili (anonim takma ad, ÖZ, plan…)
 *  - users/{uid}/creations/{id}      → kişisel eserler (özel)
 *  - community/{id}                  → toplulukla paylaşılan eserler (anonim)
 */
import {
    doc, setDoc, getDoc, updateDoc, deleteDoc, addDoc,
    collection, query, orderBy, where, limit, onSnapshot,
    serverTimestamp, increment, arrayUnion, getDocs,
} from 'firebase/firestore';
import { db } from './firebase';

const guard = () => {
    if (!db) throw new Error('Firestore hazır değil');
};

/* ---------------- Profil ---------------- */
const profileRef = (uid) => doc(db, 'users', uid, 'data', 'profile');

export const getProfile = async (uid) => {
    guard();
    const snap = await getDoc(profileRef(uid));
    return snap.exists() ? snap.data() : null;
};

export const createProfile = async (uid, data) => {
    guard();
    await setDoc(profileRef(uid), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return data;
};

export const updateProfile = async (uid, updates) => {
    guard();
    await updateDoc(profileRef(uid), { ...updates, updatedAt: serverTimestamp() });
};

export const subscribeProfile = (uid, cb) => {
    if (!db) return () => {};
    return onSnapshot(
        profileRef(uid),
        (snap) => snap.exists() && cb(snap.data()),
        (e) => console.error('Profil aboneliği:', e)
    );
};

/* ---------------- Kişisel eserler ---------------- */
export const saveCreation = async (uid, creation) => {
    guard();
    const id = String(creation.id);
    await setDoc(doc(db, 'users', uid, 'creations', id), {
        ...creation,
        updatedAt: serverTimestamp(),
    });
};

export const deleteCreation = async (uid, id) => {
    guard();
    await deleteDoc(doc(db, 'users', uid, 'creations', String(id)));
};

export const subscribeCreations = (uid, cb) => {
    if (!db) return () => {};
    const q = query(collection(db, 'users', uid, 'creations'), orderBy('createdAt', 'desc'), limit(100));
    return onSnapshot(
        q,
        (snap) => cb(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
        (e) => console.error('Eser aboneliği:', e)
    );
};

/* ---------------- Topluluk ---------------- */
export const shareToCommunity = async (item) => {
    guard();
    const ref = await addDoc(collection(db, 'community'), {
        ...item,
        hearts: 0,
        hugs: 0,
        reads: 0,
        heartedBy: [],
        huggedBy: [],
        reports: 0,
        createdAt: serverTimestamp(),
    });
    return ref.id;
};

export const subscribeCommunity = (cb, max = 60) => {
    if (!db) return () => {};
    const q = query(collection(db, 'community'), orderBy('createdAt', 'desc'), limit(max));
    return onSnapshot(
        q,
        (snap) => cb(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
        (e) => {
            console.error('Topluluk aboneliği:', e);
            cb(null, e);
        }
    );
};

export const heartCommunityItem = async (id, uid) => {
    guard();
    await updateDoc(doc(db, 'community', id), { hearts: increment(1), heartedBy: arrayUnion(uid) });
};

export const hugCommunityItem = async (id, uid) => {
    guard();
    await updateDoc(doc(db, 'community', id), { hugs: increment(1), huggedBy: arrayUnion(uid) });
};

export const markCommunityRead = async (id) => {
    guard();
    await updateDoc(doc(db, 'community', id), { reads: increment(1) });
};

export const reportCommunityItem = async (id) => {
    guard();
    await updateDoc(doc(db, 'community', id), { reports: increment(1) });
};

export const deleteCommunityItem = async (id) => {
    guard();
    await deleteDoc(doc(db, 'community', id));
};

/**
 * Hemhal Uçurtması — >= minHugs "hemhal" tepkisi almış eserleri getirir.
 * Yönetici panelinde gösterilir; en çok yankılanan eserler tohumlanır.
 * Minimum eşik: 10 hemhal = gerçek terapötik rezonans sinyali.
 */
export const getTopHemhalStories = async (minHugs = 10, maxResults = 30) => {
    guard();
    const q = query(
        collection(db, 'community'),
        where('hugs', '>=', minHugs),
        orderBy('hugs', 'desc'),
        limit(maxResults),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
