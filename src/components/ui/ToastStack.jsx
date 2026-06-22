import React from 'react';
import { CheckCircle2, Info, AlertTriangle, Sparkles, Trophy, X } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { cn } from '../../utils/helpers';

const STYLE = {
    success: { icon: CheckCircle2, ring: 'bg-success-50 text-success-600' },
    info: { icon: Info, ring: 'bg-info-50 text-info-600' },
    error: { icon: AlertTriangle, ring: 'bg-danger-50 text-danger-600' },
    oz: { icon: Sparkles, ring: 'bg-accent-50 text-accent-600' },
    achievement: { icon: Trophy, ring: 'bg-primary-50 text-primary-600' },
};

const ToastStack = () => {
    const { toasts, dismissToast } = useUI();
    if (!toasts.length) return null;

    return (
        <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:right-5 sm:left-auto">
            {toasts.map((t) => {
                const { icon: Icon, ring } = STYLE[t.type] || STYLE.info;
                return (
                    <div
                        key={t.id}
                        className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-lift backdrop-blur-xl animate-toast-in"
                    >
                        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', ring)}>
                            <Icon size={18} strokeWidth={2.2} />
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                            <p className="text-sm font-bold leading-tight text-neutral-900">{t.title}</p>
                            {t.message && <p className="mt-0.5 truncate text-[13px] text-neutral-500">{t.message}</p>}
                        </div>
                        <button
                            onClick={() => dismissToast(t.id)}
                            aria-label="Bildirimi kapat"
                            className="rounded-lg p-1 text-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                        >
                            <X size={15} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastStack;
