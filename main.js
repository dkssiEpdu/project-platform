// ATELIER - Brand Launchpad Main Module

// --- Firebase Configuration & Fallback ---
let db = null;
let auth = null;

const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyForTestingOnly",
    authDomain: "project-platform.firebaseapp.com",
    projectId: "project-platform",
    storageBucket: "project-platform.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef"
};

async function initFirebase() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        console.log("Firebase initialized successfully.");
    } catch (e) {
        console.warn("Firebase failed to initialize. Falling back to local storage state mode.", e);
    }
}

// --- Application State ---
const state = {
    currentView: 'home',
    theme: 'light', // 'light' is default, 'dark' is supported (Charcoal Warm)
    currentLanguage: 'ko',
    user: { name: 'Designer Guest', id: 'guest' },
    incubatorForm: {
        step: 1,
        name: '',
        tagline: '',
        mood: 'Minimalist',
        paletteIdx: 0,
        lettering: 'serif',
        fabricIdx: 0,
        quantity: 30
    },
    
    // Core Fabric Database
    fabrics: [
        { name: 'Organic Heavy Cotton', weight: '450gsm', desc: '두껍고 밀도 높은 텍스처로, 각 잡힌 오버사이즈 실루엣과 스트리트웨어의 단단한 핏에 적합합니다.', style: 'linear-gradient(135deg, oklch(75% 0.01 40), oklch(50% 0.01 40))', tags: ['친환경', '고중량', '구조적'] },
        { name: 'Raw Japanese Denim', weight: '14oz', desc: '방축가공을 거치지 않은 생지 데님으로, 입을수록 착용자의 주름과 습관에 따라 고유의 워싱이 잡힙니다.', style: 'linear-gradient(135deg, oklch(25% 0.08 260), oklch(15% 0.05 260))', tags: ['생지', '내구성', '에이징'] },
        { name: 'Heavy Silk Velvet', weight: '320gsm', desc: '깊은 표면 파일(pile)이 빛을 흡수하고 반사하여 드라마틱한 광택과 묵직하게 흐르는 실루엣을 만듭니다.', style: 'linear-gradient(135deg, oklch(18% 0.02 300), oklch(10% 0.01 300))', tags: ['럭셔리', '벨벳', '드레이프'] },
        { name: 'Silk Satin', weight: '80gsm', desc: '피부에 닿는 극도의 청량함과 흐르는 듯한 유동적 드레이프를 가진 고광택 원단으로, 젠더리스 셔츠에 최적입니다.', style: 'linear-gradient(135deg, oklch(90% 0.03 80), oklch(80% 0.05 80))', tags: ['유동적', '광택', '경량'] },
        { name: 'Recycled Rough Linen', weight: '240gsm', desc: '불규칙한 슬러브 감각이 돋보이는 거친 텍스처의 린넨으로, 여름철 내추럴 테일러링과 편안한 핏에 어울립니다.', style: 'linear-gradient(135deg, oklch(85% 0.03 70), oklch(70% 0.04 70))', tags: ['재생원사', '내추럴', '통기성'] }
    ],

    // Curated OKLCH Palettes
    palettes: [
        { name: 'Sand & Clay', colors: ['oklch(82% 0.04 60)', 'oklch(55% 0.08 40)', 'oklch(22% 0.02 45)'] },
        { name: 'Midnight Forest', colors: ['oklch(25% 0.05 160)', 'oklch(78% 0.06 145)', 'oklch(15% 0.02 160)'] },
        { name: 'Solar Warmth', colors: ['oklch(76% 0.12 70)', 'oklch(40% 0.09 35)', 'oklch(94% 0.02 75)'] },
        { name: 'Monochrome Edge', colors: ['oklch(96% 0.005 50)', 'oklch(50% 0.01 50)', 'oklch(12% 0.015 50)'] },
        { name: 'Cyber Aura', colors: ['oklch(80% 0.14 280)', 'oklch(65% 0.22 320)', 'oklch(18% 0.03 290)'] }
    ],

    // Pre-populated Designer Brand Projects
    brands: [
        {
            id: 'brand-1',
            name: 'ODDITY',
            tagline: 'Deconstructed denim for daily anomalies.',
            mood: 'Avant-Garde',
            paletteIdx: 1,
            lettering: 'serif',
            fabricIdx: 1,
            quantity: 50,
            votes: 42,
            pledged: false,
            creator: 'Minju Kim',
            date: '2026-06-01'
        },
        {
            id: 'brand-2',
            name: 'SENSUM',
            tagline: 'Soft tailoring, quiet conversations.',
            mood: 'Silent Luxury',
            paletteIdx: 0,
            lettering: 'italic',
            fabricIdx: 2,
            quantity: 30,
            votes: 28,
            pledged: false,
            creator: 'Jungwoo Lee',
            date: '2026-06-03'
        },
        {
            id: 'brand-3',
            name: 'AURA',
            tagline: 'Fluid movements captured in cloth.',
            mood: 'Minimalist',
            paletteIdx: 2,
            lettering: 'sans',
            fabricIdx: 3,
            quantity: 20,
            votes: 18,
            pledged: false,
            creator: 'Chloe Park',
            date: '2026-06-05'
        }
    ],

    // Small-Batch Manufacturer Catalog
    manufacturers: [
        { name: '서울 서부 봉제 아뜰리에 (Seoul Atelier)', location: '서울 종로구', moq: 10, leadTime: '3주', specialty: '실크/벨벳 셔츠, 고난이도 패턴 테일러링', contact: '02-123-4567' },
        { name: '부산 데님 공방 (Busan Denim Works)', location: '부산 사상구', moq: 20, leadTime: '4주', specialty: '셀비지 데님 워싱, 생지 청바지 제작', contact: '051-789-1011' },
        { name: '대구 니트 연구소 (Daegu Knit Lab)', location: '대구 서구', moq: 15, leadTime: '3주', specialty: '친환경 면사 니팅, 헤비 코튼 스웨트셔츠', contact: '053-456-7890' },
        { name: '경기 서스테이너블 팩토리 (Gyeonggi Sustainable Sewing)', location: '경기도 양주시', moq: 30, leadTime: '5주', specialty: '재생 린넨/린넨 혼방 아우터, 리사이클 웨어', contact: '031-111-2222' }
    ],

    // Discussion Feed (Community)
    communityPosts: [
        { id: 'p1', author: 'LoomDesigner', content: '생지 데님 봉제할 때 쓸 굵은 스티치용 콘사 판매처 추천해주세요!', time: '2시간 전', replies: [{ id: 'r1', author: 'IndigoWave', content: '방학동에 있는 선우상사 가보세요. 콘사 종류 엄청 많아요!' }] },
        { id: 'p2', author: 'AtelierH', content: '실크 드레이프 셔츠 가을 시즌 런칭 협업하실 패턴 메이커 구합니다. 포폴 디엠 주세요.', time: '5시간 전', replies: [] }
    ]
};

