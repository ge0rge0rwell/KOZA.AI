import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let ready = false;

export const analytics = {
    init() {
        if (!MEASUREMENT_ID || ready) return;
        try {
            ReactGA.initialize(MEASUREMENT_ID, { gaOptions: { anonymizeIp: true } });
            ready = true;
        } catch {
            /* analytics asla uygulamayı bozmaz */
        }
    },
    page(path) {
        if (!ready) return;
        try {
            ReactGA.send({ hitType: 'pageview', page: path });
        } catch { /* noop */ }
    },
    event(name, params = {}) {
        if (!ready) return;
        try {
            ReactGA.event(name, params);
        } catch { /* noop */ }
    },
};
