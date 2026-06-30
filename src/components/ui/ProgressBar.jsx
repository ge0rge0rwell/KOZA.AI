import React from 'react';
import { cn, clamp } from '../../utils/helpers';

const ProgressBar = ({ value = 0, color, height = 8, className, animated = true }) => {
    const pct = clamp(value, 0, 100);
    const fill = color || 'linear-gradient(90deg, var(--color-primary-400), var(--color-primary-600) 70%, var(--color-primary-700))';

    return (
        <div
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ height }}
            className={cn('relative w-full overflow-visible rounded-full bg-neutral-200/70', className)}
        >
            {/* Track */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Fill */}
                <div
                    className={cn('relative h-full rounded-full overflow-hidden', animated && 'transition-[width] duration-700 ease-out')}
                    style={{ width: `${pct}%`, background: fill }}
                >
                    {/* Top highlight */}
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)' }}
                    />
                    {/* Shimmer sweep */}
                    {animated && pct > 0 && (
                        <span
                            aria-hidden
                            className="animate-shimmer-sweep absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                    )}
                </div>
            </div>

            {/* Glowing dot at leading edge */}
            {animated && pct > 3 && pct < 99 && (
                <span
                    aria-hidden
                    className="animate-glow-pulse pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        left: `calc(${pct}% - ${Math.round(height * 0.7)}px)`,
                        width:  height * 1.6,
                        height: height * 1.6,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)',
                        filter: `blur(${Math.max(1, height * 0.25)}px)`,
                    }}
                />
            )}
        </div>
    );
};

export default ProgressBar;
