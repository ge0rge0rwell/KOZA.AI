import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { UIProvider } from './context/UIContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { StoryProvider } from './context/StoryContext.jsx';

// Render the app immediately — nothing blocks first paint
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <UIProvider>
                <AuthProvider>
                    <UserProvider>
                        <StoryProvider>
                            <App />
                        </StoryProvider>
                    </UserProvider>
                </AuthProvider>
            </UIProvider>
        </ErrorBoundary>
    </StrictMode>
);

// Defer non-critical bootstrap to after first paint
// requestIdleCallback fires when the browser is idle between frames
const defer = typeof requestIdleCallback === 'function'
    ? (fn) => requestIdleCallback(fn, { timeout: 3000 })
    : (fn) => setTimeout(fn, 200);

defer(() => {
    // Service worker registration — not needed for first paint
    import('virtual:pwa-register').then(({ registerSW }) => {
        registerSW({ immediate: false });
    });
    // Analytics — never blocks UI
    import('./lib/analytics').then(({ analytics }) => {
        analytics.init();
    });
});
