import confetti from 'canvas-confetti';

const BRAND_COLORS = ['#8470E8', '#6A52DC', '#E9AE41', '#E29A28', '#F4F3FE'];

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const fireConfetti = () => {
    if (reduced()) return;
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: BRAND_COLORS, disableForReducedMotion: true });
};

export const fireCelebration = () => {
    if (reduced()) return;
    const end = Date.now() + 900;
    const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors: BRAND_COLORS });
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: BRAND_COLORS });
        if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
};
