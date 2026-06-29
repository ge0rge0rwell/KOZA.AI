import React, { useEffect } from 'react';
import Button from '../ui/Button';
import CocoonVisual from '../cocoon/CocoonVisual';
import { useUI } from '../../context/UIContext';
import { fireCelebration } from '../../lib/confetti';

const STAGE_MESSAGES = {
    1: 'Her adım, içindeki kelebeği biraz daha yakınlaştırıyor.',
    2: 'Her adım, içindeki kelebeği biraz daha yakınlaştırıyor.',
    3: 'Her adım, içindeki kelebeği biraz daha yakınlaştırıyor.',
    4: 'Kabuk çatladı — artık ışık içeriden geliyor.',
    5: 'Kanatların şekilleniyor. Dönüşüm hızlanıyor.',
    6: 'Kanatların şekilleniyor. Dönüşüm hızlanıyor.',
    7: 'Tam kelebek oldun. Kozandan özgürsün. 🦋',
};

const StageCelebration = () => {
    const { celebration, endCelebration } = useUI();
    const stage = celebration?.stage;

    useEffect(() => {
        if (stage) fireCelebration();
    }, [stage]);

    if (!stage) return null;

    const isMax = stage.n === 7;

    return (
        <div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-neutral-950/70 px-5 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Yeni aşama kutlaması"
        >
            <div
                className="grain relative w-full max-w-md overflow-hidden rounded-[1.75rem] p-8 text-center animate-scale-in sm:p-10"
                style={{
                    background: `linear-gradient(160deg, white 0%, ${stage.color}08 100%)`,
                    border: `1px solid ${stage.color}30`,
                    boxShadow: `0 0 0 1px ${stage.color}18, 0 24px 64px -16px ${stage.color}40, 0 0 0 8px ${stage.color}08`,
                }}
            >
                <p
                    className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]"
                    style={{ color: stage.color }}
                >
                    ✦ Aşama {stage.n} / 7 açıldı ✦
                </p>
                <div
                    className="mx-auto mb-4 w-fit"
                    style={{ filter: `drop-shadow(0 0 32px ${stage.color}60)` }}
                >
                    <CocoonVisual stage={stage.n} size={220} />
                </div>
                <h2
                    className="mb-2 text-3xl font-extrabold tracking-tight animate-rise-in"
                    style={{ color: stage.color, animationDelay: '0.15s' }}
                >
                    {stage.name}
                </h2>
                <p className="mb-1 text-sm leading-relaxed text-neutral-500">{stage.blurb}</p>
                <p className="mb-8 text-[13px] font-bold italic text-neutral-400">
                    {STAGE_MESSAGES[stage.n] ?? STAGE_MESSAGES[1]}
                </p>
                <Button
                    size="lg"
                    className="w-full"
                    variant={isMax ? 'accent' : undefined}
                    onClick={endCelebration}
                >
                    {isMax ? 'Dönüşüm Tamamlandı 🦋' : 'Yola Devam →'}
                </Button>
            </div>
        </div>
    );
};

export default StageCelebration;
