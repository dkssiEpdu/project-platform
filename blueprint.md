# UniBridge Project Blueprint

## Overview
UniBridge is a high-performance community platform designed for international students living or studying in Korea. It provides a space to share essential information such as visas, university life, housing, and a marketplace. The application features real-time AI auto-translation to break language barriers.

## Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Baseline features), JavaScript (ES Modules)
- **UI Components:** Native Web Components
- **Backend/Database:** Firebase Authentication, Cloud Firestore
- **Hosting:** Firebase Hosting (Planned)
- **Tools:** Font Awesome, Google Fonts, MyMemory Translation API

## Current Features & Design
- **Single Page Application (SPA):** Custom router for navigation.
- **AI Translation:** Real-time translation of posts and comments using MyMemory API.
- **Multilingual Support:** Supports English, Korean, Russian, Chinese, and Japanese.
- **Post System:** Users can view a feed of posts and click into detail views.
- **Comment System:** Users can add comments to posts.
- **User Authentication:** Integrated with Firebase Auth.
- **Visuals:** Modern "Glassmorphism" aesthetic with OKLCH colors, deep shadows, and subtle noise textures.

## Planned Improvements & Tasks

### 1. Comment Reply Functionality
- **Goal:** Allow users to reply to specific comments, creating a nested conversation structure.
- **Implementation:**
    - Update `UbComment` component to include a "Reply" button.
    - Add a sub-comment input field.
    - Update state management to handle `parentId` for comments.
    - Indent replies for visual clarity.

### 2. Chatbot Feature (Developer Inquiry)
- **Goal:** A floating chatbot in the bottom-right corner for users to send questions to the developer.
- **Implementation:**
    - Create `UbChatbot` web component.
    - Style as a floating action button (FAB) with a chat modal.
    - Store messages in Firestore collection `inquiries`.
    - Provide visual feedback upon message delivery.

### 3. Deployment to Git/Firebase
- **Goal:** Make the site live and shareable.
- **Implementation:**
    - Initialize Git repository (if not already).
    - Configure Firebase Hosting.
    - Push code to a remote repository.

## Design Details
- **Colors:** Primary (Bright Lime Green - `oklch(85% 0.25 145)`), Secondary (Vibrant Blue).
- **Typography:** Plus Jakarta Sans.
- **Effects:** Soft shadows for cards, deep shadows for interactive elements, glassmorphism headers.