// --- Language Dictionary ---
const translations = {
    ko: {
        showroom: '쇼룸 탐색',
        incubator: '브랜드 인큐베이터',
        fabrics: '원단 사전',
        matcher: '소량 제작 매칭',
        community: '크리에이터 라운지',
        pledge: '제작 펀딩 투표',
        pledged: '투표 완료',
        brandName: '브랜드 이름',
        brandTagline: '브랜드 슬로건/설명',
        brandMood: '지향하는 브랜드 무드',
        choosePalette: '색상 아이덴티티 선택',
        chooseFabric: '원단 텍스처 선택',
        chooseLettering: '시그니처 로고 서체',
        quantityGoal: '최소 생산 수량 (MOQ)',
        launchSuccess: '브랜드 드래프트가 성공적으로 쇼룸에 등록되었습니다!',
        launchBtn: '브랜드 기획서 런칭',
        themeToggle: '테마 전환',
        chatPlaceholder: '디자인, 원단 매칭에 대해 물어보세요...',
        botIntro: '안녕하세요! 브랜드 아뜰리에 가이드입니다. 런칭하고 싶은 브랜드의 영감을 공유해주시면 원단과 매칭되는 파트너 공장을 조언해 드릴게요.'
    },
    en: {
        showroom: 'Showroom',
        incubator: 'Brand Incubator',
        fabrics: 'Fabric Directory',
        matcher: 'Factory Matcher',
        community: 'Creator Lounge',
        pledge: 'Pledge Support',
        pledged: 'Supported',
        brandName: 'Brand Name',
        brandTagline: 'Brand Tagline / Pitch',
        brandMood: 'Brand Mood Profile',
        choosePalette: 'Color Identity (oklch)',
        chooseFabric: 'Sensory Fabric Choice',
        chooseLettering: 'Logo Typography',
        quantityGoal: 'Target Production MOQ',
        launchSuccess: 'Your brand draft has been successfully launched to the Showroom!',
        launchBtn: 'Launch Brand Draft',
        themeToggle: 'Toggle Theme',
        chatPlaceholder: 'Ask about design, colors, fabrics...',
        botIntro: 'Hello! I am your Atelier Guide. Share your design concept, and I will recommend suitable fabrics and production factories.'
    }
};

function t(key) {
    return translations[state.currentLanguage][key] || key;
}

// --- Local Storage Management ---
function loadLocalState() {
    const savedBrands = localStorage.getItem('atelier_brands');
    if (savedBrands) {
        state.brands = JSON.parse(savedBrands);
    }
    const savedPosts = localStorage.getItem('atelier_posts');
    if (savedPosts) {
        state.communityPosts = JSON.parse(savedPosts);
    }
}

function saveLocalState() {
    localStorage.setItem('atelier_brands', JSON.stringify(state.brands));
    localStorage.setItem('atelier_posts', JSON.stringify(state.communityPosts));
}

// --- Dynamic Web Components ---

