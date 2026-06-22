import React, { useCallback } from 'react';
import { Heart, Handshake, Users } from 'lucide-react';
import StoryReader from '../components/readers/StoryReader';
import GamePlayer from '../components/readers/GamePlayer';
import LetterReader from '../components/readers/LetterReader';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';

/** #/topluluk/:id — topluluktan bir esere tanıklık etme görünümü. */
const CommunityItemView = () => {
    const { route, navigate } = useUI();
    const { getCommunityItem, communityLoading, heartItem, hugItem, markExplored, interactions } = useStory();

    const item = getCommunityItem(route.param);
    const goBack = () => navigate('topluluk');

    const onFinish = useCallback(() => {
        if (item) markExplored(item);
    }, [item, markExplored]);

    if (!item) {
        return (
            <div className="flex min-h-dvh items-center justify-center px-5">
                <div className="ambient-bg" aria-hidden />
                {communityLoading ? (
                    <Spinner size={36} />
                ) : (
                    <EmptyState
                        emoji="🕊️"
                        title="Eser bulunamadı"
                        description="Bu eser kaldırılmış olabilir ya da bağlantı hatalı."
                        action={<Button onClick={goBack}>Topluluğa Dön</Button>}
                    />
                )}
            </div>
        );
    }

    const hearted = interactions.hearted.includes(item.id);
    const hugged = interactions.hugged.includes(item.id);

    const footerActions = (
        <>
            <Button
                variant={hearted ? 'soft' : 'secondary'}
                icon={Heart}
                onClick={() => heartItem(item)}
                disabled={hearted}
            >
                {hearted ? 'Kalbin ulaştı' : 'Kalp Gönder'}
            </Button>
            <Button
                variant={hugged ? 'soft' : 'secondary'}
                icon={Handshake}
                onClick={() => hugItem(item)}
                disabled={hugged}
            >
                {hugged ? 'Hemhal oldun' : 'Ben de Yaşadım'}
            </Button>
            <Button icon={Users} onClick={goBack}>Topluluğa Dön</Button>
        </>
    );

    const readerProps = { onBack: goBack, footerActions, onFinish };

    return (
        <>
            {item.type === 'story' && <StoryReader story={item} {...readerProps} />}
            {item.type === 'game' && <GamePlayer game={item} {...readerProps} />}
            {item.type === 'letter' && <LetterReader letter={item} {...readerProps} />}
        </>
    );
};

export default CommunityItemView;
