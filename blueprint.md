# GYEOL (결) Project Blueprint

## Overview
**GYEOL (결)** is a premium, high-aesthetic independent clothing product platform inspired by Musinsa, specifically tailored to Korean 20-30s design sentiments. The name "결" represents the grain of fabrics, textures, and the unique emotional flow of each boutique brand. It serves as a product catalog grid (with filtering), lookbook style archive, small-batch manufacturer matchmaking service, and product register interface.

## Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Baseline container queries, variables, custom properties), ES Modules JavaScript.
- **UI Components:** Native Web Components (Shadow DOM, templates).
- **Styling:** Custom CSS variables based on OKLCH, typography from Google Fonts (Cormorant Garamond, Gowun Batang, Syne, Outfit).
- **Database/State:** Transparent Firestore read/write capabilities with immediate LocalStorage fallback for offline testing.
- **Hosting/Deployment:** GitHub Repository (`https://github.com/dkssiEpdu/project-platform.git`).

---

## Features & UI Design

### 1. Style & Design System (CSS)
- **Typography (Korean Seongsu Vibe):**
  - Elegant Serif: `Cormorant Garamond` (luxury English serif) and `Gowun Batang` (emotional Korean serif).
  - Progressive Sans-serif: `Syne` (progressive geometric English sans-serif) and `Outfit`.
- **Dual Themes:**
  - Ivory Clean (Light Mode - Default): Elegant light ivory background, pure white cards, soft coal text.
  - Charcoal Warm (Dark Mode - Supported): Dark charcoal background, warm dark elevated cards, champagne gold accents.
- **Visuals:**
  - Soft noise background textures.
  - Minimal product grid cards with elegant border glowing hover states.

### 2. Core SPA Router Views (JS)
- **Showroom (`home`):**
  - Musinsa-style catalog grid of products.
  - Categories: Outer, Tops, Bottoms, Accessories.
  - Mood Filters: Minimal, Street, Avant-Garde, Silent Luxury.
  - Dynamic category and mood filters.
- **Product Details Panel / Dialog:**
  - Dynamic overlay showing high-end lookbook mockup, sizing chart, price in KRW (e.g., ₩79,000), material compositions, user reviews, and Q&A form.
- **Product Uploader (`uploader`):**
  - Portal for brands to register products.
  - Inputs: Brand name, Product title, Category, Price (₩), Fabric component, Color palette swatches, Description, and Mockup image selection.
- **Lookbook Lounge (`lookbook`):**
  - Discussion and snapshot space for users/brands to share styling tips, snapshots, and community advice.
- **Fabric Directory (`fabrics`):**
  - Details of premium fabrics (Organic Heavy Cotton, Raw Japanese Denim, Silk Velvet, Silk Satin, Rough Linen).
- **Factory Matcher (`matcher`):**
  - Catalog of small-batch sustainable manufacturers (Seoul, Busan, Daegu) with MOQ limits.

### 3. Actionable Steps for the Transition
1. **Design System Configuration:** Update `style.css` to build product catalog helpers, grid layouts, product detailed cards, inputs, and lookbook feeds.
2. **Main HTML Update:** Change `index.html` headers and links to establish the GYEOL brand identity.
3. **Application State Reconstruction:** Re-write `main.js` state model to store products, comments, lookbooks, and manufacturer records.
4. **Interactive Views & Custom Elements:** Build `<gyeol-nav>`, `<gyeol-product-card>`, `<gyeol-product-detail>`, and `<gyeol-chatbot>`.
5. **Git Configuration & Push:** Stage all updated files and force push commits to remote.