// Navigation Component
class AtelierNav extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        const themeIcon = state.theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const themeText = state.theme === 'dark' ? 'Ivory Mode' : 'Charcoal Mode';
        
        this.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <button class="nav-btn ${state.currentView === 'home' ? 'active' : ''}" data-view="home">${t('showroom')}</button>
                <button class="nav-btn ${state.currentView === 'incubator' ? 'active' : ''}" data-view="incubator">${t('incubator')}</button>
                <button class="nav-btn ${state.currentView === 'fabrics' ? 'active' : ''}" data-view="fabrics">${t('fabrics')}</button>
                <button class="nav-btn ${state.currentView === 'matcher' ? 'active' : ''}" data-view="matcher">${t('matcher')}</button>
                <button class="nav-btn ${state.currentView === 'community' ? 'active' : ''}" data-view="community">${t('community')}</button>
                
                <button class="lang-btn" id="theme-toggle" style="margin-left: 12px;">
                    <i class="fas ${themeIcon}"></i> <span>${themeText}</span>
                </button>
                
                <button class="lang-btn" id="lang-toggle">
                    <i class="fas fa-globe"></i> <span style="text-transform: uppercase;">${state.currentLanguage}</span>
                </button>
            </div>
        `;

        // Nav click listeners
        this.querySelectorAll('.nav-btn').forEach(btn => {
            btn.onclick = () => {
                router.navigate(btn.dataset.view);
            };
        });

        // Theme Toggle
        this.querySelector('#theme-toggle').onclick = () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            if (state.theme === 'light') {
                document.body.classList.add('light-theme');
            } else {
                document.body.classList.remove('light-theme');
            }
            this.render();
        };

        // Language Toggle
        this.querySelector('#lang-toggle').onclick = () => {
            state.currentLanguage = state.currentLanguage === 'ko' ? 'en' : 'ko';
            router.navigate(state.currentView);
        };
    }
}
customElements.define('atelier-nav', AtelierNav);

// Brand Campaign Card
class AtelierCard extends HTMLElement {
    set brandData(data) {
        this._data = data;
        this.render();
    }
    render() {
        const d = this._data;
        const palette = state.palettes[d.paletteIdx];
        const fabric = state.fabrics[d.fabricIdx];
        
        // Progress percentage for pre-order
        const progress = Math.min(100, Math.round((d.votes / d.quantity) * 100));
        
        let letteringClass = 'lettering-serif';
        if (d.lettering === 'sans') letteringClass = 'lettering-sans';
        if (d.lettering === 'italic') letteringClass = 'lettering-italic';
        if (d.lettering === 'mono') letteringClass = 'lettering-mono';
        
        this.innerHTML = `
            <div class="card fade-in">
                <!-- oklch color preview strip -->
                <div style="display: flex; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 16px;">
                    ${palette.colors.map(c => `<div style="flex: 1; background: ${c};"></div>`).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <h2 class="${letteringClass}" style="font-size: 1.8rem; margin: 0; letter-spacing: 0.05em;">${d.name}</h2>
                    <span class="brand-mood-tag">${d.mood}</span>
                </div>
                
                <p style="font-style: italic; font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">"${d.tagline}"</p>
                
                <!-- Fabrication detail -->
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px; font-size: 0.85rem;">
                    <div style="width: 14px; height: 14px; border-radius: 50%; background: ${fabric.style}; border: 1px solid var(--border);"></div>
                    <span style="font-weight: 600;">${fabric.name}</span>
                    <span style="color: var(--text-muted);">|</span>
                    <span style="color: var(--text-muted);">${fabric.weight}</span>
                </div>
                
                <!-- Pledge / Support Progress -->
                <div class="preorder-progress-container">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
                        <span>Pledge Progress</span>
                        <strong>${d.votes} / ${d.quantity} units (${progress}%)</strong>
                    </div>
                    <div class="preorder-progress-bar">
                        <div class="preorder-progress-fill" style="width: ${progress}%;"></div>
                    </div>
                </div>
                
                <div class="brand-card-footer">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">By ${d.creator}</span>
                    <button class="btn ${d.pledged ? 'btn-secondary' : 'btn-primary'}" id="pledge-btn" style="padding: 6px 16px; font-size: 0.8rem;">
                        <i class="${d.pledged ? 'fas fa-check' : 'fas fa-heart'}" style="margin-right: 4px;"></i>
                        ${d.pledged ? t('pledged') : t('pledge')}
                    </button>
                </div>
            </div>
        `;
        
        this.querySelector('#pledge-btn').onclick = () => {
            d.pledged = !d.pledged;
            if (d.pledged) {
                d.votes += 1;
            } else {
                d.votes -= 1;
            }
            saveLocalState();
            this.render();
        };
    }
}
customElements.define('atelier-card', AtelierCard);

// Collaborative Moodboard Widget
class AtelierMoodboard extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div class="card" style="margin-bottom: 24px; padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 1.25rem;">Sensory Inspiration Moodboard</h3>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border);">
                    <div style="background: url('https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=60') center/cover no-repeat; grid-column: span 2; grid-row: span 2;"></div>
                    <div style="background: linear-gradient(135deg, oklch(85% 0.12 70), oklch(50% 0.05 45));"></div>
                    <div style="background: url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&auto=format&fit=crop&q=60') center/cover no-repeat;"></div>
                    <div style="background: oklch(18% 0.01 40); display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-family: var(--font-serif); font-style: italic; font-size: 0.8rem; text-align: center; padding: 4px;">"Silent Space"</div>
                    <div style="background: url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60') center/cover no-repeat;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Curated by Creator Lounge community</span>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;"><i class="fas fa-plus" style="margin-right: 4px;"></i> Add Vibe</button>
                </div>
            </div>
        `;
    }
}
customElements.define('atelier-moodboard', AtelierMoodboard);

