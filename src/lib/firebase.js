/**
 * Firebase lazy-loader.
 *
 * Static imports from firebase/* are intentionally absent here — they would
 * pull the entire Firebase SDK into the initial bundle and onto the critical
 * path.  Instead we kick off a parallel dynamic import immediately so the SDK
 * downloads while React is rendering, but the main bundle can execute without
 * waiting for it.
 *
 * Consumers read the mutable `auth`, `db`, `fa`, `fs` refs AFTER awaiting
 * `firebaseInit`.  ES-module live bindings guarantee they see the updated
 * values once the promise resolves.
 */

const CFG = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(CFG.apiKey && CFG.projectId && CFG.appId);

/** Firebase Auth instance — null until firebaseInit resolves */
export let auth = null;
/** Firestore instance — null until firebaseInit resolves */
export let db   = null;
/** firebase/auth module namespace (all exported functions) */
export let fa   = null;
/** firebase/firestore module namespace (all exported functions) */
export let fs   = null;

/**
 * Starts downloading the Firebase SDK immediately (parallel to React bootstrap).
 * Resolves to `true` on success, `false` on error or missing config.
 */
export const firebaseInit = firebaseReady
    ? Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/firestore'),
    ]).then(([{ initializeApp }, authMod, fsMod]) => {
        const app = initializeApp(CFG);
        auth = authMod.getAuth(app);
        db   = fsMod.getFirestore(app);
        fa   = authMod;
        fs   = fsMod;
        return true;
    }).catch((e) => {
        console.error('[KOZA] Firebase başlatılamadı:', e);
        return false;
    })
    : Promise.resolve(false);
