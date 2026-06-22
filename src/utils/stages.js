import { STAGES } from '../config/constants';

/** Toplam ÖZ'e göre mevcut metamorfoz aşamasını döner. */
export const stageFor = (totalOz = 0) => {
    let current = STAGES[0];
    for (const s of STAGES) {
        if (totalOz >= s.min) current = s;
    }
    return current;
};

export const nextStage = (totalOz = 0) => {
    const current = stageFor(totalOz);
    return STAGES.find((s) => s.n === current.n + 1) || null;
};

/** Mevcut aşama içindeki ilerleme (0–100). */
export const stageProgress = (totalOz = 0) => {
    const current = stageFor(totalOz);
    const next = nextStage(totalOz);
    if (!next) return 100;
    return Math.min(100, Math.round(((totalOz - current.min) / (next.min - current.min)) * 100));
};

export const ozToNext = (totalOz = 0) => {
    const next = nextStage(totalOz);
    return next ? next.min - totalOz : 0;
};

/** Aşama geçişi kontrolü (kutlama bildirimi için). */
export const stageTransition = (prevOz, newOz) => {
    const a = stageFor(prevOz);
    const b = stageFor(newOz);
    return b.n > a.n ? b : null;
};
