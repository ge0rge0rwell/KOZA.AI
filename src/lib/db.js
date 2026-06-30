/**
 * Firestore veri katmanı.
 *
 * firebase/firestore fonksiyonlarını statik olarak import ETMİYOR — bunu yapmak
 * 107 kB Firebase paketini ana bundle'a çeker.  Bunun yerine firebase.js'in `fs`
 * namespace'ini kullanır; bu namespace firebaseInit çözümlendiğinde doldurulur.
 *
 * Koleksiyonlar:
 *  - users/{uid}/data/profile        → kullanıcı profili
 *  - users/{uid}/creations/{id}      → kişisel eserler (özel)
 *  - community/{id}                  → paylaşılan eserler (anonim)
 */
import { db, fs } from './firebase';

const guard = () => {
    if (!db || !fs) throw new Error('Firestore hazır değil');
};

/* ---------------- Profil ---------------- */

const profileRef = (uid) => fs.doc(db, 'users', uid, 'data', 'profile');

export const getProfile = async (uid) => {
    guard();
    const snap = await fs.getDoc(profileRef(uid));
    return snap.exists() ? snap.data() : null;
};

export const createProfile = async (uid, data) => {
    guard();
    await fs.setDoc(profileRef(uid), {
        ...data,
        createdAt: fs.serverTimestamp(),
        updatedAt: fs.serverTimestamp(),
    });
    return data;
};

export const updateProfile = async (uid, updates) => {
    guard();
    await fs.updateDoc(profileRef(uid), { ...updates, updatedAt: fs.serverTimestamp() });
};

export const subscribeProfile = (uid, cb) => {
    if (!db || !fs) return () => {};
    return fs.onSnapshot(
        profileRef(uid),
        (snap) => snap.exists() && cb(snap.data()),
        (e) => console.error('Profil aboneliği:', e)
    );
};

/* ---------------- Kişisel eserler ---------------- */

export const saveCreation = async (uid, creation) => {
    guard();
    await fs.setDoc(fs.doc(db, 'users', uid, 'creations', String(creation.id)), {
        ...creation,
        updatedAt: fs.serverTimestamp(),
    });
};

export const deleteCreation = async (uid, id) => {
    guard();
    await fs.deleteDoc(fs.doc(db, 'users', uid, 'creations', String(id)));
};

export const subscribeCreations = (uid, cb) => {
    if (!db || !fs) return () => {};
    const q = fs.query(
        fs.collection(db, 'users', uid, 'creations'),
        fs.orderBy('createdAt', 'desc'),
        fs.limit(100)
    );
    return fs.onSnapshot(
        q,
        (snap) => cb(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
        (e) => console.error('Eser aboneliği:', e)
    );
};

/* ---------------- Topluluk ---------------- */

export const shareToCommunity = async (item) => {
    guard();
    const ref = await fs.addDoc(fs.collection(db, 'community'), {
        ...item,
        hearts:    0,
        hugs:      0,
        reads:     0,
        heartedBy: [],
        huggedBy:  [],
        reports:   0,
        createdAt: fs.serverTimestamp(),
    });
    return ref.id;
};

export const subscribeCommunity = (cb, max = 60) => {
    if (!db || !fs) return () => {};
    const q = fs.query(
        fs.collection(db, 'community'),
        fs.orderBy('createdAt', 'desc'),
        fs.limit(max)
    );
    return fs.onSnapshot(
        q,
        (snap) => cb(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
        (e) => { console.error('Topluluk aboneliği:', e); cb(null, e); }
    );
};

export const heartCommunityItem = async (id, uid) => {
    guard();
    await fs.updateDoc(fs.doc(db, 'community', id), {
        hearts:    fs.increment(1),
        heartedBy: fs.arrayUnion(uid),
    });
};

export const hugCommunityItem = async (id, uid) => {
    guard();
    await fs.updateDoc(fs.doc(db, 'community', id), {
        hugs:      fs.increment(1),
        huggedBy:  fs.arrayUnion(uid),
    });
};

export const markCommunityRead = async (id) => {
    guard();
    await fs.updateDoc(fs.doc(db, 'community', id), { reads: fs.increment(1) });
};

export const reportCommunityItem = async (id) => {
    guard();
    await fs.updateDoc(fs.doc(db, 'community', id), { reports: fs.increment(1) });
};

export const deleteCommunityItem = async (id) => {
    guard();
    await fs.deleteDoc(fs.doc(db, 'community', id));
};

export const getTopHemhalStories = async (minHugs = 10, maxResults = 30) => {
    guard();
    const q = fs.query(
        fs.collection(db, 'community'),
        fs.where('hugs', '>=', minHugs),
        fs.orderBy('hugs', 'desc'),
        fs.limit(maxResults)
    );
    const snap = await fs.getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
