# ZIPP Project Blueprint

## Overview
**ZIPP** is a premium, high-aesthetic independent clothing product platform inspired by Musinsa and Zigzag, specifically tailored to Korean 20-30s design sentiments. The name "ZIPP" represents the compression of diverse designer brands into one curated space, like zipping up a zipper to open new styles.

## Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Baseline container queries, variables, custom properties, OKLCH colors), ES Modules JavaScript.
- **UI Components:** Native Web Components (Shadow DOM, templates).
- **Styling:** Custom CSS variables based on OKLCH, typography from Google Fonts (Cormorant Garamond, Gowun Batang, Syne, Outfit).
- **Database/State:** Transparent Firestore read/write capabilities with immediate LocalStorage fallback for offline testing.
- **Hosting/Deployment:** GitHub Repository (`https://github.com/dkssiEpdu/project-platform.git`).

---

## Features & UI Design

### 1. Style & Design System (CSS) — Visual Overhaul v2
- **Typography (Editorial Magazine Vibe):**
  - `Cormorant Garamond` (luxury light-weight English serif, weight 300) with italic variants for contrast.
  - `Syne` (geometric sans) at tiny uppercase weights for labels/eyebrows.
  - `Outfit` (body text, clean and legible).
- **Color System (OKLCH Tokens):**
  - Soft ivory background (`oklch(96.5% 0.006 55)`), pure white cards, warm coal text. Pure light theme.
- **Design Character:**
  - Dramatic font-size hierarchy — enormous serif hero titles vs. tiny uppercase eyebrow labels.
  - Immersive product cards: full-bleed images, gradient overlay on hover, "VIEW DETAIL" CTA appears.
  - Mood badge pinned top-right with frosted glass look.
  - Section eyebrow labels with extending line rule (flex + ::after trick).
  - Sticky header with blur + shadow on scroll.
  - Premium easing curves (`cubic-bezier(0.16, 1, 0.3, 1)` spring).
  - Staggered fade-up entrance animations for page children.

### 2. Splash Screen
- Eyebrow label: "Independent Brand Archive"
- Large thin-weight serif H1 `ZIPP` at fluid clamp size.
- Italic subtitle: "브랜드를 한 곳에 압축하다"
- Thin 80px loading line with sliding animation.

### 3. Core SPA Router Views (JS)
- **Home (브랜드 스토어):**
  - Editorial magazine hero section: large title with italic variant, product count display.
  - Filter chips: rounded pill style, active = filled dark.
  - Product grid: image-dominant cards (3:4 ratio), hover reveals gradient overlay + CTA text.
  - Empty state with icon.
- **Product Detail Panel:**
  - Slide-in from right (540px wide panel).
  - Category tag badge over image, light frosted background.
  - Price + mood tag in flex row.
  - `section-eyebrow` labels for Size, Color Palette, Reviews.
  - Full-width CTA button (장바구니 담기).
  - Star ratings rendered as Unicode symbols.
- **Product Uploader (Admin Portal):**
  - Editorial page header with eyebrow + large italic title.
  - Card-wrapped form with `form-label` class labels.
  - Preset image grid with `fabric-card` hover treatment.
- **Lookbook Lounge:**
  - Magazine hero header.
  - 4:5 aspect ratio image cards with hover zoom.
  - Likes count with heart icon.
- **Fabric Archive:**
  - Card grid with `fabric-swatch` color band + `fabric-tag` pill tags.
  - Absolute-positioned weight label over swatch.
- **Factory Matcher:**
  - `matcher-card` grid: name + location + specs 2-col grid + full-width CTA.
- **Chatbot:**
  - Header with title + subtitle ("Archive AI · Always here").
  - ✦ sparkles icon for toggle button.
  - Arrow-up send button.

### 4. Current Change: Sensory Visual Redesign
**Goal:** Transform the site from a generic AI-template look to a genuine editorial, premium fashion archive.
**Changes Applied:**
1. `style.css` — Full rewrite with editorial CSS system.
2. `index.html` — Splash screen redesign + editorial footer.
3. `main.js` — All view rendering upgraded: hero sections, product cards, detail panel, all views.
