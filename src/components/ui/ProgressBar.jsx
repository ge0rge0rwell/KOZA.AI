import React from 'react';
import { cn } from '../../utils/helpers';
import { clamp } from '../../utils/helpers';

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
            className={cn('h-full rounded-full', animated && 'transition-[width] duration-700 ease-out')}
            style={{
                width: `${clamp(value, 0, 100)}%`,
                background: color || 'linear-gradient(90deg, var(--color-primary-500), var(--color-primary-600))',
            }}
        />
    </div>
);

export default ProgressBar;
