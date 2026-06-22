import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Metamorfoz görseli — 7 aşamalı koza→kelebek dönüşümü.
 * Saf SVG + CSS; canvas yok, her cihazda akıcı.
 */

const FLUTTER_CSS = `
.kz-flap-l, .kz-flap-r { transform-box: fill-box; }
.kz-flap-l { transform-origin: 100% 50%; animation: kz-flap-l 1.8s ease-in-out infinite; }
.kz-flap-r { transform-origin: 0% 50%; animation: kz-flap-r 1.8s ease-in-out infinite; }
@keyframes kz-flap-l { 0%,100% { transform: scaleX(1);} 50% { transform: scaleX(0.62);} }
@keyframes kz-flap-r { 0%,100% { transform: scaleX(1);} 50% { transform: scaleX(0.62);} }
.kz-sway { transform-box: fill-box; transform-origin: 50% 0%; animation: kz-sway 5s ease-in-out infinite; }
@keyframes kz-sway { 0%,100% { transform: rotate(-2deg);} 50% { transform: rotate(2.5deg);} }
.kz-spark { animation: sparkle 2.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .kz-flap-l,.kz-flap-r,.kz-sway,.kz-spark { animation: none; } }
`;

const Sparkle = ({ x, y, s = 1, delay = 0, color = '#E9AE41' }) => (
    <g className="kz-spark" style={{ animationDelay: `${delay}s` }}>
        <path
            d={`M${x} ${y - 4 * s} L${x + 1.2 * s} ${y - 1.2 * s} L${x + 4 * s} ${y} L${x + 1.2 * s} ${y + 1.2 * s} L${x} ${y + 4 * s} L${x - 1.2 * s} ${y + 1.2 * s} L${x - 4 * s} ${y} L${x - 1.2 * s} ${y - 1.2 * s} Z`}
            fill={color}
        />
    </g>
);

const Butterfly = ({ x, y, scale = 1, tone = '#6A52DC' }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <g className="kz-flap-l">
            <path d="M-2 0 C -10 -16, -26 -22, -28 -11 C -30 0, -16 6, -2 3 Z" fill={tone} opacity="0.92" />
            <path d="M-2 5 C -11 7, -19 18, -11 22 C -4 25, -1 14, -1 8 Z" fill="#E9AE41" opacity="0.95" />
        </g>
        <g className="kz-flap-r">
            <path d="M2 0 C 10 -16, 26 -22, 28 -11 C 30 0, 16 6, 2 3 Z" fill={tone} opacity="0.92" />
            <path d="M2 5 C 11 7, 19 18, 11 22 C 4 25, 1 14, 1 8 Z" fill="#E9AE41" opacity="0.95" />
        </g>
        <rect x="-1.6" y="-12" width="3.2" height="24" rx="1.6" fill="#3D307D" />
        <path d="M-1 -11 C -3 -16, -6 -18, -8 -19" stroke="#3D307D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M1 -11 C 3 -16, 6 -18, 8 -19" stroke="#3D307D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </g>
);

