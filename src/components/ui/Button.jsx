import React, { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const VARIANTS = {
    primary:
        'bg-gradient-to-b from-primary-500 to-primary-700 text-white ' +
        'shadow-[0_1px_2px_rgba(58,48,125,0.3),0_4px_16px_-4px_rgba(106,82,220,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] ' +
        'hover:from-primary-400 hover:to-primary-600 ' +
        'hover:shadow-[0_2px_4px_rgba(58,48,125,0.3),0_10px_28px_-4px_rgba(106,82,220,0.70),inset_0_1px_0_rgba(255,255,255,0.22)] ' +
        'active:scale-[0.97]',
    accent:
        'bg-gradient-to-b from-accent-400 to-accent-600 text-white ' +
        'shadow-[0_1px_2px_rgba(100,60,10,0.2),0_4px_16px_-4px_rgba(201,122,28,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] ' +
        'hover:from-accent-300 hover:to-accent-500 ' +
        'hover:shadow-[0_10px_28px_-4px_rgba(201,122,28,0.72),inset_0_1px_0_rgba(255,255,255,0.22)] ' +
        'active:scale-[0.97]',
    secondary:
        'bg-white text-neutral-800 border border-neutral-200 shadow-soft ' +
        'hover:border-primary-200 hover:bg-neutral-50 hover:shadow-card active:scale-[0.97]',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.97]',
    soft:  'bg-primary-50 text-primary-700 hover:bg-primary-100 active:scale-[0.97]',
    danger:'bg-danger-50 text-danger-600 hover:bg-danger-100 active:scale-[0.97]',
};

const SIZES = {
    sm: 'h-9  px-4 text-[13px] gap-1.5',
    md: 'h-11 px-6 text-sm    gap-2',
    lg: 'h-13 px-8 text-base  gap-2.5',
};

const RIPPLE_COLOR = {
    primary:   'rgba(255,255,255,0.32)',
    accent:    'rgba(255,255,255,0.32)',
    secondary: 'rgba(106,82,220,0.14)',
    ghost:     'rgba(106,82,220,0.12)',
    soft:      'rgba(106,82,220,0.18)',
    danger:    'rgba(244,63,94,0.15)',
};

const Button = React.forwardRef(
    ({ variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, loading, disabled, className, children, onClick, ...props }, ref) => {
        const [ripples, setRipples] = useState([]);

        const handleClick = useCallback((e) => {
            if (disabled || loading) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const id = Date.now() + Math.random();
            setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
            setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
            onClick?.(e);
        }, [disabled, loading, onClick]);

        const iconSize = size === 'sm' ? 15 : 18;
        const hasSweep = variant === 'primary' || variant === 'accent';

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                onClick={handleClick}
                className={cn(
                    'relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold tracking-tight select-none',
                    'transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none',
                    VARIANTS[variant],
                    SIZES[size],
                    className
                )}
                {...props}
            >
                {/* Shimmer sweep — primary + accent */}
                {hasSweep && (
                    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                        <span className="animate-shimmer-sweep absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
                    </span>
                )}

                {/* Ripples */}
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        aria-hidden
                        className="animate-ripple pointer-events-none absolute rounded-full"
                        style={{
                            left: r.x - 2,
                            top:  r.y - 2,
                            width: 4,
                            height: 4,
                            background: RIPPLE_COLOR[variant] ?? 'rgba(255,255,255,0.3)',
                        }}
                    />
                ))}

                {/* Content */}
                {loading
                    ? <Loader2 size={iconSize} className="animate-spin" />
                    : Icon && <Icon size={iconSize} strokeWidth={2.2} />
                }
                {children && <span className="relative z-[1]">{children}</span>}
                {IconRight && !loading && <IconRight size={iconSize} strokeWidth={2.2} className="relative z-[1]" />}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;
