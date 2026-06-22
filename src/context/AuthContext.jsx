import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as fbSignOut,
} from 'firebase/auth';
import { auth, firebaseReady } from '../lib/firebase';
import { analytics } from '../lib/analytics';
import { randomId } from '../utils/helpers';

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

/* Firebase yapılandırılmamışsa bile uygulama tamamen çalışır (yerel demo kimliği). */
const LOCAL_USER_KEY = 'koza-local-user';

const loadLocalUser = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_USER_KEY));
    } catch {
        return null;
    }
};

const AUTH_ERRORS = {
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/user-not-found': 'Bu e-posta ile bir hesap bulunamadı.',
    'auth/wrong-password': 'Şifre hatalı. Tekrar dener misin?',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
    'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı. Giriş yapmayı dene.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/popup-closed-by-user': 'Giriş penceresi kapatıldı.',
    'auth/network-request-failed': 'İnternet bağlantını kontrol eder misin?',
    'auth/too-many-requests': 'Çok fazla deneme yapıldı. Biraz sonra tekrar dene.',
};

const friendlyError = (e) => AUTH_ERRORS[e?.code] || 'Bir şeyler ters gitti. Tekrar dener misin?';

export const AuthProvider = ({ children }) => {
    /* Firebase yoksa yerel kimlik anında hazır — efekt beklemeye gerek yok */
    const [user, setUser] = useState(() => (firebaseReady && auth ? null : loadLocalUser()));
    const [loading, setLoading] = useState(() => Boolean(firebaseReady && auth));

    useEffect(() => {
        if (!firebaseReady || !auth) return undefined;
        const unsub = onAuthStateChanged(auth, (fbUser) => {
            if (fbUser) {
                setUser({
                    uid: fbUser.uid,
                    email: fbUser.email,
                    displayName: fbUser.displayName,
                    photoURL: fbUser.photoURL,
                    isAnonymous: fbUser.isAnonymous,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsub;
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
        if (firebaseReady && auth) return run(() => signInAnonymously(auth), 'anonymous');
        // Yerel demo kimliği
        const localUser = { uid: `local-${randomId()}`, isAnonymous: true, local: true };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
        setUser(localUser);
        return { ok: true };
    }, [run]);

    const signInGoogle = useCallback(() => {
        if (!firebaseReady || !auth) return Promise.resolve({ ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' });
        return run(() => signInWithPopup(auth, googleProvider), 'google');
    }, [run]);

    const signInEmail = useCallback(
        (email, password) => {
            if (!firebaseReady || !auth) return Promise.resolve({ ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' });
            return run(() => signInWithEmailAndPassword(auth, email, password), 'email');
        },
        [run]
    );

    const registerEmail = useCallback(
        (email, password) => {
            if (!firebaseReady || !auth) return Promise.resolve({ ok: false, error: 'Bu demo sürümünde yalnızca anonim giriş açık.' });
            return run(() => createUserWithEmailAndPassword(auth, email, password), 'email_register');
        },
        [run]
    );

    const signOut = useCallback(async () => {
        if (user?.local) {
            localStorage.removeItem(LOCAL_USER_KEY);
            setUser(null);
            return;
        }
        if (auth) await fbSignOut(auth);
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
