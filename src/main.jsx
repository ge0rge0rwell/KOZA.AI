import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { UIProvider } from './context/UIContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { StoryProvider } from './context/StoryContext.jsx';
import { analytics } from './lib/analytics';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });
analytics.init();

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
