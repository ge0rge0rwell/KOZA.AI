import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Uygulama hatası:', error, info);
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center">
                <span className="mb-5 text-5xl" aria-hidden>🦋</span>
                <h1 className="mb-2 text-2xl font-extrabold text-neutral-900">Küçük bir türbülans yaşadık</h1>
                <p className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-500">
                    Beklenmedik bir hata oluştu. Endişelenme — eserlerin güvende. Sayfayı yenileyerek devam edebilirsin.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="h-11 rounded-full bg-primary-600 px-7 text-sm font-bold text-white transition-transform hover:bg-primary-700 active:scale-95"
                >
                    Sayfayı Yenile
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
