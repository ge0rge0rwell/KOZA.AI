import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const MANIFEST = {
    name: 'KOZA — Hikâyeni Yeniden Yaz',
    short_name: 'KOZA',
    description:
        'Yaşadığın zorlukları seni güçlendiren hikâyelere, oyunlara ve mektuplara dönüştüren empati temelli güvenli alan.',
    theme_color: '#FAF9F7',
    background_color: '#FAF9F7',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/',
    lang: 'tr',
    icons: [
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    categories: ['education', 'lifestyle', 'health'],
}

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: false, // we register manually in main.jsx after first paint
            includeAssets: ['apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
            manifest: MANIFEST,
            workbox: {
                // Precache all built assets
                globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,woff2}'],
                // Don't claim clients immediately — avoids disrupting active users mid-session
                skipWaiting: false,
                clientsClaim: false,
                // Runtime caching for external resources
                runtimeCaching: [
                    {
                        // Google Fonts stylesheet — revalidate in background, serve stale instantly
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'gfonts-stylesheets',
                            expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 7 },
                        },
                    },
                    {
                        // Actual font files — cache forever (URLs are content-hashed by Google)
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gfonts-webfonts',
                            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        // Firebase REST API — network first, 3s timeout, fallback to cache
                        urlPattern: /^https:\/\/firestore\.googleapis\.com\//,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'firestore-cache',
                            networkTimeoutSeconds: 3,
                            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
                        },
                    },
                ],
            },
        }),
    ],

    build: {
        // Target modern browsers — smaller output, no legacy polyfills
        target: 'es2022',
        // Modern browsers natively support module preload — skip ~3 kB polyfill
        modulePreload: { polyfill: false },
        // Keep CSS in separate file for parallel download
        cssCodeSplit: false,
        // Inline assets smaller than 4 kB as base64 (saves HTTP round-trips)
        assetsInlineLimit: 4096,
        // Aggressive Rollup settings
        rollupOptions: {
            treeshake: {
                preset: 'smallest',
                propertyReadSideEffects: false,
            },
            output: {
                // Named chunk splitting — explicit control over what loads when
                manualChunks(id) {
                    // Firebase: large but needed for auth — keep in parallel chunk
                    if (id.includes('node_modules/firebase'))       return 'firebase';
                    // React core — tiny, shares cache across Vercel deployments
                    if (id.includes('node_modules/react'))          return 'react';
                    // Lucide icons — large icon set, separate for cache longevity
                    if (id.includes('node_modules/lucide-react'))   return 'icons';
                    // Seed story content — lazy-loaded after first paint
                    if (id.includes('seedStories'))                 return 'seed';
                    // AI prompt fragments — only needed in CreatePage
                    if (id.includes('seedFragments'))               return 'seed-ai';
                    // canvas-confetti — only needed on celebrations
                    if (id.includes('canvas-confetti'))             return 'confetti';
                },
                // Compact output — eliminates whitespace in generated code
                compact: true,
                // Use const instead of var — engines optimize const better
                generatedCode: { constBindings: true },
            },
        },
    },
})
