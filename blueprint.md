# ATELIER Project Blueprint

## Overview
ATELIER is a premium, high-aesthetic clothing platform designed for 20-30s brand founders who want to launch their first sensory/emotional clothing brand. It acts as an interactive brand incubator, concept showroom, manufacturer matching directory, and collaborative community hub.

## Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Baseline features, container queries, `:has()`, cascade layers, logical properties), JavaScript (ES Modules).
- **UI Components:** Native Web Components (shadow DOM, HTML templates).
- **Styling:** Vanilla CSS using oklch color palettes, Google Fonts (Playfair Display & Outfit), modern glassmorphism, glowing micro-interactions.
- **Backend/Database:** Firebase Authentication, Cloud Firestore (for brand draft storage, inquiries, and showroom pre-orders).
- **Deployment:** GitHub Pages / repository hosting (`https://github.com/dkssiEpdu/project-platform.git`).

---

## Current Status & Transition
This project is transitioning from a community application (UniBridge) into a tailored clothing brand launching platform (ATELIER) targeting creative fashion launchers. All core views, styles, and web components will be rebuilt to fulfill this theme.

---

## Features & Design Implementation Plan

### 1. Style & Design System (CSS)
- **Typography (Korean Seongsu Vibe):**
  - Elegant Serif: `Cormorant Garamond` (luxurious, thin serif) paired with `Gowun Batang` (emotional Korean serif).
  - Progressive Sans-serif: `Syne` (artistic, hip geometric sans) paired with `Outfit`.
- **Color Palette (oklch):**
  - Ivory Clean (Light Mode - Default): Background `oklch(96% 0.005 50)`, Cards `oklch(99% 0.005 50)`.
  - Charcoal Warm (Dark Mode - Supported): Background `oklch(14% 0.015 35)`, Cards `oklch(18% 0.02 35)`.
  - Color picker support within the brand launcher.
- **Visual Effects:**
  - Glassmorphic navigation header.
  - Interactive grid elements with card-lift animation and drop shadows.
  - Soft noise textures in backgrounds.

### 2. Core SPA Router Views (JS)
- **Home (`home`):**
  - Luxury landing view with large typography.
  - Community Lounge entry action (Incubator quick start action removed to keep landing page minimal).
  - Horizontal scrolling list of trending brand drafts in the showroom.
  - Sensory fabric spotlight carousel.
- **Brand Incubator (`incubator`):**
  - Interactive step-by-step branding tool:
    1. **Concept**: Input brand name, tagline, choose emotional/sensory mood tags (e.g., *Minimalist, Raw & Organic, Avant-Garde, Cyber-Street, Silent Luxury*).
    2. **Aesthetic**: Custom palette generator using oklch picker, lettering picker.
    3. **Fabric Selection**: Select high-end fabrics (heavy cotton, raw denim, velvet, recycled linen, silk satin) with tactile explanations.
    4. **Submit/Launch**: Finalize MOQ requirements (10 to 50 items) and publish directly to the Showroom.
- **Showroom (`showroom`):**
  - Active brand campaigns created by the community.
  - Display cards with custom palettes, tags, and selected fabrics.
  - Pre-order progress and stats display to show the MOQ pledging progression (pledge button removed from cards for cleaner design look).
- **Manufacturer Matcher (`matcher`):**
  - Directory of sustainable, small-batch manufacturers in Korea.
  - Filter matches by fabric type, MOQ limits, and expertise.
- **Collaboration Community (`community`):**
  - Shared visual moodboards and collab request posts.
  - Discussion forum for finding partners (pattern makers, photographers, models).

### 3. Actionable Steps for the Current Requested Change
1. **Design System & Typography Setup**: Modify `style.css` to build the new premium styling guidelines, OKLCH variables, light/dark themes, and layout helpers.
2. **HTML Update**: Update `index.html` with new title, luxurious typography link, and shell containers.
3. **Core Logic Reconstruction**: Re-write `main.js` from the ground up to establish ATELIER's state management, custom router, incubator wizard, showroom voting system, manufacturer directory, custom components (`<atelier-nav>`, `<atelier-card>`, `<atelier-moodboard>`, `<atelier-chatbot>`).
4. **Local and Firebase Storage Integration**: Wire up forms to Firestore for real-time saving and reading, using local storage fallback to guarantee zero failures.
5. **Git Configuration & Push**: Change Git remote and commit/push all codebase files to `https://github.com/dkssiEpdu/project-platform.git`.
