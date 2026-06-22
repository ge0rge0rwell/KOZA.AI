import React from 'react';
import { cn } from '../../utils/helpers';

const TONES = {
    neutral: 'bg-neutral-100 text-neutral-600',
    primary: 'bg-primary-50 text-primary-700',
    accent: 'bg-accent-50 text-accent-700',
    success: 'bg-success-50 text-success-600',
    danger: 'bg-danger-50 text-danger-600',
    outline: 'border border-neutral-200 text-neutral-500 bg-white',
};

const Badge = ({ tone = 'neutral', className, children, style }) => (
    <span
        style={style}
        className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide',
            TONES[tone],
            className
        )}
    >
        {children}
    </span>
);

export default Badge;
