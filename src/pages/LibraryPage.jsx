import React, { useMemo, useState } from 'react';
import { BookOpen, Gamepad2, Mail, Trash2, PenLine, Globe2, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import SegmentedTabs from '../components/ui/SegmentedTabs';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { CONTENT_TYPES, CATEGORIES } from '../config/constants';
import { formatDate } from '../utils/helpers';

const TYPE_ICONS = { story: BookOpen, game: Gamepad2, letter: Mail };

const LibraryPage = () => {
    const { creations, removeCreation } = useStory();
    const { navigate, addToast } = useUI();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [pendingDelete, setPendingDelete] = useState(null);

    const filtered = useMemo(
        () =>
            creations.filter((c) => {
                const matchesType = filter === 'all' || c.type === filter;
                const matchesSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase());
                return matchesType && matchesSearch;
            }),
        [creations, filter, search]
    );

    const confirmDelete = () => {
        removeCreation(pendingDelete.id);
        addToast('info', 'Eser silindi', `"${pendingDelete.title}" kütüphanenden kaldırıldı.`);
        setPendingDelete(null);
    };

    return (
        <div className="space-y-6">
            <header className="animate-rise-in">
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Kütüphanem</h1>
                <p className="text-sm font-bold text-neutral-400">Dönüşümlerinin özel koleksiyonu — yalnızca sen görebilirsin.</p>
            </header>

            {creations.length > 0 && (
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
                            placeholder="Eser ara…"
                            aria-label="Eser ara"
                            className="h-10 w-full rounded-full border border-neutral-200 bg-white pl-9 pr-4 text-sm font-medium placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100 sm:w-56"
                        />
                    </div>
                </div>
            )}

            {creations.length === 0 ? (
                <Card className="animate-rise-in">
                    <EmptyState
                        emoji="📚"
                        title="Kütüphanen henüz boş"
                        description="İlk dönüşümünü yaptığında eserin burada, sana özel rafında duracak."
                        action={<Button icon={PenLine} onClick={() => navigate('olustur')}>İlk Eserini Oluştur</Button>}
                    />
                </Card>
            ) : filtered.length === 0 ? (
                <Card className="animate-fade-in">
                    <EmptyState emoji="🔍" title="Eşleşen eser yok" description="Farklı bir arama ya da filtre deneyebilirsin." />
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 stagger-children">
                    {filtered.map((c) => {
                        const Icon = TYPE_ICONS[c.type] || BookOpen;
                        return (
                            <Card key={c.id} hover className="group relative flex flex-col p-5">
                                <button
                                    onClick={() => navigate(`icerik/${c.id}`)}
                                    className="flex-1 text-left"
                                    aria-label={`${c.title} eserini aç`}
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span
                                            className="flex h-11 w-11 items-center justify-center rounded-xl"
                                            style={{ background: `${c.themeColor || '#6A52DC'}14`, color: c.themeColor || '#6A52DC' }}
                                        >
                                            <Icon size={19} />
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            {c.sharedId && (
                                                <Badge tone="success"><Globe2 size={11} /> Toplulukta</Badge>
                                            )}
                                            <Badge tone="outline">{CATEGORIES[c.category]?.label || CONTENT_TYPES[c.type]?.label}</Badge>
                                        </div>
                                    </div>
                                    <h3 className="mb-1 font-extrabold text-neutral-900 transition-colors group-hover:text-primary-700">{c.title}</h3>
                                    {c.growthLesson && (
                                        <p className="mb-3 font-serif text-[13px] italic leading-relaxed text-neutral-500 line-clamp-snug">"{c.growthLesson}"</p>
                                    )}
                                    <p className="text-[12px] font-bold text-neutral-400">{formatDate(c.createdAt)}</p>
                                </button>
                                <button
                                    onClick={() => setPendingDelete(c)}
                                    aria-label={`${c.title} eserini sil`}
                                    className="absolute bottom-4 right-4 rounded-lg p-2 text-neutral-300 opacity-0 transition-all hover:bg-danger-50 hover:text-danger-500 focus-visible:opacity-100 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Silme onayı */}
            <Modal open={!!pendingDelete} onClose={() => setPendingDelete(null)} size="sm" labelledBy="delete-title">
                <div className="px-7 pb-7 pt-9 text-center">
                    <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-50 text-danger-500">
                        <Trash2 size={24} />
                    </span>
                    <h2 id="delete-title" className="mb-2 text-xl font-extrabold">Eseri silmek üzeresin</h2>
                    <p className="mb-7 text-sm leading-relaxed text-neutral-500">
                        "<strong>{pendingDelete?.title}</strong>" kalıcı olarak silinecek. Bu işlem geri alınamaz.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="secondary" className="flex-1" onClick={() => setPendingDelete(null)}>Vazgeç</Button>
                        <Button variant="danger" className="flex-1" onClick={confirmDelete}>Evet, Sil</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LibraryPage;
