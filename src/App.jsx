import React, { Suspense, lazy } from 'react';
import { useAuth } from './context/AuthContext';
import { useUser } from './context/UserContext';
import { useUI } from './context/UIContext';
import AppShell from './components/layout/AppShell';
import ToastStack from './components/ui/ToastStack';
import Spinner from './components/ui/Spinner';
import SafetyModal from './components/modals/SafetyModal';
import UpgradeModal from './components/modals/UpgradeModal';
import StageCelebration from './components/modals/StageCelebration';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CounselorPage = lazy(() => import('./pages/CounselorPage'));
const ContentView = lazy(() => import('./pages/ContentView'));
const CommunityItemView = lazy(() => import('./pages/CommunityItemView'));

const FullScreenLoader = () => (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-50">
        <div className="ambient-bg" aria-hidden />
        <div className="flex flex-col items-center gap-4">
            <span className="text-4xl animate-float-soft" aria-hidden>🦋</span>
            <Spinner size={28} />
        </div>
    </div>
);

const App = () => {
    const { user, loading } = useAuth();
    const { profile } = useUser();
    const { route } = useUI();

    if (loading) return <FullScreenLoader />;

    /* ---------- Giriş yapılmamış → tanıtım ---------- */
    if (!user) {
        return (
            <Suspense fallback={<FullScreenLoader />}>
                <LandingPage />
                <ToastStack />
            </Suspense>
        );
    }

    /* ---------- İlk kez → karşılama ---------- */
    if (!profile.onboarded) {
        return (
            <Suspense fallback={<FullScreenLoader />}>
                <OnboardingPage />
                <ToastStack />
            </Suspense>
        );
    }

    /* ---------- Tam ekran görünümler (kabuk dışı) ---------- */
    if (route.path === 'icerik' && route.param) {
        return (
            <Suspense fallback={<FullScreenLoader />}>
                <ContentView />
                <ToastStack />
                <StageCelebration />
            </Suspense>
        );
    }
    if (route.path === 'topluluk' && route.param) {
        return (
            <Suspense fallback={<FullScreenLoader />}>
                <CommunityItemView />
                <ToastStack />
                <StageCelebration />
            </Suspense>
        );
    }

    /* ---------- Kabuk içi sayfalar ---------- */
    const PAGES = {
        '': HomePage,
        olustur: CreatePage,
        kutuphane: LibraryPage,
        topluluk: CommunityPage,
        yolculuk: JourneyPage,
        profil: ProfilePage,
        rehber: CounselorPage,
    };
    const Page = PAGES[route.path] || HomePage;

    return (
        <>
            <AppShell>
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-32">
                            <Spinner size={28} />
                        </div>
                    }
                >
                    <Page key={route.path} />
                </Suspense>
            </AppShell>
            <ToastStack />
            <SafetyModal />
            <UpgradeModal />
            <StageCelebration />
        </>
    );
};

export default App;
