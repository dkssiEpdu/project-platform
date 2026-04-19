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
    translationCache: {},
    posts: [
        { title: 'Best Korean Language Schools in Seoul?', content: 'I am planning to study Korean this summer. Any recommendations?', author: 'Kim_Study', likes: 12, comments: 5, category: 'General' },
        { title: 'D-2 Visa Extension Experience', content: 'Just finished my extension at the immigration office. Here are some tips...', author: 'GlobalStudent', likes: 45, comments: 22, category: 'Visa' },
        { title: 'Subletting my room in Hongdae', content: 'Available from June to August. Close to the station!', author: 'Traveler_KR', likes: 8, comments: 3, category: 'Housing' }
    ]
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
        translated: 'AI 자동 번역',
        createPost: '글쓰기',
        postTitle: '제목',
        postContent: '내용을 입력하세요...',
        postButton: '등록하기',
        selectCategory: '카테고리 선택',
        menu: '메뉴',
        showOriginal: '원문 보기',
        showTranslated: '번역본 보기'
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
        translated: 'Translated by AI',
        createPost: 'Write',
        postTitle: 'Title',
        postContent: 'Write your content here...',
        postButton: 'Post',
        selectCategory: 'Select Category',
        menu: 'Menu',
        showOriginal: 'Show Original',
        showTranslated: 'Show Translated'
    },
    ru: {
        explore: 'Исследовать сообщество',
        boards: 'Доски объявлений',
        market: 'Рынок',
        profile: 'Профиль',
        welcome: 'Добро пожаловать в UniBridge',
        signIn: 'Войти',
        signInMsg: 'Пожалуйста, войти, чтобы присоединиться к сообществу.',
        comingSoon: 'Скоро будет...',
        viewLatest: 'Посмотреть последние из',
        translated: 'Автоматический перевод',
        createPost: 'Написать',
        postTitle: 'Заголовок',
        postContent: 'Напишите здесь свой контент...',
        postButton: 'Опубликовать',
        selectCategory: 'Выберите категорию',
        menu: 'Меню',
        showOriginal: 'Показать оригинал',
        showTranslated: 'Показать перевод'
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
        translated: 'AI 自动翻译',
        createPost: '发布',
        postTitle: '标题',
        postContent: '在这里写下你的内容...',
        postButton: '发布',
        selectCategory: '选择分类',
        menu: '菜单',
        showOriginal: '显示原文',
        showTranslated: '显示翻译'
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
        translated: 'AI自動翻訳',
        createPost: '投稿',
        postTitle: 'タイトル',
        postContent: 'ここに内容を書いてください...',
        postButton: '投稿する',
        selectCategory: 'カテゴリーを選択',
        menu: 'メニュー',
        showOriginal: '原文を見る',
        showTranslated: '翻訳を見る'
    }
};

function t(key) {
    return translations[state.currentLanguage][key] || key;
}

