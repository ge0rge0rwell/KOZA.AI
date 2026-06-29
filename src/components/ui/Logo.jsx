import React, { useId } from 'react';
import { cn } from '../../utils/helpers';

export const ButterflyMark = ({ size = 32, className }) => {
    const uid = useId().replace(/:/g, '');
    const wingA = `kz-a-${uid}`;
    const wingB = `kz-b-${uid}`;
    return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={className} aria-hidden>
            <defs>
                <linearGradient id={wingA} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8470E8" />
                    <stop offset="100%" stopColor="#5841C0" />
                </linearGradient>
                <linearGradient id={wingB} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F2BD52" />
                    <stop offset="100%" stopColor="#E29A28" />
                </linearGradient>
            </defs>
            <path d="M31 33 C 23 16, 7 10, 5 21 C 3 32, 17 38, 30 36 Z" fill={`url(#${wingA})`} />
            <path d="M33 33 C 41 16, 57 10, 59 21 C 61 32, 47 38, 34 36 Z" fill={`url(#${wingA})`} />
            <path d="M30.5 38 C 21 40, 13 51, 21 55 C 28 58, 31.5 48, 31.5 41 Z" fill={`url(#${wingB})`} />
            <path d="M33.5 38 C 43 40, 51 51, 43 55 C 36 58, 32.5 48, 32.5 41 Z" fill={`url(#${wingB})`} />
            <rect x="30.4" y="22" width="3.2" height="24" rx="1.6" fill="#3D307D" />
            <path d="M31 23 C 29 17.5, 26 15.5, 23.5 14.5" stroke="#3D307D" strokeWidth="2" strokeLinecap="round" />
            <path d="M33 23 C 35 17.5, 38 15.5, 40.5 14.5" stroke="#3D307D" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

const Logo = ({ size = 'md', withWordmark = true, className }) => {
    const dims = { sm: 24, md: 30, lg: 38 };
    return (
        <span className={cn('inline-flex items-center gap-2 select-none', className)}>
            <ButterflyMark size={dims[size]} />
            {withWordmark && (
                <span
                    className={cn(
                        'bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text font-extrabold tracking-tight text-transparent',
                        size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-[26px]' : 'text-[22px]'
                    )}
                >
                    KOZA
                </span>
            )}
        </span>
    );
};

export default Logo;
