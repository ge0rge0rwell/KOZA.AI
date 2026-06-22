import React, { useState } from 'react';
import { Send, ShieldCheck } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { useStory } from '../context/StoryContext';
import { useUser } from '../context/UserContext';
import { useUI } from '../context/UIContext';
import { truncate } from '../utils/helpers';

/** Anonim topluluk paylaşımı — ne paylaşılacağı açıkça gösterilir (gizlilik şeffaflığı). */
const ShareDialog = ({ creation, open, onClose, onShared }) => {
    const { shareCreation } = useStory();
    const { profile } = useUser();
    const { addToast } = useUI();
    const [busy, setBusy] = useState(false);

    if (!creation) return null;

    const firstText =
        creation.type === 'story'
            ? creation.pages?.[0]?.content
            : creation.type === 'game'
                ? creation.levels?.[0]?.scenario
                : creation.letter?.paragraphs?.[0];

    const share = async () => {
        setBusy(true);
        try {
            await shareCreation(creation);
            addToast('success', 'Toplulukla paylaşıldı', 'Eserin artık başkalarına ilham veriyor 🕊️');
            onShared?.();
            onClose();
        } catch (e) {
            console.error('Paylaşım hatası:', e);
            addToast('error', 'Paylaşılamadı', 'Bağlantını kontrol edip tekrar dener misin?');
        } finally {
            setBusy(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} size="sm" labelledBy="share-title">
            <div className="px-7 pb-7 pt-9">
                <h2 id="share-title" className="mb-1.5 text-center text-xl font-extrabold">Toplulukla paylaş</h2>
                <p className="mb-6 text-center text-[13px] leading-relaxed text-neutral-500">
                    Eserin, topluluk galerisinde <strong>yalnızca kelebek adınla</strong> görünür.
                </p>

                <div className="mb-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="mb-2.5 flex items-center gap-2.5">
                        <Avatar emoji={profile.emoji} color={profile.color} size={30} />
                        <span className="text-[13px] font-extrabold text-neutral-700">{profile.pseudonym || 'Anonim Kelebek'}</span>
                    </div>
                    <p className="mb-1 font-bold text-neutral-900">{creation.title}</p>
                    <p className="text-[13px] leading-relaxed text-neutral-500">{truncate(firstText, 140)}</p>
                </div>

                <div className="mb-6 flex items-start gap-2.5 rounded-2xl bg-success-50 px-4 py-3">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-success-600" />
                    <p className="text-[12px] font-bold leading-relaxed text-success-700">
                        Başta yazdığın ham deneyim metni paylaşılmaz — yalnızca dönüştürülmüş eser görünür.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>Vazgeç</Button>
                    <Button className="flex-1" icon={Send} loading={busy} onClick={share}>Paylaş</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ShareDialog;