const CocoonVisual = ({ stage = 1, size = 220, className }) => {
    const glow = [0.12, 0.18, 0.3, 0.42, 0.5, 0.58, 0.7][stage - 1];
    const showCocoon = stage <= 4;
    const cracked = stage === 3;
    const open = stage === 4;
    const showButterfly = stage >= 4;
    const butterflyScale = [0, 0, 0, 0.55, 0.85, 1.1, 1.4][stage - 1];
    const butterflyY = [0, 0, 0, 96, 86, 76, 96][stage - 1];

    return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={cn('overflow-visible', className)} aria-hidden>
            <style>{FLUTTER_CSS}</style>
            <defs>
                <radialGradient id="kz-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8470E8" stopOpacity={glow} />
                    <stop offset="65%" stopColor="#E9AE41" stopOpacity={glow * 0.35} />
                    <stop offset="100%" stopColor="#E9AE41" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="kz-cocoon" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stopColor="#D6D2C9" />
                    <stop offset="55%" stopColor="#B9B2A4" />
                    <stop offset="100%" stopColor="#948C7C" />
                </linearGradient>
                <linearGradient id="kz-light" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFE9B8" />
                    <stop offset="100%" stopColor="#E9AE41" />
                </linearGradient>
            </defs>

            {/* Işık halesi */}
            <circle cx="100" cy="100" r="92" fill="url(#kz-glow)" />

            {/* Dal (koza evreleri) */}
            {showCocoon && (
                <path d="M30 26 C 60 18, 130 18, 172 30" stroke="#7E786C" strokeWidth="5" strokeLinecap="round" fill="none" />
            )}

            {showCocoon && (
                <g className="kz-sway">
                    {/* Askı ipliği */}
                    <path d="M100 28 L100 46" stroke="#948C7C" strokeWidth="2.5" />
                    {/* Koza gövdesi */}
                    <path
                        d="M100 44 C 124 52, 132 84, 126 110 C 121 132, 110 144, 100 146 C 90 144, 79 132, 74 110 C 68 84, 76 52, 100 44 Z"
                        fill="url(#kz-cocoon)"
                    />
                    {/* Doku çizgileri */}
                    <path d="M84 64 C 96 70, 108 70, 118 64" stroke="#857D6E" strokeWidth="1.6" fill="none" opacity="0.5" />
                    <path d="M80 86 C 94 93, 110 93, 121 86" stroke="#857D6E" strokeWidth="1.6" fill="none" opacity="0.5" />
                    <path d="M80 108 C 93 115, 109 115, 120 108" stroke="#857D6E" strokeWidth="1.6" fill="none" opacity="0.5" />

                    {/* 2. aşama: içeriden ışık */}
                    {stage >= 2 && (
                        <ellipse cx="100" cy="98" rx="14" ry="26" fill="url(#kz-light)" opacity={stage === 2 ? 0.28 : 0.5} className="animate-pulse-soft" />
                    )}

                    {/* 3. aşama: çatlaklar */}
                    {cracked && (
                        <g stroke="url(#kz-light)" strokeWidth="2.4" strokeLinecap="round" fill="none">
                            <path d="M96 70 L104 84 L97 98 L105 114" />
                            <path d="M112 78 L106 92" />
                            <path d="M88 96 L95 108" />
                        </g>
                    )}

                    {/* 4. aşama: açılan kabuk */}
                    {open && (
                        <path d="M100 44 C 80 50, 70 76, 75 104 L 100 92 Z" fill="#948C7C" opacity="0.55" />
                    )}
                </g>
            )}

            {/* Boş koza kabuğu (5. aşama) */}
            {stage === 5 && (
                <path
                    d="M96 132 C 106 136, 112 150, 108 164 C 105 174, 98 179, 93 178 C 88 176, 84 166, 84 154 C 84 142, 88 134, 96 132 Z"
                    fill="url(#kz-cocoon)"
                    opacity="0.45"
                />
            )}

            {/* Kelebek */}
            {showButterfly && <Butterfly x={100} y={butterflyY} scale={butterflyScale} tone={stage >= 6 ? '#6A52DC' : '#8470E8'} />}

            {/* Işıltılar */}
            {stage >= 3 && <Sparkle x={52} y={70} delay={0.2} s={0.9} />}
            {stage >= 4 && <Sparkle x={150} y={62} delay={0.8} s={1.1} color="#8470E8" />}
            {stage >= 5 && <Sparkle x={44} y={130} delay={1.4} s={1.2} />}
            {stage >= 6 && <Sparkle x={158} y={124} delay={0.5} s={1} color="#8470E8" />}
            {stage >= 7 && (
                <>
                    <Sparkle x={100} y={34} delay={1} s={1.4} />
                    <Sparkle x={66} y={48} delay={1.8} s={0.8} color="#8470E8" />
                    <Sparkle x={140} y={160} delay={0.3} s={1} />
                </>
            )}
        </svg>
    );
};

export default CocoonVisual;
