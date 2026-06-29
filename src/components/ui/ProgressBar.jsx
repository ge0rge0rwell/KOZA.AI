import React from 'react';
import { cn, clamp } from '../../utils/helpers';

const ProgressBar = ({ value = 0, color, height = 8, className, animated = true }) => (
    <div
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height }}
        className={cn('w-full overflow-hidden rounded-full bg-neutral-200/70', className)}
    >
        <div
            className={cn('relative h-full rounded-full overflow-hidden', animated && 'transition-[width] duration-700 ease-out')}
            style={{
                width: `${clamp(value, 0, 100)}%`,
                background: color || 'linear-gradient(90deg, var(--color-primary-400), var(--color-primary-600) 70%, var(--color-primary-700))',
            }}
        >
            <span className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)' }} aria-hidden />
        </div>
    </div>
);

export default ProgressBar;
