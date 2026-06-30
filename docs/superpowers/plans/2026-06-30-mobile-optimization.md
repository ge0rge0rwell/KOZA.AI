# Mobile Optimization + Download Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all mobile UX issues across the app and add an APK download section with placeholder QR code to LandingPage.

**Architecture:** Three-pass approach — (1) global CSS fixes in `index.css`, (2) AppShell safe-area hardening, (3) LandingPage mobile fixes + new DownloadSection component inlined into the landing page.

**Tech Stack:** React 19, Tailwind CSS 4 (CSS-first via `@theme`/`@utility` in `src/index.css`), no TypeScript, no test suite — validate with `npm run build`.

## Global Constraints

- All user-visible text must remain Turkish ("sen" voice, 10–14 age-appropriate)
- No TypeScript — `.jsx` only
- Tailwind 4: utilities defined via `@utility` in `index.css`, never in `tailwind.config.js`; use `var(--color-…)` for token references inside `@utility` blocks, not `@apply` with color names
- `npm run build` must pass green before each commit
- No real APK URL exists yet — use `href="#indir"` placeholder
- QR code must be a self-contained inline SVG placeholder (no external image deps)
- `prefers-reduced-motion` must be respected on all new animations
- Crisis safety flows (`detectCrisis`, `CrisisCard`) must not be touched

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/index.css` | Modify | `card-hover` guard for touch devices, `touch-target` utility, `safe-area-header` utility |
| `src/components/layout/AppShell.jsx` | Modify | iOS notch/dynamic island safe-area top padding on mobile header, content top offset |
| `src/pages/LandingPage.jsx` | Modify | H1 size on xs, mobile hamburger nav, trust strip separator fix, show TransformPreview on mobile, add DownloadSection, fix CTA button stacking |

---

## Task 1: Global CSS mobile fixes

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: `.touch-target` utility (min 44×44px tap area), `.safe-area-header` utility, updated `card-hover` (hover-only devices), updated `ambient-bg`

- [ ] **Step 1: Add `card-hover` hover guard**

Find the existing `@utility card-hover` block in `src/index.css` (around line 138) and replace it:

```css
@utility card-hover {
    transition: transform 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft), border-color 0.3s var(--ease-out-soft);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lift), inset 0 1px 0 rgba(255, 255, 255, 0.9);
            border-color: var(--color-primary-200);
        }
    }
}
```

- [ ] **Step 2: Add `touch-target` and `safe-area-header` utilities**

After the `scrollbar-thin` utility block, add:

```css
@utility touch-target {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@utility safe-area-header {
    padding-top: env(safe-area-inset-top);
    height: calc(60px + env(safe-area-inset-top));
}
```

- [ ] **Step 3: Fix `ambient-bg` for mobile GPU performance**

Find the `ambient-bg` utility (search for `ambient-bg` in `index.css`) and add `will-change: transform` + `contain: layout` to each blob to reduce mobile compositing cost. If `ambient-bg` is not in `index.css` but in a different file, search and fix there.

If `ambient-bg` is an inline `@utility`:
```css
@utility ambient-bg {
    /* existing declarations preserved */
    contain: layout style;
}
```

If it's not a `@utility` (may be a class defined in `@layer base` or just used inline), just proceed to next step — skip this micro-fix.

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: `✓ built in` with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "fix(css): guard card-hover to pointer-fine, add touch-target + safe-area utilities"
```

---

## Task 2: AppShell iOS safe-area hardening

**Files:**
- Modify: `src/components/layout/AppShell.jsx`

**Interfaces:**
- Consumes: `.safe-area-header` utility from Task 1
- Produces: mobile header that clears iOS dynamic island / notch; content area top offset corrected; bottom nav already uses `pb-[env(safe-area-inset-bottom)]` ✓

- [ ] **Step 1: Apply safe-area to mobile header**

In `AppShell.jsx` find the mobile header `<header>` element (line ~118):

```jsx
<header className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-neutral-200/70 px-4 surface-tint lg:hidden">
```

Replace with:

```jsx
<header className="safe-area-header fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-neutral-200/70 px-4 surface-tint lg:hidden">
```

The `safe-area-header` utility sets `height: calc(60px + env(safe-area-inset-top))` and `padding-top: env(safe-area-inset-top)` so content stays below the notch/dynamic island. On non-notch devices `env(safe-area-inset-top)` evaluates to `0`, so nothing changes visually.

- [ ] **Step 2: Fix content main top-padding on mobile**

Content main element (line ~138):

```jsx
<main className="px-4 pb-32 pt-[76px] sm:px-6 lg:ml-[264px] lg:px-10 lg:pb-16 lg:pt-10">
```

Replace with:

```jsx
<main className="px-4 pb-32 sm:px-6 lg:ml-[264px] lg:px-10 lg:pb-16 lg:pt-10"
      style={{ paddingTop: 'calc(76px + env(safe-area-inset-top))' }}>
```

This ensures content doesn't slide under the now-taller safe-area header on notch devices. On desktop the `lg:pt-10` override via Tailwind still applies cleanly.

- [ ] **Step 3: Add `touch-target` class to small mobile buttons**

In the mobile header, the safety and profile buttons are small icon-only. Apply minimum touch target:

```jsx
{/* Safety button */}
<button
    onClick={() => openModal('safety')}
    aria-label="Destek hattı"
    className="touch-target rounded-full bg-danger-50 text-danger-500 transition-transform active:scale-90"
>
    <HeartHandshake size={17} strokeWidth={2.2} />
</button>
<button onClick={() => navigate('profil')} aria-label="Profilim" className="touch-target transition-transform active:scale-90">
    <Avatar emoji={profile.emoji} color={profile.color} size={36} ring />
</button>
```

- [ ] **Step 4: Bottom tab button touch targets**

`TabButton` component renders `<button>` with `py-1.5` — on a 64px bar this is fine, but add `touch-target` class to ensure 44px minimum:

```jsx
const TabButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={cn(
            'touch-target relative flex flex-col items-center gap-0.5 transition-all duration-200',
            active ? 'text-primary-600' : 'text-neutral-400 active:text-neutral-600'
        )}
    >
        ...rest unchanged
    </button>
);
```

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/AppShell.jsx
git commit -m "fix(shell): iOS safe-area header, touch targets on mobile nav buttons"
```

---

## Task 3: LandingPage mobile fixes + Download section

**Files:**
- Modify: `src/pages/LandingPage.jsx`

**Interfaces:**
- Consumes: nothing new
- Produces: mobile-responsive hero h1, mobile hamburger nav, readable trust strip, `DownloadSection` inline component with SVG QR placeholder

### 3A — Mobile hamburger nav

- [ ] **Step 1: Add hamburger state and mobile drawer**

At top of `LandingPage` component add state:

```jsx
const [showAuth, setShowAuth] = useState(false);
const [openFaq, setOpenFaq] = useState(0);
const [mobileNavOpen, setMobileNavOpen] = useState(false);
```

Replace the `<header>` block in LandingPage (lines 181–194) with:

```jsx
<header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/60 surface-tint"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}>
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo size="md" />
        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-bold text-neutral-500 md:flex" aria-label="Sayfa içi">
            <a href="#bilim" className="transition-colors hover:text-neutral-900">Bilim</a>
            <a href="#nasil" className="transition-colors hover:text-neutral-900">Nasıl çalışır?</a>
            <a href="#ozellikler" className="transition-colors hover:text-neutral-900">Özellikler</a>
            <a href="#tankliklar" className="transition-colors hover:text-neutral-900">Tanıklıklar</a>
            <a href="#guven" className="transition-colors hover:text-neutral-900">Güvenlik</a>
            <a href="#sss" className="transition-colors hover:text-neutral-900">SSS</a>
        </nav>
        <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setShowAuth(true)}>Başla</Button>
            {/* Hamburger — mobile only */}
            <button
                onClick={() => setMobileNavOpen((v) => !v)}
                aria-label={mobileNavOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={mobileNavOpen}
                className="touch-target ml-1 rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden"
            >
                {mobileNavOpen ? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></svg>
                )}
            </button>
        </div>
    </div>
    {/* Mobile dropdown nav */}
    {mobileNavOpen && (
        <nav
            className="border-t border-neutral-200/60 bg-white/95 backdrop-blur-md px-5 py-4 md:hidden animate-rise-in"
            aria-label="Mobil gezinme"
            onClick={() => setMobileNavOpen(false)}
        >
            {[
                ['#bilim', 'Bilim'],
                ['#nasil', 'Nasıl çalışır?'],
                ['#ozellikler', 'Özellikler'],
                ['#tankliklar', 'Tanıklıklar'],
                ['#guven', 'Güvenlik'],
                ['#sss', 'SSS'],
                ['#indir', 'Uygulamayı İndir'],
            ].map(([href, label]) => (
                <a key={href} href={href} className="block py-3 text-sm font-bold text-neutral-700 border-b border-neutral-100 last:border-0 hover:text-primary-700">
                    {label}
                </a>
            ))}
        </nav>
    )}