// Floating AI Assistant Component
class AtelierChatbot extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupListeners();
    }
    render() {
        this.innerHTML = `
            <div class="chatbot-container">
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <span>ATELIER AI Assistant</span>
                        <button id="close-chat" style="background: none; border: none; color: var(--text-main); cursor: pointer; font-size: 1.1rem;"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="chat-msg bot">${t('botIntro')}</div>
                    </div>
                    <div class="chatbot-input-area">
                        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="${t('chatPlaceholder')}">
                        <button class="chatbot-send" id="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
                <button class="chatbot-btn" id="chatbot-toggle">
                    <i class="fas fa-comment-alt"></i>
                </button>
            </div>
        `;
    }
    setupListeners() {
        const toggle = this.querySelector('#chatbot-toggle');
        const windowEl = this.querySelector('#chatbot-window');
        const close = this.querySelector('#close-chat');
        const input = this.querySelector('#chatbot-input');
        const send = this.querySelector('#chatbot-send');
        const messages = this.querySelector('#chatbot-messages');

        toggle.onclick = () => windowEl.classList.toggle('show');
        close.onclick = () => windowEl.classList.remove('show');

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            // Render user message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = text;
            messages.appendChild(userMsg);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;

            // Generate bot reply
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot';
                botMsg.textContent = getBotResponse(text);
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
            }, 800);
        };

        send.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }
}
customElements.define('atelier-chatbot', AtelierChatbot);

function getBotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('원단') || q.includes('fabric') || q.includes('소재')) {
        return "ATELIER는 실크 사틴, 헤비 실크 벨벳, 재패니즈 샐비지 데님, 450gsm 헤비 코튼 등 오감(Tactile)을 자극하는 프리미엄 소재 사전을 갖추고 있습니다. '원단 사전' 탭에서 감각적 텍스처를 느껴보세요!";
    }
    if (q.includes('공장') || q.includes('생산') || q.includes('moq') || q.includes('소량')) {
        return "소량 브랜드 런칭의 큰 장벽은 MOQ(최소생산수량)입니다. 저희 플랫폼은 10장~30장부터 고품질 봉제가 가능한 파트너십 공장 리스트를 '소량 제작 매칭' 탭에서 제공하고 있습니다.";
    }
    if (q.includes('색상') || q.includes('컬러') || q.includes('oklch') || q.includes('color')) {
        return "ATELIER는 균일한 광도와 채도 표현을 보장하는 oklch 색상 모델을 활용합니다. 브랜드 인큐베이터 단계에서 세심하게 큐레이션된 에코 색 조합(Earth Clay, Midnight Forest 등)을 브랜딩 서체와 함께 매칭해 디자인할 수 있습니다.";
    }
    return "브랜드를 만들기 위해 어떤 감각적인 컨셉을 생각하고 계신가요? 미니멀리즘, 아방가르드, 사일런트 럭셔리 중 어울리는 테마를 추천해 드릴 수 있습니다.";
}

