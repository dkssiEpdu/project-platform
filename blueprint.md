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
3. **Interactive Posts:** Users can create posts, comment, and like content.
4. **Smart Search:** Quickly find information across all boards.
5. **Profile Management:** Custom profiles and post history.

## Technical Implementation (Plan)
1. **Foundation:** Clean slate with modern CSS Reset and global variables.
2. **UI Update:** Transitioned to a clean white background with a bright lime green logo and vibrant accents.
3. **Components:** Custom elements for `ub-nav`, `ub-post`, `ub-auth`, etc.
4. **Services:** Firebase integration for real-time data and authentication.
5. **Router:** Custom hash-based routing for seamless view transitions.
