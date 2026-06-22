import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const VARIANTS = {
    primary:
        'bg-primary-600 text-white shadow-[0_1px_2px_rgba(58,48,125,0.3),0_4px_14px_-4px_rgba(106,82,220,0.5)] hover:bg-primary-700 active:scale-[0.98]',
    accent:
        'bg-accent-500 text-white shadow-[0_4px_14px_-4px_rgba(201,122,28,0.5)] hover:bg-accent-600 active:scale-[0.98]',
    secondary:
        'bg-white text-neutral-800 border border-neutral-200 shadow-soft hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.98]',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.98]',
    soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:scale-[0.98]',
    danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100 active:scale-[0.98]',
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
                'transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
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
