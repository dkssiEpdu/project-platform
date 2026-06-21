// GYEOL (결) - Independent Brand Product Archive Main Module

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
        console.log("Firebase initialized successfully for GYEOL.");
    } catch (e) {
        console.warn("Firebase fallback mode: Local state active.");
    }
}

// --- Application State ---
const state = {
    currentView: 'home',
    theme: 'light', // Light is default
    currentLanguage: 'ko',
    user: { name: '디렉터 게스트', id: 'director_guest' },
    activeFilters: {
        category: 'All',
        mood: 'All'
    },
    
    // Preset mock lookbook images for product uploader
    mockupImages: [
        { name: '오버핏 하프코트', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80' },
        { name: '헤비 오버핏 스웨트', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80' },
        { name: '와이드 데님 팬츠', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80' },
        { name: '실크 슬립 셔츠', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80' },
        { name: '레더 아카이브 숄더백', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80' }
    ],

    // Product Database (Musinsa-style)
    products: [
        {
            id: 'prod-1',
            brand: '오디티 (ODDITY)',
            name: '디컨스트럭티드 코튼 와이드 슬랙스',
            price: 119000,
            category: 'Pants',
            mood: 'Avant-Garde',
            colors: ['#2b2b2b', '#dcd0c0'],
            fabricIdx: 0,
            desc: '밑단의 자연스러운 로우 컷팅(raw cutting) 디테일과 와이드 오버핏 실루엣이 결합되어 아방가르드한 미학을 극대화한 슬랙스입니다.',
            image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
            sizes: ['S', 'M', 'L'],
            reviews: [
                { author: 'pretend1', rating: 5, text: '핏이 정말 감성적이에요. 무거운 부츠랑 신으면 성수동 미학 그 자체.' },
                { author: 'ootd_lover', rating: 4, text: '허리가 조금 넉넉하게 나온 편인데 기장은 완벽합니다.' }
            ],
            inquiries: []
        },
        {
            id: 'prod-2',
            brand: '센섬 (SENSUM)',
            name: '헤비 실크 셋업 벨벳 아우터',
            price: 249000,
            category: 'Outer',
            mood: 'Silent Luxury',
            colors: ['#141414', '#3d3b38'],
            fabricIdx: 2,
            desc: '이탈리아산 실크 벨벳 원단을 활용하여 깊이 있는 광택과 자연스럽게 가라앉는 실루엣을 자아내는 포멀 블레이저입니다.',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
            sizes: ['M', 'L', 'XL'],
            reviews: [
                { author: 'luxe30', rating: 5, text: '고급스러운 광택이라 조명 아래에서 분위기가 대단합니다.' }
            ],
            inquiries: []
        },
        {
            id: 'prod-3',
            brand: '아우라 (AURA)',
            name: '플루이드 링클 실크 블라우스 셔츠',
            price: 89000,
            category: 'Tops',
            mood: 'Minimal',
            colors: ['#faf8f5', '#a3b19b'],
            fabricIdx: 3,
            desc: '공기처럼 가벼운 사틴 실크에 링클(주름) 가공을 입혀 미니멀하면서도 빛에 따라 오묘하게 반사되는 시각적 질감을 구현했습니다.',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
            sizes: ['S', 'M', 'L'],
            reviews: [],
            inquiries: []
        },
        {
            id: 'prod-4',
            brand: '결 (GYEOL)',
            name: '내추럴 슬러브 린넨 루즈 트라우저',
            price: 98000,
            category: 'Pants',
            mood: 'Minimal',
            colors: ['#dcd0c0', '#78866b'],
            fabricIdx: 4,
            desc: '재생 린넨 원사의 자연스러운 슬러브 감각을 정갈하게 살린 여름 테일러링 와이드 핏 트라우저입니다.',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
            sizes: ['M', 'L'],
            reviews: [
                { author: 'ss_look', rating: 5, text: '결 특유의 텍스처가 시각적으로 시원해 보여서 참 좋네요.' }
            ],
            inquiries: []
        }
    ],

    // Fabric Catalog
    fabrics: [
        { name: 'Organic Heavy Cotton', weight: '450gsm', desc: '두껍고 밀도 높은 텍스처로, 각 잡힌 오버사이즈 실루엣과 스트리트웨어의 단단한 핏에 적합합니다.', style: 'linear-gradient(135deg, oklch(75% 0.01 40), oklch(50% 0.01 40))', tags: ['친환경', '고중량', '구조적'] },
        { name: 'Raw Japanese Denim', weight: '14oz', desc: '방축가공을 거치지 않은 생지 데님으로, 입을수록 착용자의 주름과 습관에 따라 고유의 워싱이 잡힙니다.', style: 'linear-gradient(135deg, oklch(25% 0.08 260), oklch(15% 0.05 260))', tags: ['생지', '내구성', '에이징'] },
        { name: 'Heavy Silk Velvet', weight: '320gsm', desc: '깊은 표면 파일(pile)이 빛을 흡수하고 반사하여 드라마틱한 광택과 묵직하게 흐르는 실루엣을 만듭니다.', style: 'linear-gradient(135deg, oklch(18% 0.02 300), oklch(10% 0.01 300))', tags: ['럭셔리', '벨벳', '드레이프'] },
        { name: 'Silk Satin', weight: '80gsm', desc: '피부에 닿는 극도의 청량함과 흐르는 듯한 유동적 드레이프를 가진 고광택 원단으로, 젠더리스 셔츠에 최적입니다.', style: 'linear-gradient(135deg, oklch(90% 0.03 80), oklch(80% 0.05 80))', tags: ['유동적', '광택', '경량'] },
        { name: 'Recycled Rough Linen', weight: '240gsm', desc: '불규칙한 슬러브 감각이 돋보이는 거친 텍스처의 린넨으로, 여름철 내추럴 테일러링과 편안한 핏에 어울립니다.', style: 'linear-gradient(135deg, oklch(85% 0.03 70), oklch(70% 0.04 70))', tags: ['재생원사', '내추럴', '통기성'] }
    ],

    // Small-batch manufacturer partner catalog
    manufacturers: [
        { name: '서울 서부 봉제 아뜰리에 (Seoul Atelier)', location: '서울 종로구 창신동', moq: 10, leadTime: '3주', specialty: '실크/벨벳 셔츠, 고난이도 패턴 테일러링', contact: '02-123-4567' },
        { name: '부산 데님 공방 (Busan Denim Works)', location: '부산 사상구 감전동', moq: 20, leadTime: '4주', specialty: '셀비지 데님 워싱, 생지 청바지 제작', contact: '051-789-1011' },
        { name: '대구 니트 연구소 (Daegu Knit Lab)', location: '대구 서구 비산동', moq: 15, leadTime: '3주', specialty: '친환경 면사 니팅, 헤비 코튼 스웨트셔츠', contact: '053-456-7890' }
    ],

    // Brand Snap/Lookbook Feed (Community Lounge)
    lookbooks: [
        {
            id: 'look-1',
            brand: '센섬 (SENSUM)',
            author: 'Director_S',
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
            description: '벨벳 아우터와 실크 사틴 와이드 타이 매치. 가을 성수 아틀리에 스냅.',
            likes: 24,
            comments: [{ author: 'visitor5', text: '자켓 드레이프가 정말 고유하네요!' }]
        },
        {
            id: 'look-2',
            brand: '오디티 (ODDITY)',
            author: 'Director_O',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
            description: '디컨스트럭티드 코튼 팬츠와 스웨이드 슈즈 매칭 데일리 룩.',
            likes: 18,
            comments: []
        }
    ]
};

// --- Language Dictionary ---
const translations = {
    ko: {
        showroom: '브랜드 스토어',
        uploader: '제품 등록 (Admin)',
        lookbook: '스타일 룩북',
        fabrics: '원단 아카이브',
        matcher: '제작 매칭',
        all: '전체',
        price: '판매가',
        register: '상품 등록 완료',
        submitBtn: '새 상품 등록하기',
        themeToggle: '테마 전환',
        chatPlaceholder: '브랜드 미학이나 소싱 공장에 관해 물어보세요...',
        botIntro: '안녕하세요! 결 (GYEOL) 아카이브 가이드입니다. 20-30대 미학 제품 컬렉션 및 성수동 봉제 라인 매칭에 대해 조언해 드립니다.'
    },
    en: {
        showroom: 'Store',
        uploader: 'Upload Product (Admin)',
        lookbook: 'Lookbook Lounge',
        fabrics: 'Fabrics Archive',
        matcher: 'Factory Matcher',
        all: 'All',
        price: 'Price',
        register: 'Product Registered Successfully',
        submitBtn: 'Register Product',
        themeToggle: 'Toggle Theme',
        chatPlaceholder: 'Ask about fashion aesthetics or factories...',
        botIntro: 'Hello! I am your GYEOL Archive Guide. I can advise you on independent brand styling and Seongsu sewing lines.'
    }
};

function t(key) {
    return translations[state.currentLanguage][key] || key;
}

// Formatting price helper
const formatKRW = (price) => '₩' + Number(price).toLocaleString('ko-KR');

// --- Local Storage Management ---
function loadLocalState() {
    const savedProducts = localStorage.getItem('gyeol_products');
    if (savedProducts) {
        state.products = JSON.parse(savedProducts);
    }
    const savedLookbooks = localStorage.getItem('gyeol_lookbooks');
    if (savedLookbooks) {
        state.lookbooks = JSON.parse(savedLookbooks);
    }
}

function saveLocalState() {
    localStorage.setItem('gyeol_products', JSON.stringify(state.products));
    localStorage.setItem('gyeol_lookbooks', JSON.stringify(state.lookbooks));
}

// --- Dynamic Web Components ---

// Navigation Menu
class GyeolNav extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        const themeIcon = state.theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const themeLabel = state.theme === 'dark' ? 'Light' : 'Dark';
        
        this.innerHTML = `
            <div style="display: flex; align-items: center; gap: 2px; flex-wrap: wrap;">
                <button class="nav-btn ${state.currentView === 'home' ? 'active' : ''}" data-view="home">${t('showroom')}</button>
                <button class="nav-btn ${state.currentView === 'uploader' ? 'active' : ''}" data-view="uploader">${t('uploader')}</button>
                <button class="nav-btn ${state.currentView === 'lookbook' ? 'active' : ''}" data-view="lookbook">${t('lookbook')}</button>
                <button class="nav-btn ${state.currentView === 'fabrics' ? 'active' : ''}" data-view="fabrics">${t('fabrics')}</button>
                <button class="nav-btn ${state.currentView === 'matcher' ? 'active' : ''}" data-view="matcher">${t('matcher')}</button>
                
                <button class="util-btn" id="theme-toggle">
                    <i class="fas ${themeIcon}"></i> <span>${themeLabel}</span>
                </button>
                
                <button class="util-btn" id="lang-toggle">
                    <i class="fas fa-globe"></i> <span>${state.currentLanguage.toUpperCase()}</span>
                </button>
            </div>
        `;

        this.querySelectorAll('.nav-btn').forEach(btn => {
            btn.onclick = () => router.navigate(btn.dataset.view);
        });

        this.querySelector('#theme-toggle').onclick = () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            document.body.classList.toggle('dark-theme', state.theme === 'dark');
            this.render();
        };

        this.querySelector('#lang-toggle').onclick = () => {
            state.currentLanguage = state.currentLanguage === 'ko' ? 'en' : 'ko';
            router.navigate(state.currentView);
        };
    }
}
customElements.define('gyeol-nav', GyeolNav);

// Product Item Card
class GyeolProductCard extends HTMLElement {
    set productData(data) {
        this._data = data;
        this.render();
    }
    render() {
        const d = this._data;
        const colorDots = d.colors.map(c =>
            `<span class="color-dot-sm" style="background:${c};"></span>`
        ).join('');
        this.innerHTML = `
            <div class="product-card-wrap">
                <div class="product-image-container">
                    <span class="product-mood-badge">${d.mood}</span>
                    <img src="${d.image}" alt="${d.name}" class="product-image" loading="lazy">
                    <div class="product-hover-cta">
                        <span class="cta-line">VIEW DETAIL</span>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-brand">${d.brand}</div>
                    <h3 class="product-title">${d.name}</h3>
                    <div class="product-footer">
                        <span class="product-price">${formatKRW(d.price)}</span>
                        <div class="product-colors">${colorDots}</div>
                    </div>
                </div>
            </div>
        `;
        
        this.querySelector('.product-card-wrap').onclick = () => {
            openProductDetail(d.id);
        };
    }
}
customElements.define('gyeol-product-card', GyeolProductCard);

// Floating AI Assistant chatbot
class GyeolChatbot extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupListeners();
    }
    render() {
        this.innerHTML = `
            <div class="chatbot-container">
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div>
                            <div class="chatbot-header-title">결 Guide</div>
                            <div class="chatbot-header-sub">Archive AI · Always here</div>
                        </div>
                        <button id="close-chat" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:4px;"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="chat-msg bot">${t('botIntro')}</div>
                    </div>
                    <div class="chatbot-input-area">
                        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="${t('chatPlaceholder')}">
                        <button class="chatbot-send" id="chatbot-send"><i class="fas fa-arrow-up"></i></button>
                    </div>
                </div>
                <button class="chatbot-btn" id="chatbot-toggle">
                    <i class="fas fa-sparkles"></i>
                </button>
            </div>
        `;
    }
    setupListeners() {
        const toggle = this.querySelector('#chatbot-toggle');
        const win = this.querySelector('#chatbot-window');
        const close = this.querySelector('#close-chat');
        const input = this.querySelector('#chatbot-input');
        const send = this.querySelector('#chatbot-send');
        const msgList = this.querySelector('#chatbot-messages');

        toggle.onclick = () => win.classList.toggle('show');
        close.onclick = () => win.classList.remove('show');

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            const uMsg = document.createElement('div');
            uMsg.className = 'chat-msg user';
            uMsg.textContent = text;
            msgList.appendChild(uMsg);
            input.value = '';
            msgList.scrollTop = msgList.scrollHeight;

            setTimeout(() => {
                const bMsg = document.createElement('div');
                bMsg.className = 'chat-msg bot';
                bMsg.textContent = getBotResponse(text);
                msgList.appendChild(bMsg);
                msgList.scrollTop = msgList.scrollHeight;
            }, 800);
        };

        send.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }
}
customElements.define('gyeol-chatbot', GyeolChatbot);

function getBotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('무신사') || q.includes('musinsa')) {
        return "결(GYEOL)은 독립 디자인 브랜드들이 자유롭게 룩북과 아이템을 등재하는 아카이브 스토어입니다. 상단의 '제품 등록' 메뉴를 눌러 귀사의 브랜드를 런칭해 보세요!";
    }
    if (q.includes('성수') || q.includes('seongsu')) {
        return "성수동 감성은 원단의 질감(결)과 인더스트리얼 레이아웃, 그리고 정갈한 세리프 한글 폰트(고운바탕)에서 출발합니다. 저희 플랫폼 디자인 역시 성수동의 세련된 쇼룸 분위기를 재현했습니다.";
    }
    if (q.includes('소재') || q.includes('원단') || q.includes('원사')) {
        return "각 제품의 상세페이지에서 실크 사틴, 재패니즈 샐비지 데님, 린넨 등 정갈한 원재료의 텍스처를 소개하고 있습니다. '원단 아카이브' 메뉴에서 각 원자재 스펙을 살펴보실 수 있습니다.";
    }
    return "결 (GYEOL) 아카이브에 대해 더 궁금한 점이 있으신가요? 카테고리 필터링이나 제품 등록 절차에 대해 알려드릴 수 있습니다.";
}

// --- Product Detailed Drawer Overlay Controller ---
function openProductDetail(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const overlay = document.getElementById('product-detail-overlay');
    const panel = document.getElementById('product-detail-panel');
    
    const fabric = state.fabrics[product.fabricIdx];
    
    const starsHtml = (r) => '★'.repeat(r) + '<span style="opacity:0.25">★</span>'.repeat(5 - r);
    panel.innerHTML = `
        <div class="detail-slider-header">
            <div>
                <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-ghost);margin-bottom:4px;">Product Detail</div>
                <div style="font-family:var(--font-serif);font-size:1rem;font-weight:600;">${product.brand}</div>
            </div>
            <button class="detail-close-btn" id="close-detail-panel"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="detail-slider-content">
            <!-- Image -->
            <div style="aspect-ratio:3/4;border-radius:var(--r-md);overflow:hidden;margin-bottom:24px;position:relative;">
                <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
                <div style="position:absolute;top:14px;left:14px;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);padding:4px 12px;border-radius:40px;font-size:0.62rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-main);">${product.category}</div>
            </div>
            
            <!-- Title Block -->
            <h1 style="font-size:1.9rem;font-family:var(--font-serif);font-weight:300;line-height:1.2;margin-bottom:8px;">${product.name}</h1>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border);">
                <span style="font-size:1.55rem;font-weight:700;letter-spacing:-0.02em;">${formatKRW(product.price)}</span>
                <span style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-ghost);border:1px solid var(--border);padding:5px 12px;border-radius:40px;">${product.mood}</span>
            </div>

            <!-- Size -->
            <div style="margin-bottom:22px;">
                <div class="section-eyebrow">Size</div>
                <div class="size-selector">
                    ${product.sizes.map((s, idx) => `<button class="size-btn ${idx === 0 ? 'active' : ''}">${s}</button>`).join('')}
                </div>
            </div>
            
            <!-- Colors -->
            <div style="margin-bottom:24px;">
                <div class="section-eyebrow">Color Palette</div>
                <div style="display:flex;gap:10px;margin-top:4px;">
                    ${product.colors.map(c => `<span class="color-dot" style="background:${c};width:28px;height:28px;"></span>`).join('')}
                </div>
            </div>
            
            <!-- Fabric Info -->
            <div style="background:var(--bg-elevated);border-radius:var(--r-sm);padding:18px;margin-bottom:24px;">
                <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-ghost);margin-bottom:8px;">Fabric · ${fabric.weight}</div>
                <div style="font-family:var(--font-serif);font-size:1.05rem;font-style:italic;margin-bottom:8px;">${fabric.name}</div>
                <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6;">${product.desc}</p>
            </div>

            <!-- CTA -->
            <button class="btn btn-primary" style="width:100%;padding:15px;font-size:0.8rem;border-radius:var(--r-sm);margin-bottom:28px;">
                <i class="fas fa-bag-shopping"></i>&nbsp;&nbsp;장바구니 담기
            </button>
            
            <!-- Reviews -->
            <div>
                <div class="section-eyebrow">Reviews (${product.reviews.length})</div>
                <div id="detail-reviews-list" style="margin-bottom:16px;">
                    ${product.reviews.length === 0
                        ? '<p style="font-size:0.84rem;color:var(--text-ghost);padding:12px 0;">첫 번째 리뷰를 남겨보세요.</p>'
                        : product.reviews.map(r => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-author">@${r.author}</span>
                                <span class="review-rating" style="font-size:0.75rem;">${starsHtml(r.rating)}</span>
                            </div>
                            <p class="review-text">${r.text}</p>
                        </div>`).join('')}
                </div>
                <div style="display:flex;gap:8px;">
                    <input type="text" placeholder="리뷰를 남겨주세요..." class="input-field" id="new-review-text" style="font-size:0.84rem;">
                    <button class="btn btn-primary" id="submit-review-btn" style="padding:10px 18px;font-size:0.74rem;white-space:nowrap;">등록</button>
                </div>
            </div>
        </div>
    `;
    
    // Wire up events
    overlay.classList.add('show');
    panel.classList.add('show');
    
    // Close events
    const closeBtn = document.getElementById('close-detail-panel');
    closeBtn.onclick = closeProductDetail;
    overlay.onclick = closeProductDetail;
    
    // Size button clicks
    panel.querySelectorAll('.size-btn').forEach(btn => {
        btn.onclick = () => {
            panel.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
    
    // Submit review click
    const subReviewBtn = document.getElementById('submit-review-btn');
    subReviewBtn.onclick = () => {
        const input = document.getElementById('new-review-text');
        const txt = input.value.trim();
        if (txt) {
            const newRev = { author: state.user.name, rating: 5, text: txt };
            product.reviews.push(newRev);
            saveLocalState();
            openProductDetail(productId); // Reload panel view
        }
    };
}

function closeProductDetail() {
    const overlay = document.getElementById('product-detail-overlay');
    const panel = document.getElementById('product-detail-panel');
    overlay.classList.remove('show');
    panel.classList.remove('show');
}

// --- SPA Router Views ---
const router = {
    views: {
        home: () => {
            const container = document.getElementById('view-container');
            const totalCount = state.products.length;
            
            container.innerHTML = `
                <div class="fade-in">
                    <!-- Magazine Hero -->
                    <div class="home-hero">
                        <div>
                            <div class="hero-eyebrow">독립 브랜드 아카이브 · Seongsu Edition</div>
                            <h2 class="hero-title">결<em>(GYEOL)</em><br>Archive Store</h2>
                            <p class="hero-desc">독립 디자이너 브랜드의 고유한 결을 — 원단의 질감, 실루엣의 흐름, 브랜드 미학 — 기록하는 제품 쇼룸.</p>
                        </div>
                        <div class="hero-meta">
                            <div class="hero-count">${String(totalCount).padStart(2, '0')}</div>
                            <div class="hero-count-label">Products</div>
                        </div>
                    </div>
                    
                    <!-- Filters -->
                    <div class="filter-section">
                        <div class="filter-row">
                            <span class="filter-label">Category</span>
                            <button class="filter-chip ${state.activeFilters.category === 'All' ? 'active' : ''}" data-cat="All">${t('all')}</button>
                            <button class="filter-chip ${state.activeFilters.category === 'Outer' ? 'active' : ''}" data-cat="Outer">Outer</button>
                            <button class="filter-chip ${state.activeFilters.category === 'Tops' ? 'active' : ''}" data-cat="Tops">Tops / Knit</button>
                            <button class="filter-chip ${state.activeFilters.category === 'Pants' ? 'active' : ''}" data-cat="Pants">Pants</button>
                        </div>
                        <div class="filter-row">
                            <span class="filter-label">Mood</span>
                            <button class="filter-chip ${state.activeFilters.mood === 'All' ? 'active' : ''}" data-mood="All">${t('all')}</button>
                            <button class="filter-chip ${state.activeFilters.mood === 'Minimal' ? 'active' : ''}" data-mood="Minimal">Minimal</button>
                            <button class="filter-chip ${state.activeFilters.mood === 'Street' ? 'active' : ''}" data-mood="Street">Street</button>
                            <button class="filter-chip ${state.activeFilters.mood === 'Avant-Garde' ? 'active' : ''}" data-mood="Avant-Garde">Avant-Garde</button>
                            <button class="filter-chip ${state.activeFilters.mood === 'Silent Luxury' ? 'active' : ''}" data-mood="Silent Luxury">Silent Luxury</button>
                        </div>
                    </div>
                    
                    <!-- Products Grid -->
                    <div class="product-grid" id="showroom-products-grid"></div>
                </div>
            `;
            
            container.querySelectorAll('[data-cat]').forEach(chip => {
                chip.onclick = () => { state.activeFilters.category = chip.dataset.cat; router.views.home(); };
            });
            container.querySelectorAll('[data-mood]').forEach(chip => {
                chip.onclick = () => { state.activeFilters.mood = chip.dataset.mood; router.views.home(); };
            });

            const grid = document.getElementById('showroom-products-grid');
            const filtered = state.products.filter(p => {
                const matchCat = state.activeFilters.category === 'All' || p.category === state.activeFilters.category;
                const matchMood = state.activeFilters.mood === 'All' || p.mood === state.activeFilters.mood;
                return matchCat && matchMood;
            });
            
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-box-open"></i></div><p>검색 필터에 일치하는 상품이 없습니다.</p></div>`;
            } else {
                filtered.forEach(p => {
                    const card = document.createElement('gyeol-product-card');
                    card.productData = p;
                    grid.appendChild(card);
                });
            }
        },
        
        uploader: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in" style="max-width:860px;margin:0 auto;">
                    <!-- Page Header -->
                    <div style="padding:56px 0 40px;border-bottom:1px solid var(--border);margin-bottom:40px;">
                        <div class="hero-eyebrow">Brand Portal · Admin</div>
                        <h2 class="page-title">Product <em>Uploader</em></h2>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:440px;line-height:1.7;font-weight:300;">독립 브랜드 디렉터 전용 제품 등록 포털. 아카이브 쇼룸에 새 컬렉션을 런칭하세요.</p>
                    </div>

                    <div class="card" style="padding:36px;">
                        <div class="uploader-form-grid" style="margin-bottom:24px;">
                            <div>
                                <label class="form-label">Brand Name</label>
                                <input type="text" id="up-brand" class="input-field" placeholder="예: 오디티 (ODDITY)" value="결 (GYEOL)">
                            </div>
                            <div>
                                <label class="form-label">Product Title</label>
                                <input type="text" id="up-name" class="input-field" placeholder="예: 테일러 아우터 자켓">
                            </div>
                            <div>
                                <label class="form-label">Category</label>
                                <select id="up-category" class="select-field">
                                    <option value="Outer">Outer (아우터)</option>
                                    <option value="Tops">Tops / Knit (상의)</option>
                                    <option value="Pants">Pants (하의)</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Price (KRW)</label>
                                <input type="number" id="up-price" class="input-field" placeholder="예: 89000">
                            </div>
                            <div>
                                <label class="form-label">Brand Mood</label>
                                <select id="up-mood" class="select-field">
                                    <option value="Minimal">Minimal</option>
                                    <option value="Street">Street</option>
                                    <option value="Avant-Garde">Avant-Garde</option>
                                    <option value="Silent Luxury">Silent Luxury</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Fabric Match</label>
                                <select id="up-fabric" class="select-field">
                                    ${state.fabrics.map((f, idx) => `<option value="${idx}">${f.name} (${f.weight})</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div style="margin-bottom:24px;">
                            <label class="form-label">Design Description</label>
                            <textarea id="up-desc" class="textarea-field" placeholder="제품 실루엣과 촉감(결)에 어울리는 감각적인 설명을 적어주세요." rows="3"></textarea>
                        </div>

                        <div style="margin-bottom:32px;">
                            <label class="form-label" style="margin-bottom:14px;">Lookbook Preset Image</label>
                            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;">
                                ${state.mockupImages.map((img, idx) => `
                                    <div class="fabric-card ${idx === 0 ? 'selected' : ''}" data-preset-idx="${idx}">
                                        <div class="fabric-swatch" style="height:80px;background:url('${img.url}') center/cover no-repeat;"></div>
                                        <div class="fabric-body" style="padding:8px;">
                                            <div style="font-size:0.62rem;font-weight:600;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:var(--text-muted);">${img.name}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div style="display:flex;gap:12px;justify-content:flex-end;">
                            <button class="btn btn-secondary" onclick="router.navigate('home')">취소</button>
                            <button class="btn btn-primary" id="btn-submit-product">${t('submitBtn')}</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Image preset selection
            let selectedPresetIdx = 0;
            container.querySelectorAll('[data-preset-idx]').forEach(card => {
                card.onclick = () => {
                    container.querySelectorAll('[data-preset-idx]').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    selectedPresetIdx = parseInt(card.dataset.preset-idx);
                };
            });
            
            // Form Submit handler
            document.getElementById('btn-submit-product').onclick = () => {
                const brand = document.getElementById('up-brand').value.trim();
                const name = document.getElementById('up-name').value.trim();
                const category = document.getElementById('up-category').value;
                const price = parseInt(document.getElementById('up-price').value);
                const mood = document.getElementById('up-mood').value;
                const fabricIdx = parseInt(document.getElementById('up-fabric').value);
                const desc = document.getElementById('up-desc').value.trim();
                
                if (!brand || !name || isNaN(price) || !desc) {
                    alert('모든 양식을 올바르게 입력해주세요.');
                    return;
                }
                
                // Construct new product
                const newProduct = {
                    id: 'prod-' + Date.now(),
                    brand,
                    name,
                    price,
                    category,
                    mood,
                    colors: ['#2b2b2b', '#faf8f5'], // default colors
                    fabricIdx,
                    desc,
                    image: state.mockupImages[selectedPresetIdx].url,
                    sizes: ['S', 'M', 'L'],
                    reviews: [],
                    inquiries: []
                };
                
                state.products.unshift(newProduct);
                saveLocalState();
                
                alert(t('register'));
                router.navigate('home');
            };
        },
        
        lookbook: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in">
                    <div style="padding:56px 0 40px;border-bottom:1px solid var(--border);margin-bottom:40px;">
                        <div class="hero-eyebrow">Community Feed · Style Archive</div>
                        <h2 class="page-title">Style <em>Lookbook</em></h2>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:440px;line-height:1.7;font-weight:300;">브랜드 디렉터와 성수 피플들의 코디네이션 스타일 아카이브 스냅 피드.</p>
                    </div>

                    <!-- Submit snap -->
                    <div class="card" style="padding:24px;margin-bottom:36px;">
                        <div class="section-eyebrow">새 스냅 올리기</div>
                        <textarea id="snap-desc-input" class="textarea-field" placeholder="착용 브랜드명과 오늘 연출한 룩북의 미학적 디테일을 설명해보세요." rows="2" style="margin-bottom:14px;"></textarea>
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
                            <select id="snap-image-select" class="select-field" style="flex:1;min-width:200px;">
                                <option value="https://images.unsplash.com/photo-1544441893-675973e31985?w=600">오버코트 스타일링 포토</option>
                                <option value="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600">포멀 슈트 디렉션 포토</option>
                                <option value="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600">린넨 가디건 내추럴 포토</option>
                            </select>
                            <button class="btn btn-primary" id="btn-submit-snap"><i class="fas fa-plus"></i>&nbsp; 스냅 등재</button>
                        </div>
                    </div>
                    
                    <div class="lookbook-grid" id="lookbook-photos-grid"></div>
                </div>
            `;
            
            const list = document.getElementById('lookbook-photos-grid');
            state.lookbooks.forEach(look => {
                const card = document.createElement('div');
                card.className = 'lookbook-card';
                
                card.innerHTML = `
                    <div class="lookbook-image-wrap">
                        <img src="${look.image}" alt="${look.brand}" class="lookbook-image" loading="lazy">
                    </div>
                    <div class="lookbook-footer">
                        <div class="lookbook-meta">
                            <span class="lookbook-author">${look.brand}</span>
                            <span class="lookbook-likes"><i class="fas fa-heart" style="font-size:0.7rem;"></i> ${look.likes}</span>
                        </div>
                        <div style="font-size:0.7rem;color:var(--text-ghost);margin-bottom:8px;">@${look.author}</div>
                        <p class="lookbook-desc">"${look.description}"</p>
                        ${look.comments.length > 0 ? `
                        <div style="border-top:1px solid var(--border);padding-top:10px;margin-top:10px;display:grid;gap:5px;">
                            ${look.comments.map(c => `
                            <div style="font-size:0.78rem;">
                                <span style="font-weight:700;color:var(--text-main);">@${c.author}</span>
                                <span style="color:var(--text-muted);margin-left:4px;">${c.text}</span>
                            </div>`).join('')}
                        </div>` : ''}
                        <div style="display:flex;gap:8px;margin-top:12px;">
                            <input type="text" placeholder="댓글 남기기..." class="input-field comment-input-box" style="font-size:0.8rem;padding:8px 12px;">
                            <button class="btn btn-secondary comment-submit-btn" style="padding:8px 14px;font-size:0.74rem;">입력</button>
                        </div>
                    </div>
                `;
                
                card.querySelector('.comment-submit-btn').onclick = () => {
                    const inp = card.querySelector('.comment-input-box');
                    const txt = inp.value.trim();
                    if (txt) {
                        look.comments.push({ author: state.user.name, text: txt });
                        saveLocalState();
                        router.views.lookbook();
                    }
                };
                
                list.appendChild(card);
            });
            
            document.getElementById('btn-submit-snap').onclick = () => {
                const desc = document.getElementById('snap-desc-input').value.trim();
                const image = document.getElementById('snap-image-select').value;
                if (desc) {
                    state.lookbooks.unshift({ id:'look-'+Date.now(), brand:'결 (GYEOL) 디렉션', author:state.user.name, image, description:desc, likes:1, comments:[] });
                    saveLocalState();
                    router.views.lookbook();
                }
            };
        },
        
        fabrics: () => {
            const container = document.getElementById('view-container');
            container.innerHTML = `
                <div class="fade-in">
                    <div style="padding:56px 0 40px;border-bottom:1px solid var(--border);margin-bottom:40px;">
                        <div class="hero-eyebrow">Materials · Textile Research</div>
                        <h2 class="page-title">Fabric <em>Archive</em></h2>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:440px;line-height:1.7;font-weight:300;">아카이브 쇼룸 제품에 사용되는 프리미엄 고유 원단 스펙 및 텍스처 정보.</p>
                    </div>
                    
                    <div class="fabric-showcase">
                        ${state.fabrics.map(fab => `
                            <div class="fabric-card">
                                <div class="fabric-swatch" style="background:${fab.style};">
                                    <div style="position:absolute;bottom:12px;left:12px;color:rgba(255,255,255,0.9);font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-shadow:0 1px 4px rgba(0,0,0,0.5);">${fab.weight}</div>
                                </div>
                                <div class="fabric-body">
                                    <div class="fabric-name">${fab.name}</div>
                                    <div class="fabric-weight">${fab.weight}</div>
                                    <p class="fabric-desc">${fab.desc}</p>
                                    <div class="fabric-tags">
                                        ${fab.tags.map(tag => `<span class="fabric-tag">${tag}</span>`).join('')}
                                    </div>
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
                    <div style="padding:56px 0 40px;border-bottom:1px solid var(--border);margin-bottom:40px;">
                        <div class="hero-eyebrow">Production Network · Seongsu</div>
                        <h2 class="page-title">Factory <em>Matcher</em></h2>
                        <p style="font-size:0.88rem;color:var(--text-muted);max-width:440px;line-height:1.7;font-weight:300;">성수동 일대 고품질 디자이너 봉제 공장 및 소량 생산 라인 매칭 서비스.</p>
                    </div>
                    
                    <div class="matcher-grid">
                        ${state.manufacturers.map(fac => `
                            <div class="matcher-card">
                                <div class="matcher-name">${fac.name}</div>
                                <div class="matcher-location"><i class="fas fa-location-dot"></i>&nbsp; ${fac.location}</div>
                                <div class="matcher-specs">
                                    <div class="matcher-spec-item">
                                        <span class="matcher-spec-label">Min Order</span>
                                        <span class="matcher-spec-value">${fac.moq}벌</span>
                                    </div>
                                    <div class="matcher-spec-item">
                                        <span class="matcher-spec-label">Lead Time</span>
                                        <span class="matcher-spec-value">${fac.leadTime}</span>
                                    </div>
                                </div>
                                <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:20px;line-height:1.5;">
                                    <span style="font-weight:600;color:var(--text-main);">전문 분야 —</span> ${fac.specialty}
                                </div>
                                <button class="btn btn-primary" style="width:100%;" onclick="alert('${fac.name} 연결: ${fac.contact}')">
                                    <i class="fas fa-arrow-right"></i>&nbsp; 소싱 라인 문의
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
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
        nav.innerHTML = '<gyeol-nav></gyeol-nav>';
    }
}

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// --- Entry Point On Dom Content Loaded ---
document.addEventListener('DOMContentLoaded', async () => {
    // Load local storage fallback
    loadLocalState();
    
    // Apply initial theme
    if (state.theme === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
    
    // Init Firebase
    await initFirebase();
    
    // Initial Route navigation
    router.navigate('home');
    
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
        logoBtn.onclick = () => router.navigate('home');
    }
    
    // Splash screen fadeout
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('fade-out');
            setTimeout(() => splash.remove(), 1000);
        }
    }, 2000);
});
