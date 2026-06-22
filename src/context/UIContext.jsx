import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { analytics } from '../lib/analytics';

const UIContext = createContext(null);

/* Hash tabanlı yönlendirme: paylaşılabilir adresler + çalışan geri tuşu. */
const parseHash = () => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    const [path = '', param = ''] = raw.split('/');
    const known = ['', 'olustur', 'kutuphane', 'topluluk', 'yolculuk', 'profil', 'rehber', 'icerik'];
    if (!known.includes(path)) return { path: '', param: '' };
    return { path, param: decodeURIComponent(param) };
};

export const UIProvider = ({ children }) => {
    const [route, setRoute] = useState(parseHash);
    const [toasts, setToasts] = useState([]);
    const [activeModal, setActiveModal] = useState(null); // 'safety' | 'upgrade' | 'auth' | null
    const [celebration, setCelebration] = useState(null); // { stage } — aşama kutlaması
    const toastTimers = useRef(new Map());

    useEffect(() => {
        const onHash = () => {
            setRoute(parseHash());
            window.scrollTo({ top: 0, behavior: 'instant' });
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        analytics.page(`/${route.path}${route.param ? '/:id' : ''}`);
    }, [route]);

    const navigate = useCallback((to) => {
        const target = `#/${to.replace(/^#?\/?/, '')}`;
        if (window.location.hash === target) return;
        window.location.hash = target;
    }, []);

    const goBack = useCallback(() => {
        if (window.history.length > 1) window.history.back();
        else navigate('');
    }, [navigate]);

    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timer = toastTimers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            toastTimers.current.delete(id);
        }
    }, []);

    const addToast = useCallback(
        (type, title, message = '') => {
            const id = `${Date.now()}-${Math.random()}`;
            setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);
            const timer = setTimeout(() => dismissToast(id), 4200);
            toastTimers.current.set(id, timer);
        },
        [dismissToast]
    );

    const openModal = useCallback((name) => setActiveModal(name), []);
    const closeModal = useCallback(() => setActiveModal(null), []);
    const celebrate = useCallback((stage) => setCelebration({ stage }), []);
    const endCelebration = useCallback(() => setCelebration(null), []);

    useEffect(() => () => toastTimers.current.forEach(clearTimeout), []);

    const value = useMemo(
        () => ({
            route, navigate, goBack,
            toasts, addToast, dismissToast,
            activeModal, openModal, closeModal,
            celebration, celebrate, endCelebration,
        }),
        [route, navigate, goBack, toasts, addToast, dismissToast, activeModal, openModal, closeModal, celebration, celebrate, endCelebration]
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error('useUI, UIProvider içinde kullanılmalı');
    return ctx;
};
