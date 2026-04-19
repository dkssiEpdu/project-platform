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
    currentLanguage: 'ko',
    boards: ['General', 'Visa', 'Jobs', 'Housing', 'Marketplace'],
    translationCache: {}
};

// --- Translation System ---
const translations = {
    ko: {
        explore: '커뮤니티 탐색',
        boards: '게시판',
        market: '장터',
        profile: '프로필',
        welcome: 'UniBridge에 오신 것을 환영합니다',
        signIn: '로그인',
        signInMsg: '커뮤니티에 참여하려면 로그인해 주세요.',
        comingSoon: '준비 중입니다...',
        viewLatest: '최신 글 보기',
        translated: 'AI 자동 번역'
    },
    en: {
        explore: 'Explore Community',
        boards: 'Boards',
        market: 'Marketplace',
        profile: 'Profile',
        welcome: 'Welcome to UniBridge',
        signIn: 'Sign In',
        signInMsg: 'Please sign in to join the community.',
        comingSoon: 'Coming soon...',
        viewLatest: 'View the latest from',
        translated: 'Translated by AI'
    },
    ru: {
        explore: 'Исследовать сообщество',
        boards: 'Доски объявлений',
        market: 'Рынок',
        profile: 'Профиль',
        welcome: 'Добро пожаловать в UniBridge',
        signIn: 'Войти',
        signInMsg: 'Пожалуйста, войдите, чтобы присоединиться к сообществу.',
        comingSoon: 'Скоро будет...',
        viewLatest: 'Посмотреть последние из',
        translated: 'Автоматический перевод'
    },
    zh: {
        explore: '探索社区',
        boards: '看板',
        market: '市场',
        profile: '个人资料',
        welcome: '欢迎来到 UniBridge',
        signIn: '登录',
        signInMsg: '请登录以加入社区。',
        comingSoon: '即将推出...',
        viewLatest: '查看最新动态',
        translated: 'AI 自动翻译'
    },
    ja: {
        explore: 'コミュニティを探索',
        boards: '掲示板',
        market: 'マーケット',
        profile: 'プロフィール',
        welcome: 'UniBridgeへようこそ',
        signIn: 'サイン인',
        signInMsg: 'コミュニティに参加するにはサインインしてください。',
        comingSoon: '近日公開...',
        viewLatest: '最新の投稿を見る',
        translated: 'AI自動翻訳'
    }
};

function t(key) {
    return translations[state.currentLanguage][key] || key;
}

async function translateText(text, targetLang) {
    if (!text || targetLang === 'en') return text; // Assuming source is English for now
    
    const cacheKey = `${text}_${targetLang}`;
    if (state.translationCache[cacheKey]) return state.translationCache[cacheKey];

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        const translated = data.responseData.translatedText;
        state.translationCache[cacheKey] = translated;
        return translated;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// --- Web Components ---

class UbLangMenu extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const langs = [
            { code: 'en', name: 'English' },
            { code: 'ko', name: '한국어' },
            { code: 'ru', name: 'Русский' },
            { code: 'zh', name: '中文' },
            { code: 'ja', name: '日本語' }
        ];

        this.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-btn" aria-label="Select Language">
                    <i class="fas fa-globe"></i>
                    <span style="margin-left: 8px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">${state.currentLanguage}</span>
                </button>
                <div class="lang-content">
                    ${langs.map(l => `
                        <div class="lang-option ${state.currentLanguage === l.code ? 'active' : ''}" data-lang="${l.code}">
                            ${l.name}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.querySelector('.lang-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.querySelector('.lang-content').classList.toggle('show');
        });

        this.querySelectorAll('.lang-option').forEach(el => {
            el.addEventListener('click', () => {
                state.currentLanguage = el.dataset.lang;
                router.navigate(state.currentView);
                renderLangMenu();
            });
        });
    }
}
customElements.define('ub-lang-menu', UbLangMenu);

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
        this._data = data;
        this.render();
        this.autoTranslate();
    }

    render(isTranslated = false) {
        const d = this._data;
        const title = isTranslated ? this._translatedTitle : d.title;
        const content = isTranslated ? this._translatedContent : d.content;

        this.innerHTML = `
            <div class="card fade-in">
                <div class="card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-light);"></div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; font-size: 0.9rem;">${d.author || 'Anonymous'}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${d.time || 'Just now'}</div>
                    </div>
                    ${isTranslated ? `<span class="translate-badge"><i class="fas fa-magic"></i> ${t('translated')}</span>` : ''}
                </div>
                <h3 style="margin-bottom: 8px; font-size: 1.1rem;">${title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">${content}</p>
                <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-muted);">
                    <span><i class="far fa-heart"></i> ${d.likes || 0}</span>
                    <span><i class="far fa-comment"></i> ${d.comments || 0}</span>
                </div>
            </div>
        `;
    }

    async autoTranslate() {
        if (state.currentLanguage === 'en') return;

        const [tTitle, tContent] = await Promise.all([
            translateText(this._data.title, state.currentLanguage),
            translateText(this._data.content, state.currentLanguage)
        ]);

        this._translatedTitle = tTitle;
        this._translatedContent = tContent;
        this.render(true);
    }
}
customElements.define('ub-post-card', UbPostCard);

// --- Router ---

const router = {
    views: {
        home: async () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <h2 style="margin-bottom: 20px; font-weight: 800; font-size: 1.8rem;">${t('explore')}</h2>
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
                <h2 style="margin-bottom: 20px;">${t('boards')}</h2>
                <div style="display: grid; gap: 12px;">
                    ${state.boards.map(b => `
                        <div class="card" style="cursor: pointer;">
                            <h3 style="font-size: 1.1rem;">${b} ${t('boards')}</h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">${t('viewLatest')} ${b}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        },
        market: () => {
            document.getElementById('view-container').innerHTML = `<h2>${t('market')}</h2><p>${t('comingSoon')}</p>`;
        },
        profile: () => {
            document.getElementById('view-container').innerHTML = `
                <div class="card" style="text-align: center; padding: 40px 20px;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); margin: 0 auto 16px;"></div>
                    <h2>${t('welcome')}</h2>
                    <p style="color: var(--text-muted); margin-bottom: 24px;">${t('signInMsg')}</p>
                    <button style="padding: 12px 32px; border-radius: 12px; border: none; background: var(--primary); color: white; font-weight: 700;">${t('signIn')}</button>
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

function renderLangMenu() {
    const menu = document.getElementById('lang-menu');
    menu.innerHTML = '<ub-lang-menu></ub-lang-menu>';
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
    renderLangMenu();

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        const content = document.querySelector('.lang-content');
        if (content) content.classList.remove('show');
    });
});

onAuthStateChanged(auth, (user) => {
    state.user = user;
    // Update UI based on auth
});
