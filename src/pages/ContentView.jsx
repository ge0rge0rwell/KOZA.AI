import React, { useState } from 'react';
import { Share2, BookMarked, Check } from 'lucide-react';
import StoryReader from '../components/readers/StoryReader';
import GamePlayer from '../components/readers/GamePlayer';
import LetterReader from '../components/readers/LetterReader';
import ShareDialog from '../components/ShareDialog';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';

/** #/icerik/:id — kullanıcının kendi eserini okuma/oynama görünümü. */
const ContentView = () => {
    const { route, navigate } = useUI();
    const { getCreation } = useStory();
    const [shareOpen, setShareOpen] = useState(false);

    const creation = getCreation(route.param);

    if (!creation) {
        return (
            <div className="flex min-h-dvh items-center justify-center px-5">
                <div className="ambient-bg" aria-hidden />
                <EmptyState
                    emoji="🍂"
                    title="Eser bulunamadı"
                    description="Bu eser silinmiş olabilir ya da bağlantı hatalı."
                    action={<Button onClick={() => navigate('kutuphane')}>Kütüphaneme Dön</Button>}
                />
            </div>
        );
    }

    const goBack = () => navigate('kutuphane');

    const footerActions = (
        <>
            {creation.sharedId ? (
                <Button variant="secondary" icon={Check} disabled>Toplulukta paylaşıldı</Button>
            ) : (
                <Button variant="secondary" icon={Share2} onClick={() => setShareOpen(true)}>Toplulukla Paylaş</Button>
            )}
            <Button icon={BookMarked} onClick={goBack}>Kütüphaneme Dön</Button>
        </>
    );

    const readerProps = { onBack: goBack, footerActions };

    return (
        <>
            {creation.type === 'story' && <StoryReader story={creation} {...readerProps} />}
            {creation.type === 'game' && <GamePlayer game={creation} {...readerProps} />}
            {creation.type === 'letter' && <LetterReader letter={creation} {...readerProps} />}
            <ShareDialog creation={creation} open={shareOpen} onClose={() => setShareOpen(false)} />
        </>
    );
};

export default ContentView;
