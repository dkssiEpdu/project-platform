// UniBridge Main Entry Point
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// App Configuration (Will be populated by actual config later)
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "projectfragrance.firebaseapp.com",
    projectId: "projectfragrance",
    storageBucket: "projectfragrance.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Application State
const state = {
    user: null,
    currentView: 'home',
    boards: ['General', 'Visa', 'Jobs', 'Housing', 'Marketplace']
};

// --- Web Components ---

class UbNav extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const items = [
            { id: 'home', icon: 'home' },
            { id: 'boards', icon: 'list' },
            { id: 'market', icon: 'shopping-bag' },
            { id: 'profile', icon: 'user' }
        ];

        this.innerHTML = items.map(item => `
            <div class="nav-item ${state.currentView === item.id ? 'active' : ''}" data-view="${item.id}">
                <i class="fas fa-${item.icon}"></i>
            </div>
        `).join('');

        this.querySelectorAll('.nav-item').forEach(el => {
            el.addEventListener('click', () => {
                router.navigate(el.dataset.view);
            });
        });
    }
}
customElements.define('ub-nav', UbNav);

class UbPostCard extends HTMLElement {
    set post(data) {
        this.innerHTML = `
            <div class="card fade-in">
                <div class="card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-light);"></div>
                    <div>
                        <div style="font-weight: 700; font-size: 0.9rem;">${data.author || 'Anonymous'}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${data.time || 'Just now'}</div>
                    </div>
                </div>
                <h3 style="margin-bottom: 8px; font-size: 1.1rem;">${data.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">${data.content}</p>
                <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-muted);">
                    <span><i class="far fa-heart"></i> ${data.likes || 0}</span>
                    <span><i class="far fa-comment"></i> ${data.comments || 0}</span>
                </div>
            </div>
        `;
    }
}
customElements.define('ub-post-card', UbPostCard);

// --- Router ---

const router = {
    views: {
        home: async () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <h2 style="margin-bottom: 20px; font-weight: 800; font-size: 1.8rem;">Explore Community</h2>
                <div id="posts-feed"></div>
            `;
            
            // Mock posts for now
            const mockPosts = [
                { title: 'Best Korean Language Schools in Seoul?', content: 'I am planning to study Korean this summer. Any recommendations?', author: 'Kim_Study', likes: 12, comments: 5 },
                { title: 'D-2 Visa Extension Experience', content: 'Just finished my extension at the immigration office. Here are some tips...', author: 'GlobalStudent', likes: 45, comments: 22 },
                { title: 'Subletting my room in Hongdae', content: 'Available from June to August. Close to the station!', author: 'Traveler_KR', likes: 8, comments: 3 }
            ];

            const feed = document.getElementById('posts-feed');
            mockPosts.forEach(data => {
                const postEl = document.createElement('ub-post-card');
                postEl.post = data;
                feed.appendChild(postEl);
            });
        },
        boards: () => {
            document.getElementById('view-container').innerHTML = `
                <h2 style="margin-bottom: 20px;">Boards</h2>
                <div style="display: grid; gap: 12px;">
                    ${state.boards.map(b => `
                        <div class="card" style="cursor: pointer;">
                            <h3 style="font-size: 1.1rem;">${b} Board</h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">View the latest from ${b}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        },
        market: () => {
            document.getElementById('view-container').innerHTML = `<h2>Marketplace</h2><p>Coming soon...</p>`;
        },
        profile: () => {
            document.getElementById('view-container').innerHTML = `
                <div class="card" style="text-align: center; padding: 40px 20px;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); margin: 0 auto 16px;"></div>
                    <h2>Welcome to UniBridge</h2>
                    <p style="color: var(--text-muted); margin-bottom: 24px;">Please sign in to join the community.</p>
                    <button style="padding: 12px 32px; border-radius: 12px; border: none; background: var(--primary); color: white; font-weight: 700;">Sign In</button>
                </div>
            `;
        }
    },

    navigate: (view) => {
        state.currentView = view;
        router.views[view]();
        updateNav();
    }
};

function updateNav() {
    const nav = document.getElementById('bottom-nav');
    nav.innerHTML = '<ub-nav></ub-nav>';
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
});

onAuthStateChanged(auth, (user) => {
    state.user = user;
    // Update UI based on auth
});
