import React, { useEffect, useRef, useState } from 'react';
import { HeartHandshake, Phone, Wind, ArrowLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import { CRISIS_RESOURCES, SAFETY_DISCLAIMER } from '../../config/constants';

/* 4-7-8 tekniğine yakın, çocuk dostu basitleştirilmiş nefes döngüsü */
const PHASES = [
    { key: 'in', label: 'Nefes al', secs: 4 },
    { key: 'hold', label: 'Tut', secs: 4 },
    { key: 'out', label: 'Yavaşça ver', secs: 6 },
];

const BreathingExercise = ({ onDone }) => {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [secondsLeft, setSecondsLeft] = useState(PHASES[0].secs);
    const doneRef = useRef(false);
    const TOTAL_ROUNDS = 3;
    const phase = PHASES[phaseIndex];

    useEffect(() => {
        const t = setInterval(() => {
            setSecondsLeft((s) => {
                if (s > 1) return s - 1;
                // Faz bitti → sıradakine geç
                setPhaseIndex((p) => {
                    const nextP = (p + 1) % PHASES.length;
                    if (nextP === 0) {
                        setRound((r) => {
                            if (r >= TOTAL_ROUNDS && !doneRef.current) {
                                doneRef.current = true;
                                setTimeout(onDone, 400);
                            }
                            return Math.min(r + 1, TOTAL_ROUNDS);
                        });
                    }
                    return nextP;
                });
                return PHASES[(phaseIndex + 1) % PHASES.length].secs;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [phaseIndex, onDone]);

    const scale = phase.key === 'in' ? 1.35 : phase.key === 'hold' ? 1.35 : 1;

    return (
        <div className="flex flex-col items-center py-6 text-center" role="timer" aria-live="polite">
            <div className="relative mb-8 flex h-44 w-44 items-center justify-center">
                <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-primary-100"
                    style={{ transform: `scale(${scale})`, transition: `transform ${phase.secs}s ease-in-out` }}
                />
                <span
                    aria-hidden
                    className="absolute inset-4 rounded-full bg-primary-200/70"
                    style={{ transform: `scale(${scale})`, transition: `transform ${phase.secs}s ease-in-out` }}
                />
                <span className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-primary-600 text-white shadow-card">
                    <span className="text-2xl font-extrabold tabular-nums">{secondsLeft}</span>
                </span>
            </div>
            <p className="mb-1 text-xl font-extrabold text-neutral-900">{phase.label}</p>
            <p className="text-[13px] font-bold text-neutral-400">Tur {round} / {TOTAL_ROUNDS} · Bedenine "güvendesin" sinyali gönderiyorsun</p>
        </div>
    );
};

const SafetyModal = () => {
    const { activeModal, closeModal, addToast } = useUI();
    const { awardOz } = useUser();
    const [view, setView] = useState('resources'); // 'resources' | 'breathing'
    const open = activeModal === 'safety';

    /* Her kapanışta görünümü sıfırla — modal bir sonraki açılışta hep kaynaklarla başlar */
    const handleClose = () => {
        setView('resources');
        closeModal();
    };

    const breathingDone = () => {
        awardOz('breathing_done', 'Nefes egzersizi tamamlandı 🌬️');
        addToast('success', 'Harikasın', 'Kendine bir iyilik yaptın. Bunu istediğin zaman tekrarlayabilirsin.');
        setView('resources');
    };

    return (
        <Modal open={open} onClose={handleClose} size="md" labelledBy="safety-title">
            <div className="px-7 pb-8 pt-10">
                {view === 'resources' ? (
                    <>
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-50 text-danger-500">
                            <HeartHandshake size={26} />
                        </span>
                        <h2 id="safety-title" className="mb-2 text-center text-2xl font-extrabold">Yalnız değilsin</h2>
                        <p className="mx-auto mb-7 max-w-md text-center text-sm leading-relaxed text-neutral-500">
                            Zor bir an yaşıyorsan, seni gerçekten dinleyecek insanlar var.
                            Destek istemek güçlülüktür — ispiyon değil.
                        </p>

                        <div className="mb-5 space-y-2.5">
                            {CRISIS_RESOURCES.map((r) => (
                                <div key={r.name} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-danger-500 shadow-soft">
                                        <Phone size={18} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-extrabold text-neutral-900">{r.name}</p>
                                        <p className="text-[12px] font-bold leading-snug text-neutral-500">{r.desc}</p>
                                    </div>
                                    {r.href ? (
                                        <a
                                            href={r.href}
                                            className="shrink-0 rounded-full bg-danger-500 px-4 py-2 text-[13px] font-extrabold text-white transition-transform hover:bg-danger-600 active:scale-95"
                                        >
                                            {r.contact}
                                        </a>
                                    ) : (
                                        <span className="shrink-0 rounded-full bg-neutral-200/70 px-3.5 py-2 text-[12px] font-extrabold text-neutral-600">
                                            {r.contact}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setView('breathing')}
                            className="group mb-5 flex w-full items-center gap-3.5 rounded-2xl border border-primary-200 bg-primary-50/70 p-4 text-left transition-all hover:bg-primary-50"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white transition-transform group-hover:scale-110">
                                <Wind size={18} />
                            </span>
                            <span className="flex-1">
                                <span className="block text-sm font-extrabold text-primary-800">Şu an kaygılı hissediyorsan</span>
                                <span className="block text-[12px] font-bold text-primary-600">1 dakikalık nefes egzersizi yap · +10 ÖZ</span>
                            </span>
                        </button>

                        <p className="text-center text-[11px] font-bold leading-relaxed text-neutral-300">{SAFETY_DISCLAIMER}</p>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setView('resources')}
                            className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                        >
                            <ArrowLeft size={14} /> Kaynaklara dön
                        </button>
                        <h2 id="safety-title" className="text-center text-xl font-extrabold">Benimle nefes al</h2>
                        <BreathingExercise onDone={breathingDone} />
                    </>
                )}
            </div>
        </Modal>
    );
};

export default SafetyModal;
