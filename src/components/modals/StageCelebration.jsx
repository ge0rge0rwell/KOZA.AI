import React, { useEffect } from 'react';
import Button from '../ui/Button';
import CocoonVisual from '../cocoon/CocoonVisual';
import { useUI } from '../../context/UIContext';
import { fireCelebration } from '../../lib/confetti';

/** Aşama atlama kutlaması — tam ekran an. */
const StageCelebration = () => {
    const { celebration, endCelebration } = useUI();
    const stage = celebration?.stage;

    useEffect(() => {
        if (stage) fireCelebration();
    }, [stage]);

    if (!stage) return null;

    return (
        <div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-neutral-950/45 px-5 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Yeni aşama kutlaması"
        >
            <div className="card w-full max-w-sm p-8 text-center animate-scale-in sm:p-10">
                <CocoonVisual stage={stage.n} size={180} className="mx-auto mb-2" />
                <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.25em] text-neutral-400">
                    Aşama {stage.n} açıldı
                </p>
                <h2 className="mb-3 text-3xl font-extrabold tracking-tight" style={{ color: stage.color }}>
                    {stage.name}
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-neutral-500">{stage.blurb}</p>
                <Button size="lg" className="w-full" onClick={endCelebration}>
                    Yola Devam 🦋
                </Button>
            </div>
        </div>
    );
};

export default StageCelebration;
