# UniBridge: International Student Community in Korea

## Overview
UniBridge is a high-performance community platform designed for international students coming to or living in Korea. Inspired by "Everytime," it provides a space for students to share information about visas, university life, housing, and a marketplace for used goods.

## Design & Aesthetics
- **Architecture:** Single Page Application (SPA) using vanilla JavaScript and Web Components.
- **Visuals:** Vibrant & Tactile (Premium).
  - **Colors:** Vibrant purples, blues, and corals using `oklch`.
  - **Effects:** Glassmorphism (backdrop-filter), multi-layered drop shadows for depth.
  - **Typography:** Expressive headings with clean, readable sans-serif body text.
- **Responsiveness:** Mobile-first design using container queries and flex/grid.

## Core Features
1. **Authentication:** Secure login/signup via Firebase Auth.
2. **Community Boards:** Real-time feeds for various categories (General, Visa, Jobs, Housing, Marketplace).
3. **Interactive Posts:** Users can create posts, comment, and like content.
4. **Smart Search:** Quickly find information across all boards.
5. **Profile Management:** Custom profiles and post history.

## Technical Implementation (Plan)
1. **Foundation:** Clean slate with modern CSS Reset and global variables.
2. **Components:** Custom elements for `ub-nav`, `ub-post`, `ub-auth`, etc.
3. **Services:** Firebase integration for real-time data and authentication.
4. **Router:** Custom hash-based routing for seamless view transitions.
