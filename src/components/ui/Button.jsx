import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const VARIANTS = {
    primary:
        'bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-[0_1px_2px_rgba(58,48,125,0.3),0_4px_16px_-4px_rgba(106,82,220,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] hover:from-primary-600 hover:to-primary-800 active:scale-[0.97]',
    accent:
        'bg-gradient-to-b from-accent-400 to-accent-600 text-white shadow-[0_1px_2px_rgba(100,60,10,0.2),0_4px_16px_-4px_rgba(201,122,28,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] hover:from-accent-500 hover:to-accent-700 active:scale-[0.97]',
    secondary:
        'bg-white text-neutral-800 border border-neutral-200 shadow-soft hover:border-primary-200 hover:bg-neutral-50 hover:shadow-card active:scale-[0.97]',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.97]',
    soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:scale-[0.97]',
    danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100 active:scale-[0.97]',
};

const SIZES = {
    sm: 'h-9 px-4 text-[13px] gap-1.5',
    md: 'h-11 px-6 text-sm gap-2',
    lg: 'h-13 px-8 text-base gap-2.5',
};

const Button = React.forwardRef(
    ({ variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, loading, disabled, className, children, ...props }, ref) => (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center rounded-full font-bold tracking-tight select-none',
                'transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none',
                VARIANTS[variant],
                SIZES[size],
                className
            )}
            {...props}
        >
            {loading ? <Loader2 size={size === 'sm' ? 15 : 18} className="animate-spin" /> : Icon && <Icon size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />}
            {children && <span>{children}</span>}
            {IconRight && !loading && <IconRight size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />}
        </button>
    )
);

Button.displayName = 'Button';
export default Button;
