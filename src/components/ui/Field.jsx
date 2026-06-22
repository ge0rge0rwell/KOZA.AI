import React, { useId } from 'react';
import { cn } from '../../utils/helpers';

const fieldClasses = (error) =>
    cn(
        'w-full rounded-[14px] border bg-white px-4 text-[15px] text-neutral-900 placeholder:text-neutral-400',
        'transition-all duration-200 focus:outline-none focus:ring-4',
        error
            ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
            : 'border-neutral-200 hover:border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
    );

export const Input = ({ label, error, hint, className, ...props }) => {
    const id = useId();
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold text-neutral-700">
                    {label}
                </label>
            )}
            <input id={id} className={cn(fieldClasses(error), 'h-12')} aria-invalid={!!error} {...props} />
            {error && <p className="mt-1.5 text-[13px] font-medium text-danger-600">{error}</p>}
            {hint && !error && <p className="mt-1.5 text-[13px] text-neutral-400">{hint}</p>}
        </div>
    );
};

export const Textarea = ({ label, error, hint, className, rows = 5, ...props }) => {
    const id = useId();
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold text-neutral-700">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                rows={rows}
                className={cn(fieldClasses(error), 'resize-none py-3.5 leading-relaxed scrollbar-thin')}
                aria-invalid={!!error}
                {...props}
            />
            {error && <p className="mt-1.5 text-[13px] font-medium text-danger-600">{error}</p>}
            {hint && !error && <p className="mt-1.5 text-[13px] text-neutral-400">{hint}</p>}
        </div>
    );
};