async function translateText(text, targetLang) {
    if (!text) return text;
    
    const cacheKey = `${text}_${targetLang}`;
    if (state.translationCache[cacheKey]) return state.translationCache[cacheKey];

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${targetLang}`);
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
            });
        });
    }
}
customElements.define('ub-lang-menu', UbLangMenu);

class UbUserMenu extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-btn user-menu-btn" aria-label="User Menu">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="lang-content user-menu-content">
                    <div class="lang-option" data-action="write">
                        <i class="fas fa-pen-nib" style="margin-right: 10px; width: 16px;"></i> ${t('createPost')}
                    </div>
                    <div class="lang-option" data-action="profile">
                        <i class="fas fa-user-circle" style="margin-right: 10px; width: 16px;"></i> ${t('profile')}
                    </div>
                </div>
            </div>
        `;

        this.querySelector('.user-menu-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.querySelector('.user-menu-content').classList.toggle('show');
            // Close language menu if open
            const langContent = document.querySelector('.lang-content:not(.user-menu-content)');
            if (langContent) langContent.classList.remove('show');
        });

        this.querySelectorAll('.lang-option').forEach(el => {
            el.addEventListener('click', () => {
                const action = el.dataset.action;
                router.navigate(action);
            });
        });
    }
}
customElements.define('ub-user-menu', UbUserMenu);

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
        this._showingOriginal = false;
        this.render();
        this.autoTranslate();
    }

    render(isTranslated = false) {
        const d = this._data;
        const useTranslated = isTranslated && !this._showingOriginal && this._translatedTitle;
        const title = useTranslated ? this._translatedTitle : d.title;
        const content = useTranslated ? this._translatedContent : d.content;
        const hasTranslation = !!this._translatedTitle;

        this.innerHTML = `
            <div class="card fade-in">
                <div class="card-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary-light);"></div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; font-size: 0.9rem;">${d.author || 'Anonymous'}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${d.time || 'Just now'}</div>
                    </div>
                    ${hasTranslation ? `
                        <div class="translation-controls" style="display: flex; align-items: center; gap: 8px;">
                            <span class="translate-badge"><i class="fas fa-magic"></i> ${t('translated')}</span>
                            <button class="toggle-translate" style="background: none; border: none; font-size: 0.75rem; color: var(--primary); cursor: pointer; text-decoration: underline; font-weight: 600; padding: 0;">
                                ${this._showingOriginal ? t('showTranslated') : t('showOriginal')}
                            </button>
                        </div>
                    ` : ''}
                </div>
                <h3 style="margin-bottom: 8px; font-size: 1.1rem;">${title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">${content}</p>
                <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-muted);">
                    <span><i class="far fa-heart"></i> ${d.likes || 0}</span>
                    <span><i class="far fa-comment"></i> ${d.comments || 0}</span>
                </div>
            </div>
        `;

        if (hasTranslation) {
            const btn = this.querySelector('.toggle-translate');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._showingOriginal = !this._showingOriginal;
                    this.render(true);
                });
            }
        }
    }

    async autoTranslate() {
        const [tTitle, tContent] = await Promise.all([
            translateText(this._data.title, state.currentLanguage),
            translateText(this._data.content, state.currentLanguage)
        ]);

        if (tTitle && tContent && (
            tTitle.toLowerCase().trim() !== this._data.title.toLowerCase().trim() || 
            tContent.toLowerCase().trim() !== this._data.content.toLowerCase().trim()
        )) {
            this._translatedTitle = tTitle;
            this._translatedContent = tContent;
            this.render(true);
        }
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
            
            const feed = document.getElementById('posts-feed');
            state.posts.forEach(data => {
                const postEl = document.createElement('ub-post-card');
                postEl.post = data;
                feed.appendChild(postEl);
            });
        },
        write: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="card fade-in" style="max-width: 600px; margin: 0 auto; padding: var(--spacing-lg);">
                    <h2 style="margin-bottom: 24px;">${t('createPost')}</h2>
                    <div style="display: grid; gap: 20px;">
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">${t('postTitle')}</label>
                            <input type="text" id="post-title" style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-main); font-family: inherit;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">${t('selectCategory')}</label>
                            <select id="post-category" style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-main); font-family: inherit;">
                                ${state.boards.map(b => `<option value="${b}">${b}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">${t('postContent')}</label>
                            <textarea id="post-content" rows="8" style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-main); font-family: inherit; resize: none;"></textarea>
                        </div>
                        <div style="display: flex; gap: 12px; margin-top: 10px;">
                            <button id="submit-post" style="flex: 1; padding: 14px; border-radius: 12px; border: none; background: var(--primary); color: white; font-weight: 700; cursor: pointer;">${t('postButton')}</button>
                            <button id="cancel-post" style="padding: 14px 24px; border-radius: 12px; border: 1px solid var(--glass-border); background: none; font-weight: 700; cursor: pointer;">Cancel</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('submit-post').addEventListener('click', () => {
                const title = document.getElementById('post-title').value;
                const category = document.getElementById('post-category').value;
                const content = document.getElementById('post-content').value;

                if (title && content) {
                    const newPost = {
                        title,
                        content,
                        category,
                        author: state.user ? state.user.displayName || 'Me' : 'Me',
                        time: 'Just now',
                        likes: 0,
                        comments: 0
                    };
                    state.posts.unshift(newPost);
                    router.navigate('home');
                }
            });

            document.getElementById('cancel-post').addEventListener('click', () => router.navigate('home'));
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
        renderHeader();
    }
};

function updateNav() {
    const nav = document.getElementById('bottom-nav');
    nav.innerHTML = '<ub-nav></ub-nav>';
}

function renderHeader() {
    // Render Header Actions
    const nav = document.getElementById('header-nav');
    if (nav) {
        // We now use the user menu instead of a standalone write button
        nav.innerHTML = '<ub-user-menu></ub-user-menu>';
    }

    // Render Language Menu
    const menu = document.getElementById('lang-menu');
    if (menu) {
        menu.innerHTML = '<ub-lang-menu></ub-lang-menu>';
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
    renderHeader();

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('show'));
    });
});

onAuthStateChanged(auth, (user) => {
    state.user = user;
    // Update UI based on auth
});
