import React, { useMemo, useState } from 'react';
import { BookOpen, Gamepad2, Mail, Heart, Handshake, Eye, Search, PenLine, Flag } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import EmptyState from '../components/ui/EmptyState';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import { GridSkeleton } from '../components/ui/Skeleton';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { CATEGORIES, CONTENT_TYPES } from '../config/constants';
import { timeAgo, cn } from '../utils/helpers';

const TYPE_ICONS = { story: BookOpen, game: Gamepad2, letter: Mail };

const CommunityCard = ({ item, onOpen, onHeart, onHug, onReport, hearted, hugged }) => {
    const Icon = TYPE_ICONS[item.type] || BookOpen;
    return (
        <Card hover className="group flex flex-col p-5">
            <button onClick={onOpen} className="flex-1 text-left" aria-label={`${item.title} eserini keşfet`}>
                <div className="mb-3 flex items-center gap-2.5">
                    <Avatar emoji={item.authorEmoji} color={item.authorColor} size={32} />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-extrabold text-neutral-700">{item.authorPseudonym}</p>
                        <p className="text-[11px] font-bold text-neutral-400">{timeAgo(item.createdAt)}</p>
                    </div>
                    <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${item.themeColor || '#6A52DC'}14`, color: item.themeColor || '#6A52DC' }}
                    >
                        <Icon size={16} />
                    </span>
                </div>
                <Badge tone="outline" className="mb-2.5">{CATEGORIES[item.category]?.label || 'Diğer'}</Badge>
                <h3 className="mb-1.5 font-extrabold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
                    {item.title}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-neutral-500 line-clamp-snug">{item.preview}</p>
            </button>

            <div className="flex items-center gap-1.5 border-t border-neutral-100 pt-3.5">
                <button
                    onClick={onHeart}
                    aria-pressed={hearted}
                    title="Kalp gönder"
                    className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-extrabold transition-all active:scale-90',
                        hearted ? 'bg-danger-50 text-danger-500' : 'text-neutral-400 hover:bg-danger-50 hover:text-danger-500'
                    )}
                >
                    <Heart size={14} fill={hearted ? 'currentColor' : 'none'} />
                    {item.hearts || 0}
                </button>
                <button
                    onClick={onHug}
                    aria-pressed={hugged}
                    title='"Hemhal" — ben de yaşadım'
                    className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-extrabold transition-all active:scale-90',
                        hugged ? 'bg-primary-50 text-primary-600' : 'text-neutral-400 hover:bg-primary-50 hover:text-primary-600'
                    )}
                >
                    <Handshake size={14} />
                    {item.hugs || 0}
                </button>
                <span className="flex items-center gap-1.5 px-2 text-[12px] font-extrabold text-neutral-300">
                    <Eye size={14} />
                    {item.reads || 0}
                </span>
                <button
                    onClick={onReport}
                    title="İçeriği bildir"
                    aria-label="İçeriği bildir"
                    className="ml-auto rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-100 hover:text-neutral-500"
                >
                    <Flag size={13} />
                </button>
            </div>
        </Card>
    );
};

const CommunityPage = () => {
    const { community, communityLoading, heartItem, hugItem, reportItem, interactions } = useStory();
    const { navigate } = useUI();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = useMemo(
        () =>
            community.filter((w) => {
                const matchesType = filter === 'all' || w.type === filter;
                const q = search.toLowerCase();
                const matchesSearch = !q || w.title?.toLowerCase().includes(q) || w.preview?.toLowerCase().includes(q);
                return matchesType && matchesSearch;
            }),
        [community, filter, search]
    );

    return (
        <div className="space-y-6">
            <header className="animate-rise-in">
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Topluluk Galerisi</h1>
                <p className="max-w-xl text-sm font-bold leading-relaxed text-neutral-400">
                    Senin gibi yol alanların dönüşümlerine tanıklık et. Bir kalp gönder, "ben de yaşadım" de — empati böyle çoğalır.
                </p>
            </header>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-rise-in" style={{ animationDelay: '0.06s' }}>
                <SegmentedTabs
                    active={filter}
                    onChange={setFilter}
                    tabs={[
                        { id: 'all', label: 'Hepsi' },
                        { id: 'story', label: 'Hikâyeler', icon: BookOpen },
                        { id: 'game', label: 'Oyunlar', icon: Gamepad2 },
                        { id: 'letter', label: 'Mektuplar', icon: Mail },
                    ]}
                />
                <div className="relative">
                    <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Eser veya konu ara…"
                        aria-label="Toplulukta ara"
                        className="h-10 w-full rounded-full border border-neutral-200 bg-white pl-9 pr-4 text-sm font-medium placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100 sm:w-60"
                    />
                </div>
            </div>

            {communityLoading ? (
                <GridSkeleton count={6} />
            ) : community.length === 0 ? (
                <Card className="animate-rise-in">
                    <EmptyState
                        emoji="🕊️"
                        title="Galeri yeni filizleniyor"
                        description="Henüz kimse paylaşım yapmamış. İlk dönüşümünü paylaşan sen ol — bir başkasının kozasına ışık olabilir."
                        action={<Button icon={PenLine} onClick={() => navigate('olustur')}>Dönüşüm Oluştur</Button>}
                    />
                </Card>
            ) : filtered.length === 0 ? (
                <Card className="animate-fade-in">
                    <EmptyState emoji="🔍" title="Eşleşen eser bulunamadı" description="Farklı bir arama ya da filtre deneyebilirsin." />
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                    {filtered.map((item) => (
                        <CommunityCard
                            key={item.id}
                            item={item}
                            hearted={interactions.hearted.includes(item.id)}
                            hugged={interactions.hugged.includes(item.id)}
                            onOpen={() => navigate(`topluluk/${item.id}`)}
                            onHeart={() => heartItem(item)}
                            onHug={() => hugItem(item)}
                            onReport={() => reportItem(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityPage;
