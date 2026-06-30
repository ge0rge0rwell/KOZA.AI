import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { auth, fa, firebaseReady, firebaseInit } from '../lib/firebase';
import { analytics } from '../lib/analytics';
import { randomId } from '../utils/helpers';

/**
 * AuthContext — anonim-öncelikli kimlik doğrulama.
 *
 * firebase/auth modülü STATIK IMPORT EDİLMEZ; bu bütün Firebase SDK'sını
 * (107 kB gzip) kritik yola çekmeye yol açar. Bunun yerine firebaseInit
 * promise'ı çözülene kadar `fa` namespace'i null kalır, ardından doldurulur.
 *
 * İlk render hiçbir zaman Firebase'i beklemez: dönen kullanıcı için
 * localStorage önbelleği anında kullanılır; Firebase arka planda onaylar.
 */

const AuthContext = createContext(null);

const LOCAL_USER_KEY  = 'koza-local-user';
const FB_CACHE_KEY    = 'koza-fb-user-cache';

const loadLocalUser = () => {
    try { return JSON.parse(localStorage.getItem(LOCAL_USER_KEY)); }
    catch { return null; }
};

const loadFbCache = () => {
    try { return JSON.parse(localStorage.getItem(FB_CACHE_KEY)); }
    catch { return null; }
};

const AUTH_ERRORS = {
    'auth/invalid-email':           'Geçersiz e-posta adresi.',
    'auth/user-not-found':          'Bu e-posta ile bir hesap bulunamadı.',
    'auth/wrong-password':          'Şifre hatalı. Tekrar dener misin?',
    'auth/invalid-credential':      'E-posta veya şifre hatalı.',
    'auth/email-already-in-use':    'Bu e-posta zaten kayıtlı. Giriş yapmayı dene.',
    'auth/weak-password':           'Şifre en az 6 karakter olmalı.',
    'auth/popup-closed-by-user':    'Giriş penceresi kapatıldı.',
    'auth/network-request-failed':  'İnternet bağlantını kontrol eder misin?',
    'auth/too-many-requests':       'Çok fazla deneme yapıldı. Biraz sonra tekrar dene.',
};

const friendlyError = (e) => AUTH_ERRORS[e?.code] || 'Bir şeyler ters gitti. Tekrar dener misin?';

const mapFbUser = (fbUser) => ({
    uid:         fbUser.uid,
    email:       fbUser.email,
    displayName: fbUser.displayName,
    photoURL:    fbUser.photoURL,
    isAnonymous: fbUser.isAnonymous,
});

export const AuthProvider = ({ children }) => {
    /**
     * İlk durum:
     *  - Firebase devre dışıysa → loadLocalUser() (demo mod)
     *  - Firebase etkinse → localStorage önbelleği (dönen kullanıcı anında görür)
     * loading hiçbir zaman true başlamaz — ilk render engellenmez.
     */
    const [user, setUser] = useState(() =>
        firebaseReady ? loadFbCache() : loadLocalUser()
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!firebaseReady) return undefined;

        let cancelled = false;
        let unsub = null;

        firebaseInit.then((ok) => {
            if (cancelled || !ok || !auth || !fa) {
                if (!cancelled) setLoading(false);
                return;
            }

            unsub = fa.onAuthStateChanged(auth, (fbUser) => {
                if (cancelled) return;
                if (fbUser) {
                    const u = mapFbUser(fbUser);
                    localStorage.setItem(FB_CACHE_KEY, JSON.stringify(u));
                    setUser(u);
                } else {
                    localStorage.removeItem(FB_CACHE_KEY);
                    setUser(null);
                }
                setLoading(false);
            });
        });

        return () => {
            cancelled = true;
            unsub?.();
        };
    }, []);

    const run = useCallback(async (fn, eventName) => {
        try {
            await fn();
            analytics.event('login', { method: eventName });
            return { ok: true };
        } catch (e) {
            console.error(`${eventName} girişi başarısız:`, e);
            return { ok: false, error: friendlyError(e) };
        }
    }, []);

    const signInAnon = useCallback(async () => {
        if (!firebaseReady || !auth || !fa) {
            const localUser = { uid: `local-${randomId()}`, isAnonymous: true, local: true };
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
            setUser(localUser);
            return { ok: true };
        }
        return run(() => fa.signInAnonymously(auth), 'anonymous');
    }, [run]);

    const signInGoogle = useCallback(async () => {
        if (!firebaseReady || !auth || !fa)
            return { ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' };
        const provider = new fa.GoogleAuthProvider();
        return run(() => fa.signInWithPopup(auth, provider), 'google');
    }, [run]);

    const signInEmail = useCallback(async (email, password) => {
        if (!firebaseReady || !auth || !fa)
            return { ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' };
        return run(() => fa.signInWithEmailAndPassword(auth, email, password), 'email');
    }, [run]);

    const registerEmail = useCallback(async (email, password) => {
        if (!firebaseReady || !auth || !fa)
            return { ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' };
        return run(() => fa.createUserWithEmailAndPassword(auth, email, password), 'email_register');
    }, [run]);

    const signOut = useCallback(async () => {
        if (user?.local) {
            localStorage.removeItem(LOCAL_USER_KEY);
            setUser(null);
            return;
        }
        localStorage.removeItem(FB_CACHE_KEY);
        if (auth && fa) await fa.signOut(auth);
    }, [user]);

    const value = useMemo(
        () => ({ user, loading, firebaseReady, signInAnon, signInGoogle, signInEmail, registerEmail, signOut }),
        [user, loading, signInAnon, signInGoogle, signInEmail, registerEmail, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth, AuthProvider içinde kullanılmalı');
    return ctx;
};
