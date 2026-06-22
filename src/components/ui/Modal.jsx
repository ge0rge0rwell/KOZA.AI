import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const SIZES = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

const Modal = ({ open, onClose, size = 'md', children, className, labelledBy }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        ref.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
        >
            <button
                aria-label="Kapat"
                className="absolute inset-0 bg-neutral-950/35 backdrop-blur-[6px] animate-fade-in cursor-default"
                onClick={onClose}
                tabIndex={-1}
            />
            <div
                ref={ref}
                tabIndex={-1}
                className={cn(
                    'relative w-full overflow-hidden bg-white shadow-pop outline-none animate-modal-in',
                    'max-h-[92dvh] overflow-y-auto scrollbar-thin',
                    'rounded-t-[28px] sm:rounded-[28px]',
                    SIZES[size],
                    className
                )}
            >
                {onClose && (
                    <button
                        onClick={onClose}
                        aria-label="Kapat"
                        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100/90 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-800"
                    >
                        <X size={17} strokeWidth={2.4} />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
