# UniBridge: International Student Community in Korea

## Overview
UniBridge is a high-performance community platform designed for international students coming to or living in Korea. Inspired by "Everytime," it provides a space for students to share information about visas, university life, housing, and a marketplace for used goods.

## Design & Aesthetics
- **Architecture:** Single Page Application (SPA) using vanilla JavaScript and Web Components.
- **Visuals:** Clean, Bright & Vibrant.
  - **Colors:** Bright lime green (`oklch(85% 0.25 145)`) as the primary color, set against a pure white background.
  - **Effects:** Glassmorphism with refined transparency, soft shadows for a "lifted" feel.
  - **Typography:** Plus Jakarta Sans with expressive headings.
- **Responsiveness:** Mobile-first design using container queries and flex/grid.

## Core Features
1. **Authentication:** Secure login/signup via Firebase Auth.
2. **Community Boards:** Real-time feeds for various categories (General, Visa, Jobs, Housing, Marketplace).
3. **Multi-language Support:** Globalized UI supporting English (EN), Korean (KO), Russian (RU), Chinese (ZH), and Japanese (JA).
4. **Interactive Posts:** Users can create posts, comment, and like content.
5. **User Actions Menu:** A dedicated menu next to the language selector for quick access to "Create Post" and other user-centric features.
6. **Automatic Post Translation:** AI-powered real-time translation for all user posts to the selected language.
7. **Smart Search:** Quickly find information across all boards.
8. **Profile Management:** Custom profiles and post history.

## Technical Implementation (History & Progress)
1. **Foundation:** Clean slate with modern CSS Reset and global variables.
2. **UI Update:** Transitioned to a clean white background with a bright lime green logo and vibrant accents.
3. **i18n:** Implemented a lightweight translation dictionary and language switcher in the header.
4. **Components:** Custom elements for `ub-nav`, `ub-post`, `ub-auth`, etc.
5. **Services:** Firebase integration for real-time data and authentication.
6. **Router:** Custom hash-based routing for seamless view transitions.
7. **Multi-Language Support (v1.1):** Expanded support to 5 languages (EN, KO, RU, ZH, JA) and refined the selection UI with modern animations.
8. **AI Translation (v1.2):** Integrated MyMemory API for automatic, real-time translation of user-generated content with client-side caching.
9. **User Actions Menu (v1.3):** Refined the header layout to include a dedicated "User Menu" next to the language selector, consolidating "Create Post" and other shortcuts.