</header>
```

### 3B — Hero h1 responsive size

- [ ] **Step 2: Reduce h1 on xs screens**

Find the `<h1>` in the hero section (line ~210):

```jsx
<h1 className="mb-6 text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-neutral-900 sm:text-5xl lg:text-[62px] animate-rise-in" style={{ animationDelay: '0.08s' }}>
```

Replace with:

```jsx
<h1 className="mb-6 text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-[2.6rem] md:text-5xl lg:text-[62px] animate-rise-in" style={{ animationDelay: '0.08s' }}>
```

### 3C — Trust strip separator fix

- [ ] **Step 3: Hide pipe separators when they wrap**

The trust strip `<section>` uses `<span className="h-3.5 w-px bg-neutral-200">` pipes that look broken when they wrap to new lines. Hide them on mobile:

```jsx
<span className="hidden sm:inline-block h-3.5 w-px bg-neutral-200" aria-hidden />
```

Apply `hidden sm:inline-block` to all three separator spans in the trust strip section (~lines 249, 251, 253).

### 3D — Show TransformPreview on mobile

- [ ] **Step 4: Make TransformPreview visible on all screens**

Find:
```jsx
<div className="mt-6 animate-rise-in hidden sm:block" style={{ animationDelay: '0.38s' }}>
    <TransformPreview />