// --- SPA Router ---
const router = {
    views: {
        home: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in">
                    <!-- Elegant Editorial Intro -->
                    <div style="text-align: center; padding: 48px 0; max-width: 800px; margin: 0 auto;">
                        <h2 style="font-size: 3.5rem; margin-bottom: 24px; font-weight: 600; line-height: 1.15; font-family: var(--font-serif);">
                            Sensory Identity,<br>Tailored Launch.
                        </h2>
                        <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 32px; font-family: var(--font-sans); font-weight: 300;">
                            ATELIER는 20~30대 타겟의 독창적인 미학을 가진 신진 크리에이터를 위한 브랜딩 놀이터입니다.
                            개성 있는 무드 보드와 특색 있는 프리미엄 패브릭을 조합해 브랜드를 디자인하고, 크리에이터 커뮤니티 투표를 통해 MOQ 생산 목표를 실현하세요.
                        </p>
                        <div style="display: flex; gap: 16px; justify-content: center;">
                            <button class="btn btn-primary" onclick="router.navigate('community')">
                                <i class="fas fa-users" style="margin-right: 6px;"></i> ${t('community')} 참여
                            </button>
                        </div>
                    </div>

                    <!-- Showroom Section -->
                    <div style="margin-top: 48px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 24px;">
                            <h3 style="font-size: 1.8rem; font-family: var(--font-serif); margin: 0;">Trending Brand Drafts</h3>
                            <span style="font-size: 0.9rem; color: var(--text-muted);">최근 런칭 기획된 감각적 브랜드 컬렉션</span>
                        </div>
                        <div class="showroom-grid" id="showroom-cards"></div>
                    </div>
                </div>
            `;
            
            // Render showroom cards
            const showroomGrid = document.getElementById('showroom-cards');
            state.brands.forEach(b => {
                const card = document.createElement('atelier-card');
                card.brandData = b;
                showroomGrid.appendChild(card);
            });
        },
        
        incubator: () => {
            const container = document.getElementById('view-container');
            const form = state.incubatorForm;
            
            // Helper to render steps wizard UI
            const renderStepContent = () => {
                let stepHtml = '';
                
                if (form.step === 1) {
                    stepHtml = `
                        <div class="fade-in">
                            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 24px;">Step 1. 브랜드 컨셉 포뮬러</h3>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; font-weight: 500;">${t('brandName')}</label>
                                <input type="text" class="input-field" id="brand-name" placeholder="예: SENSUM, DRAFT" value="${form.name}">
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; font-weight: 500;">${t('brandTagline')}</label>
                                <textarea class="textarea-field" id="brand-tagline" placeholder="브랜드가 전달하려는 핵심 가치나 슬로건을 입력해주세요." rows="3">${form.tagline}</textarea>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; font-weight: 500;">${t('brandMood')}</label>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    ${['Minimalist', 'Raw & Organic', 'Avant-Garde', 'Cyber-Street', 'Silent Luxury'].map(m => `
                                        <button class="btn ${form.mood === m ? 'btn-primary' : 'btn-secondary'}" class="mood-tag-select" style="padding: 8px 16px; border-radius: 20px; font-size: 0.85rem;" data-mood="${m}">
                                            ${m}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                } else if (form.step === 2) {
                    const activePalette = state.palettes[form.paletteIdx];
                    stepHtml = `
                        <div class="fade-in">
                            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 24px;">Step 2. 비주얼 아이덴티티</h3>
                            
                            <div style="margin-bottom: 28px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 12px; font-weight: 500;">${t('choosePalette')}</label>
                                <div class="mood-color-picker">
                                    ${state.palettes.map((p, idx) => `
                                        <div class="color-swatch-card ${form.paletteIdx === idx ? 'selected' : ''}" data-palette="${idx}">
                                            <div class="color-swatch-preview" style="display: flex; border-radius: 6px; overflow: hidden;">
                                                ${p.colors.map(c => `<div style="flex: 1; background: ${c};"></div>`).join('')}
                                            </div>
                                            <div style="font-size: 0.75rem; text-align: center; font-weight: 500;">${p.name}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 12px; font-weight: 500;">${t('chooseLettering')}</label>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                                    ${['serif', 'sans', 'italic', 'mono'].map(l => `
                                        <div class="fabric-card ${form.lettering === l ? 'selected' : ''}" data-lettering="${l}" style="padding: 16px 8px; text-transform: capitalize;">
                                            <div class="lettering-${l}" style="font-size: 1.3rem; margin-bottom: 8px;">Aa</div>
                                            <span style="font-size: 0.8rem; color: var(--text-muted);">${l}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                } else if (form.step === 3) {
                    stepHtml = `
                        <div class="fade-in">
                            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 24px;">Step 3. 텍타일 봉제 패브릭</h3>
                            
                            <div class="fabric-grid">
                                ${state.fabrics.map((fab, idx) => `
                                    <div class="fabric-card ${form.fabricIdx === idx ? 'selected' : ''}" data-fabric="${idx}">
                                        <div class="fabric-texture-preview" style="background: ${fab.style};">
                                            <span style="color: white; font-weight: 700; font-size: 0.8rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${fab.weight}</span>
                                        </div>
                                        <h4 style="font-size: 0.95rem; margin-bottom: 4px; font-family: var(--font-sans); font-weight: 600;">${fab.name}</h4>
                                        <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap; margin-top: 4px;">
                                            ${fab.tags.map(t => `<span style="font-size: 0.65rem; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; color: var(--text-muted);">${t}</span>`).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <!-- Selected Fabric Details -->
                            <div class="card" style="margin-top: 20px; background: var(--bg-elevated); border: none;">
                                <h4 style="font-family: var(--font-serif); font-style: italic; margin-bottom: 8px;">
                                    ${state.fabrics[form.fabricIdx].name} (${state.fabrics[form.fabricIdx].weight})
                                </h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                                    ${state.fabrics[form.fabricIdx].desc}
                                </p>
                            </div>
                        </div>
                    `;
                } else if (form.step === 4) {
                    const selFabric = state.fabrics[form.fabricIdx];
                    const selPalette = state.palettes[form.paletteIdx];
                    let previewLettering = 'lettering-serif';
                    if (form.lettering === 'sans') previewLettering = 'lettering-sans';
                    if (form.lettering === 'italic') previewLettering = 'lettering-italic';
                    if (form.lettering === 'mono') previewLettering = 'lettering-mono';
                    
                    stepHtml = `
                        <div class="fade-in">
                            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 24px;">Step 4. 미학 기획서 및 MOQ 조율</h3>
                            
                            <div style="margin-bottom: 28px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; font-weight: 500;">
                                    ${t('quantityGoal')}: <strong style="color: var(--primary); font-size: 1.1rem;">${form.quantity} 벌 (Units)</strong>
                                </label>
                                <input type="range" id="brand-qty" min="10" max="100" step="5" value="${form.quantity}" style="width: 100%; accent-color: var(--primary);">
                                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                                    <span>최소 10벌 (소량 기획 최적)</span>
                                    <span>최대 100벌 (프리미엄 한정판)</span>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; font-size: 0.9rem; margin-bottom: 12px; font-weight: 500;">아이덴티티 기획서 미리보기</label>
                                
                                <div class="card" style="border: 1px dashed var(--border-glow); pointer-events: none;">
                                    <div style="display: flex; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 16px;">
                                        ${selPalette.colors.map(c => `<div style="flex: 1; background: ${c};"></div>`).join('')}
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                        <h2 class="${previewLettering}" style="font-size: 1.8rem; margin: 0; letter-spacing: 0.05em;">${form.name || 'BRAND_NAME'}</h2>
                                        <span class="brand-mood-tag">${form.mood}</span>
                                    </div>
                                    <p style="font-style: italic; font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">
                                        "${form.tagline || '브랜드 슬로건이 이곳에 렌더링됩니다.'}"
                                    </p>
                                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px; font-size: 0.85rem;">
                                        <div style="width: 14px; height: 14px; border-radius: 50%; background: ${selFabric.style}; border: 1px solid var(--border);"></div>
                                        <span style="font-weight: 600;">${selFabric.name}</span>
                                        <span style="color: var(--text-muted);">|</span>
                                        <span style="color: var(--text-muted);">${selFabric.weight}</span>
                                    </div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                                        목표 수량: ${form.quantity} Units | 크리에이터: ${state.user.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                return stepHtml;
            };

            const renderWizardShell = () => {
                container.innerHTML = `
                    <div class="card fade-in" style="max-width: 700px; margin: 0 auto; padding: var(--spacing-md);">
                        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; text-align: center; margin-bottom: 12px;">Sensory Brand Incubator</h2>
                        <p style="text-align: center; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 32px;">
                            4단계를 거쳐 독립 브랜드를 구축하고 패션 런칭 로드맵을 완성하세요.
                        </p>
                        
                        <!-- Step Indicator Nodes -->
                        <div class="incubator-steps">
                            ${[1, 2, 3, 4].map(s => `
                                <div class="step-node ${form.step === s ? 'active' : (form.step > s ? 'completed' : '')}">
                                    ${form.step > s ? '<i class="fas fa-check"></i>' : s}
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Step Dynamic Form Area -->
                        <div id="step-content-container" style="min-height: 250px; margin-bottom: 32px;">
                            ${renderStepContent()}
                        </div>
                        
                        <!-- Navigation Buttons -->
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 24px;">
                            <button class="btn btn-secondary" id="wizard-prev-btn" ${form.step === 1 ? 'disabled' : ''}>
                                <i class="fas fa-arrow-left" style="margin-right: 6px;"></i> 이전 단계
                            </button>
                            
                            ${form.step < 4 ? `
                                <button class="btn btn-primary" id="wizard-next-btn">
                                    다음 단계 <i class="fas fa-arrow-right" style="margin-left: 6px;"></i>
                                </button>
                            ` : `
                                <button class="btn btn-primary" id="wizard-launch-btn" style="background: var(--primary); color: var(--bg-main);">
                                    <i class="fas fa-paper-plane" style="margin-right: 6px;"></i> ${t('launchBtn')}
                                </button>
                            `}
                        </div>
                    </div>
                `;
                
                // Add Event Listeners for wizard content
                setupWizardListeners();
            };

            const setupWizardListeners = () => {
                // Prev button
                const prevBtn = document.getElementById('wizard-prev-btn');
                if (prevBtn) {
                    prevBtn.onclick = () => {
                        saveCurrentStepInputs();
                        if (form.step > 1) {
                            form.step -= 1;
                            renderWizardShell();
                        }
                    };
                }
                
                // Next button
                const nextBtn = document.getElementById('wizard-next-btn');
                if (nextBtn) {
                    nextBtn.onclick = () => {
                        saveCurrentStepInputs();
                        if (form.step === 1 && !form.name.trim()) {
                            alert('브랜드 이름을 입력해 주세요.');
                            return;
                        }
                        if (form.step < 4) {
                            form.step += 1;
                            renderWizardShell();
                        }
                    };
                }
                
                // Launch / Submit Button
                const launchBtn = document.getElementById('wizard-launch-btn');
                if (launchBtn) {
                    launchBtn.onclick = () => {
                        saveCurrentStepInputs();
                        
                        // Create brand entry
                        const newBrand = {
                            id: 'brand-' + Date.now(),
                            name: form.name,
                            tagline: form.tagline,
                            mood: form.mood,
                            paletteIdx: form.paletteIdx,
                            lettering: form.lettering,
                            fabricIdx: form.fabricIdx,
                            quantity: form.quantity,
                            votes: 1, // Self voted
                            pledged: true,
                            creator: state.user.name,
                            date: new Date().toISOString().split('T')[0]
                        };
                        
                        state.brands.unshift(newBrand);
                        saveLocalState();
                        
                        // Clear form state
                        form.step = 1;
                        form.name = '';
                        form.tagline = '';
                        form.mood = 'Minimalist';
                        form.paletteIdx = 0;
                        form.lettering = 'serif';
                        form.fabricIdx = 0;
                        form.quantity = 30;
                        
                        alert(t('launchSuccess'));
                        router.navigate('home');
                    };
                }
                
                // Step 1 - Inputs
                if (form.step === 1) {
                    document.querySelectorAll('[data-mood]').forEach(btn => {
                        btn.onclick = () => {
                            form.mood = btn.dataset.mood;
                            renderWizardShell();
                        };
                    });
                }
                
                // Step 2 - Color Palette & Typography
                if (form.step === 2) {
                    document.querySelectorAll('[data-palette]').forEach(card => {
                        card.onclick = () => {
                            form.paletteIdx = parseInt(card.dataset.palette);
                            renderWizardShell();
                        };
                    });
                    document.querySelectorAll('[data-lettering]').forEach(card => {
                        card.onclick = () => {
                            form.lettering = card.dataset.lettering;
                            renderWizardShell();
                        };
                    });
                }
                
                // Step 3 - Fabrics Selection
                if (form.step === 3) {
                    document.querySelectorAll('[data-fabric]').forEach(card => {
                        card.onclick = () => {
                            form.fabricIdx = parseInt(card.dataset.fabric);
                            renderWizardShell();
                        };
                    });
                }
            };
            
            const saveCurrentStepInputs = () => {
                if (form.step === 1) {
                    const nameIn = document.getElementById('brand-name');
                    const taglineIn = document.getElementById('brand-tagline');
                    if (nameIn) form.name = nameIn.value;
                    if (taglineIn) form.tagline = taglineIn.value;
                }
                if (form.step === 4) {
                    const qtyIn = document.getElementById('brand-qty');
                    if (qtyIn) form.quantity = parseInt(qtyIn.value);
                }
            };
            
            renderWizardShell();
        },
        
        fabrics: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in">
                    <div style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 28px;">
                        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0;">Tactile Fabric Directory</h2>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">아뜰리에 런칭 브랜드들이 선택할 수 있는 프리미엄 감각 소재 컬렉션입니다.</p>
                    </div>
                    
                    <div style="display: grid; gap: 24px;">
                        ${state.fabrics.map(fab => `
                            <div class="card" style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                                <div style="width: 150px; height: 150px; border-radius: var(--radius-md); background: ${fab.style}; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                                    <span style="color: white; font-weight: 700; font-size: 1.1rem; text-shadow: 0 2px 5px rgba(0,0,0,0.6);">${fab.weight}</span>
                                </div>
                                <div style="flex: 1; min-width: 250px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <h3 style="font-size: 1.4rem; font-family: var(--font-serif); margin: 0;">${fab.name}</h3>
                                        <div style="display: flex; gap: 6px;">
                                            ${fab.tags.map(tag => `<span style="font-size: 0.7rem; background: var(--bg-elevated); border: 1px solid var(--border); padding: 2px 8px; border-radius: 20px; font-weight: 500;">${tag}</span>`).join('')}
                                        </div>
                                    </div>
                                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px;">${fab.desc}</p>
                                    <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">적합 아이템: ${fab.name.includes('Denim') ? '자켓, 데님 팬츠, 워커웨어' : fab.name.includes('Cotton') ? '헤비 맨투맨, 오버핏 반팔' : fab.name.includes('Velvet') ? '테일러 블레이저, 드레스 코트' : fab.name.includes('Satin') ? '실크 슬립 드레스, 흐르는 셔츠' : '린넨 슈트, 썸머 와이드 팬츠'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },
        
        matcher: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in">
                    <div style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 28px;">
                        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0;">Sustainable Small-Batch Matcher</h2>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">최소 10벌 단위 소량 오더 및 패션 크리에이터 특화 봉제 라인을 가진 국내 지속가능 공장 매칭 서비스입니다.</p>
                    </div>
                    
                    <div style="display: grid; gap: 20px;">
                        ${state.manufacturers.map(fac => `
                            <div class="card" style="padding: 24px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                                    <div>
                                        <h3 style="font-size: 1.35rem; font-family: var(--font-serif); margin: 0; margin-bottom: 4px;">${fac.name}</h3>
                                        <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-map-marker-alt"></i> ${fac.location}</span>
                                    </div>
                                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary); background: var(--bg-elevated); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border);">
                                        MOQ: ${fac.moq} Units
                                    </span>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.9rem; margin-bottom: 20px; background: var(--bg-elevated); padding: 12px; border-radius: var(--radius-sm);">
                                    <div><strong>제작 리드타임:</strong> <span style="color: var(--text-muted);">${fac.leadTime}</span></div>
                                    <div><strong>주요 전문분야:</strong> <span style="color: var(--text-muted);">${fac.specialty}</span></div>
                                </div>
                                <div style="display: flex; justify-content: flex-end;">
                                    <button class="btn btn-primary" onclick="alert('${fac.name} 상담 대기 라인으로 연결합니다: ${fac.contact}')" style="padding: 8px 20px; font-size: 0.85rem;">
                                        <i class="fas fa-comment-dots" style="margin-right: 6px;"></i> 제작 컨설팅 문의
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },
        
        community: () => {
            const container = document.getElementById('view-container');
            
            const renderCommunityContent = () => {
                container.innerHTML = `
                    <div class="fade-in">
                        <div style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 28px;">
                            <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0;">Creator Lounge & Archive</h2>
                            <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">의류 브랜드 디렉터와 크리에이터 파트너들이 나누는 무드 커뮤니티 공간입니다.</p>
                        </div>
                        
                        <!-- Shared Vibe Board -->
                        <atelier-moodboard></atelier-moodboard>
                        
                        <!-- Ask & Match Feed -->
                        <div style="margin-bottom: 24px;">
                            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 16px;">라운지 게시판</h3>
                            <div class="card" style="padding: 20px; margin-bottom: 20px;">
                                <textarea id="post-input" class="textarea-field" placeholder="원단 소싱, 패턴 협업, 촬영 구직 정보 등 자유로운 이야기를 나눠보세요." rows="3" style="margin-bottom: 12px;"></textarea>
                                <div style="display: flex; justify-content: flex-end;">
                                    <button class="btn btn-primary" id="submit-post-btn" style="padding: 8px 24px; font-size: 0.85rem;">라운지에 등록</button>
                                </div>
                            </div>
                            
                            <div id="posts-list" style="display: grid; gap: 16px;"></div>
                        </div>
                    </div>
                `;

                // Render Lounge Posts
                const list = document.getElementById('posts-list');
                state.communityPosts.forEach(p => {
                    const postCard = document.createElement('div');
                    postCard.className = 'card';
                    postCard.style.padding = '20px';
                    
                    postCard.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span style="font-weight: 700; font-size: 0.9rem;">@${p.author}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">${p.time}</span>
                        </div>
                        <p style="font-size: 0.95rem; margin-bottom: 16px; white-space: pre-wrap;">${p.content}</p>
                        
                        <!-- Replies List -->
                        <div style="display: grid; gap: 8px; margin-left: 20px; border-left: 1px solid var(--border); padding-left: 12px; margin-bottom: 16px;">
                            ${p.replies.map(r => `
                                <div style="font-size: 0.85rem; padding: 4px 0;">
                                    <strong>@${r.author}:</strong> <span style="color: var(--text-muted);">${r.content}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Reply Input -->
                        <div style="display: flex; gap: 8px;">
                            <input type="text" placeholder="답글 달기..." class="input-field reply-box" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 20px;">
                            <button class="btn btn-secondary reply-btn" style="padding: 6px 16px; font-size: 0.8rem; border-radius: 20px;">답글</button>
                        </div>
                    `;
                    
                    const replyBox = postCard.querySelector('.reply-box');
                    const replyBtn = postCard.querySelector('.reply-btn');
                    
                    replyBtn.onclick = () => {
                        const txt = replyBox.value.trim();
                        if (txt) {
                            p.replies.push({ id: 'r-' + Date.now(), author: state.user.name, content: txt });
                            saveLocalState();
                            renderCommunityContent();
                        }
                    };
                    
                    list.appendChild(postCard);
                });

                // Post Registration listener
                document.getElementById('submit-post-btn').onclick = () => {
                    const txt = document.getElementById('post-input').value.trim();
                    if (txt) {
                        state.communityPosts.unshift({
                            id: 'p-' + Date.now(),
                            author: state.user.name,
                            content: txt,
                            time: '방금 전',
                            replies: []
                        });
                        saveLocalState();
                        renderCommunityContent();
                    }
                };
            };
            
            renderCommunityContent();
        }
    },
    
    navigate: (view) => {
        state.currentView = view;
        router.views[view]();
        renderHeader();
        window.scrollTo(0, 0);
    }
};

function renderHeader() {
    const nav = document.getElementById('header-nav');
    if (nav) {
        nav.innerHTML = '<atelier-nav></atelier-nav>';
    }
}

// --- Entry Point On Dom Content Loaded ---
document.addEventListener('DOMContentLoaded', async () => {
    // Load local storage fallback
    loadLocalState();
    
    // Apply theme on load
    if (state.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    
    // Init Firebase
    await initFirebase();
    
    // Route Initial Navigation
    router.navigate('home');
    
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
        logoBtn.onclick = () => router.navigate('home');
    }
    
    // Fade out splash screen
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('fade-out');
            setTimeout(() => splash.remove(), 800);
        }
    }, 1500);
});
