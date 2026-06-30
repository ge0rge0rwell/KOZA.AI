import React from 'react';
import { CheckCircle2, Info, AlertTriangle, Sparkles, Trophy, X } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { cn } from '../../utils/helpers';

const STYLE = {
    success:     { icon: CheckCircle2,  ring: 'bg-success-50 text-success-600', accent: '#34955D' },
    info:        { icon: Info,          ring: 'bg-info-50 text-info-600',       accent: '#3C8DC5' },
    error:       { icon: AlertTriangle, ring: 'bg-danger-50 text-danger-600',   accent: '#F43F5E' },
    oz:          { icon: Sparkles,      ring: 'bg-accent-50 text-accent-600',   accent: '#E29A28' },
    achievement: { icon: Trophy,        ring: 'bg-primary-50 text-primary-600', accent: '#6A52DC' },
};

const ToastStack = () => {
    const { toasts, dismissToast } = useUI();
    if (!toasts.length) return null;

    return (
        <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:right-5 sm:left-auto"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
            {toasts.map((t, i) => {
                const { icon: Icon, ring, accent } = STYLE[t.type] || STYLE.info;
                return (
                    <div
                        key={t.id}
                        className="pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl p-3.5 animate-slide-down"
                        style={{
                            animationDelay: `${i * 0.055}s`,
                            background: 'rgba(255,255,255,0.86)',
                            backdropFilter: 'blur(24px) saturate(160%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                            border: `1px solid ${accent}28`,
                            boxShadow: `0 0 0 1px ${accent}12, 0 8px 32px -8px rgba(33,30,42,0.18), 0 2px 8px -2px rgba(33,30,42,0.10)`,
                        }}
                    >
                        {/* Left accent stripe */}
                        <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-[3px] rounded-r-full"
                            style={{ background: accent }}
                        />

                        {/* Icon badge */}
                        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', ring)}>
                            <Icon size={18} strokeWidth={2.2} />
                        </span>

                        {/* Text */}
                        <div className="min-w-0 flex-1 pt-0.5">
                            <p className="text-sm font-bold leading-tight text-neutral-900">{t.title}</p>
                            {t.message && (
                                <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">{t.message}</p>
                            )}
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => dismissToast(t.id)}
                            aria-label="Bildirimi kapat"
                            className="rounded-lg p-1.5 text-neutral-300 transition-all hover:bg-neutral-100 hover:text-neutral-600 active:scale-90"
                        >
                            <X size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastStack;