</div>
```

Replace with:
```jsx
<div className="mt-6 animate-rise-in" style={{ animationDelay: '0.38s' }}>
    <TransformPreview />
</div>
```

The `TransformPreview` text sizes (`text-[10px]`, `text-[12px]`, `text-[13px]`) are small but readable on mobile. The card wraps fine since it uses `flex items-center gap-2`.

### 3E — Download section with QR code

- [ ] **Step 5: Add `PlaceholderQR` SVG component and `DownloadSection`**

Add these components before the `LandingPage` component declaration. The QR SVG is a purely decorative placeholder that looks like a real QR code pattern:

```jsx
/* ---------- Placeholder QR Code SVG ---------- */
const PlaceholderQR = ({ size = 180 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="APK indirme QR kodu (yakında)"
        role="img"
    >
        {/* Outer border */}
        <rect x="1" y="1" width="178" height="178" rx="12" fill="white" stroke="#E8E5DF" strokeWidth="2"/>
        {/* Top-left position square */}
        <rect x="14" y="14" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="22" y="22" width="32" height="32" rx="2" fill="white"/>
        <rect x="28" y="28" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Top-right position square */}
        <rect x="118" y="14" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="126" y="22" width="32" height="32" rx="2" fill="white"/>
        <rect x="132" y="28" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Bottom-left position square */}
        <rect x="14" y="118" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="22" y="126" width="32" height="32" rx="2" fill="white"/>
        <rect x="28" y="132" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Data modules — random-looking but symmetric */}
        <rect x="76" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="26" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="26" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="38" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="14" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="26" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="50" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="14" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="38" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="50" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="26" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="38" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        {/* KOZA butterfly mark in center */}
        <text x="90" y="96" textAnchor="middle" fontSize="20" fill="#6A52DC">🦋</text>
    </svg>
);

/* ---------- Download Section ---------- */
const DownloadSection = ({ onAuth }) => (
    <section id="indir" className="px-5 py-20 bg-white/50">
        <div className="mx-auto max-w-6xl">
            <div className="card overflow-hidden md:grid md:grid-cols-2">
                {/* Left: text + CTA */}
                <div className="p-10 sm:p-12 flex flex-col justify-center gap-6">
                    <div>
                        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary-500">Mobil Uygulama</p>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl mb-3">
                            KOZA'yı cebine al
                        </h2>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            Uygulamayı doğrudan Android cihazına indirebilirsin. QR kodu tara veya butona dokun — tek adımda yükle.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href="#indir"
                            onClick={(e) => { e.preventDefault(); }}
                            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-900 px-5 py-3 text-sm font-extrabold text-white shadow-card transition-all hover:scale-105 hover:shadow-lift active:scale-95"
                            aria-label="Android APK indir"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M17.523 15.341 14.02 12l3.503-3.341A1 1 0 0 0 17.2 7.2l-4.2 4a1 1 0 0 0 0 1.6l4.2 4a1 1 0 0 0 .323-1.459zM6.8 7.2a1 1 0 0 0-.323 1.459L10 12l-3.503 3.341A1 1 0 0 0 6.8 16.8l4.2-4a1 1 0 0 0 0-1.6l-4.2-4a1 1 0 0 0 0 0zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                            </svg>
                            Android APK İndir
                        </a>
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm font-bold text-neutral-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            iOS — Yakında
                        </span>
                    </div>
                    <p className="text-[11px] font-bold text-neutral-400">
                        * Şu an beta APK. Google Play ve App Store yakında.
                    </p>
                </div>
                {/* Right: QR code */}
                <div className="flex flex-col items-center justify-center gap-4 border-t border-neutral-100 bg-gradient-to-br from-primary-50/60 to-neutral-50 p-10 sm:p-12 md:border-l md:border-t-0">
                    <div className="rounded-2xl border-2 border-primary-100 bg-white p-4 shadow-card">
                        <PlaceholderQR size={164} />
                    </div>
                    <p className="text-center text-[12px] font-bold text-neutral-400">
                        QR kodu tara → APK indir
                    </p>
                    <span className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-[11px] font-extrabold text-accent-700">
                        🔄 Gerçek QR yakında güncelleniyor
                    </span>
                </div>
            </div>
        </div>
    </section>
);
```

- [ ] **Step 6: Insert DownloadSection into LandingPage JSX**

Inside the `<main>` element of `LandingPage`, find the final `<section>` that contains the "Son çağrı" CTA (the purple gradient block that ends around line 570), and insert `<DownloadSection onAuth={() => setShowAuth(true)} />` **after** the CTA section and **before** the closing `</main>`:

```jsx
                {/* Son çağrı section ends here */}
                </section>

                {/* ---------- Uygulama İndir ---------- */}
                <DownloadSection onAuth={() => setShowAuth(true)} />

            </main>
```

Also add `#indir` as a nav link entry in the footer nav so deep-linking works.

- [ ] **Step 7: Fix CTA section button stacking on mobile**

Find the CTA button row (line ~556):

```jsx
<Button size="lg" variant="accent" iconRight={ArrowRight} onClick={() => setShowAuth(true)}>
    Yolculuğa Başla
</Button>
```

This single button is fine as-is. But the reference line below it wraps with `flex flex-wrap` — already OK. No change needed here.

- [ ] **Step 8: Add `#indir` to desktop nav links**

In the desktop `<nav>` inside the new header, add after the `#sss` entry:

```jsx
<a href="#indir" className="transition-colors hover:text-neutral-900">İndir</a>
```

### 3F — Comparison table mobile scroll hint

- [ ] **Step 9: Add scroll hint to comparison table**

Find the comparison table wrapper `<div className="card overflow-hidden overflow-x-auto scrollbar-thin">` (line ~406). Add a visual scroll hint on mobile:

```jsx
<div className="card overflow-hidden">
    <div className="overflow-x-auto scrollbar-thin" role="region" aria-label="Karşılaştırma tablosu" tabIndex={0}>
        <p className="px-6 pt-3 text-[11px] font-bold text-neutral-400 sm:hidden">← Tabloyu kaydır →</p>
        <div className="min-w-[520px]">
            {/* existing table content unchanged */}
        </div>
    </div>
</div>
```

- [ ] **Step 10: Build check**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 11: Commit**

```bash
git add src/pages/LandingPage.jsx
git commit -m "feat(landing): mobile hamburger nav, responsive h1, download section with QR placeholder, trust strip fix"
```

---

## Self-Review

**Spec coverage check:**
- ✓ Mobile iOS safe-area: Task 1 + Task 2
- ✓ Touch targets 44px: Task 1 (`touch-target` utility) + Task 2 (applied to buttons)
- ✓ `card-hover` not firing on touch: Task 1
- ✓ LandingPage hamburger nav: Task 3A
- ✓ H1 readable on 375px: Task 3B
- ✓ Trust strip clean on mobile: Task 3C
- ✓ TransformPreview visible mobile: Task 3D
- ✓ Download section with QR code: Task 3E
- ✓ Comparison table scroll hint: Task 3F

**Placeholder scan:**
- No TBD/TODO in code steps
- All inline SVG is complete and self-contained
- All class names use existing utilities or newly defined ones

**Type consistency:**
- `PlaceholderQR` takes `size` prop (number, default 180)
- `DownloadSection` takes `onAuth` prop (function) — passed as `() => setShowAuth(true)` in Task 3E step 6

**Potential gotcha:** The `<text>` element inside SVG with an emoji (🦋) may render inconsistently across browsers. If rendering looks bad, replace with a simple `<rect>` pattern instead. The plan is safe — it's decorative only.

**Android icon SVG** in the download button uses generic code icon paths; replace with actual Android robot SVG before real launch.

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-30-mobile-optimization.md`.**
