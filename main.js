// Product Data
const PRODUCTS = [
    {
        id: 'santal-01',
        name: 'SANTAL 01',
        price: 138000,
        priceFormatted: '₩138,000',
        image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
        desc: '따스한 햇살이 머무는 숲, 샌달우드의 깊은 잔향',
        details: '샌달우드의 따스한 온기와 스파이시한 카다멈이 조화를 이루며 시작됩니다. 시간이 지날수록 부드러운 머스크와 대지의 흙내음이 어우러져, 마치 안개 낀 숲속을 거니는 듯한 신비로운 잔향을 남깁니다. 산탈리스의 시그니처 향기로, 당신의 일상에 깊은 고요와 평온을 선사합니다.',
        notes: 'Top: Cardamom, Papyrus / Heart: Iris, Violet / Base: Sandalwood, Cedarwood, Leather'
    },
    {
        id: 'flowered-dusk',
        name: 'FLOWERED DUSK',
        price: 125000,
        priceFormatted: '₩125,000',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
        desc: '정원의 푸르름과 야생화가 어우러진 우아함',
        details: '해 질 녘, 보랏빛으로 물든 정원의 서늘한 공기를 담았습니다. 갓 피어난 생생한 플로럴 노트 뒤로 쌉싸름한 풀잎의 향이 뒤따르며, 반전 있는 매력을 드러냅니다. 우아하면서도 야성적인 매력을 동시에 지닌 이 향기는 특별한 저녁, 당신의 존재감을 더욱 빛나게 합니다.',
        notes: 'Top: Bergamot, Green Leaf / Heart: Rose, Jasmine / Base: Patchouli, Amber'
    },
    {
        id: 'morning-clay',
        name: 'MORNING CLAY',
        price: 118000,
        priceFormatted: '₩118,000',
        image: 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800',
        desc: '이슬 머금은 대지와 아침 공기의 청량함',
        details: '비가 그친 뒤, 젖은 땅에서 올라오는 대지의 생명력을 표현했습니다. 미네랄의 청량함과 촉촉한 흙의 질감이 어우러져 머리를 맑게 깨워줍니다. 화려하지 않지만 정직하고 순수한 자연의 향기로, 하루를 시작하는 가장 완벽한 리추얼을 제안합니다.',
        notes: 'Top: Sea Salt, Ozonic / Heart: Sage, Earthy Clay / Base: White Musk, Moss'
    }
];

// Shopping Cart State
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('santalys_cart')) || [];
        this.updateCartCount();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        this.save();
        this.updateCartUI();
        this.showNotification(`${product.name}이(가) 장바구니에 담겼습니다.`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            this.updateCartUI();
        }
    }

    save() {
        localStorage.setItem('santalys_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const countElements = document.querySelectorAll('.cart-count');
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    updateCartUI() {
        const container = document.querySelector('.cart-items');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = '<p class="cart-empty">장바구니가 비어 있습니다.</p>';
            document.querySelector('.cart-total-value').textContent = '₩0';
            return;
        }

        let total = 0;
        container.innerHTML = this.items.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₩${(item.price * item.quantity).toLocaleString()}</div>
                        <div class="cart-item-controls">
                            <button onclick="window.cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="window.cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            <button class="cart-item-remove" onclick="window.cart.removeItem('${item.id}')">삭제</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelector('.cart-total-value').textContent = `₩${total.toLocaleString()}`;
    }

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('visible'), 100);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
}

// Global Cart Instance
window.cart = new Cart();

// Mobile Menu Logic
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');
    const navItems = document.querySelectorAll('.nav__links a');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : 'auto';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Hero Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    if (!slides.length) return;

    let currentSlide = 0;
    const slideInterval = 5000;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
}

// Cart Drawer Logic
function initCartDrawer() {
    const cartToggle = document.querySelector('.nav__cart');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartClose = document.querySelector('.cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');

    if (!cartToggle || !cartDrawer) return;

    const openCart = () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        window.cart.updateCartUI();
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// Product Detail Logic
function showProductDetail(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.querySelector('.detail-overlay');
    const container = document.querySelector('.detail-container');

    container.innerHTML = `
        <div class="detail-content">
            <button class="detail-close" aria-label="Close detail view">&times;</button>
            <div class="detail-grid">
                <div class="detail-image-section">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info-section">
                    <h2 class="detail-name">${product.name}</h2>
                    <p class="detail-desc-short">${product.desc}</p>
                    <div class="detail-price">${product.priceFormatted}</div>
                    
                    <div class="detail-long-desc">
                        <p>${product.details}</p>
                    </div>

                    <div class="detail-notes">
                        <h4>Scent Notes</h4>
                        <p>${product.notes}</p>
                    </div>

                    <div class="detail-actions">
                        <button class="btn btn--primary btn--buy-now" onclick="alert('구매 페이지로 이동합니다 (데모)');">BUY NOW</button>
                        <button class="btn btn--secondary btn--add-cart" onclick="window.cart.addItem({id:'${product.id}', name:'${product.name}', price:${product.price}, image:'${product.image}'})">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    container.querySelector('.detail-close').onclick = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
}

// Product Card Web Component
class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const id = this.getAttribute('product-id');
        const name = this.getAttribute('name');
        const price = this.getAttribute('price');
        const image = this.getAttribute('image');
        const desc = this.getAttribute('desc');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                :host(.visible) {
                    opacity: 1;
                    transform: translateY(0);
                }
                .card {
                    cursor: pointer;
                    overflow: hidden;
                    position: relative;
                }
                .image-container {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/5;
                    overflow: hidden;
                    background: #f0f0f0;
                    margin-bottom: 1.5rem;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .card:hover img {
                    transform: scale(1.05);
                }
                .info {
                    text-align: left;
                }
                .name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.5rem;
                    margin-bottom: 0.2rem;
                }
                .desc {
                    font-size: 0.8rem;
                    opacity: 0.5;
                    letter-spacing: 0.05rem;
                    margin-bottom: 0.8rem;
                }
                .price {
                    font-size: 0.9rem;
                    font-weight: 500;
                    letter-spacing: 0.1rem;
                }
                .view-more {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(255,255,255,0.8);
                    padding: 0.5rem 1rem;
                    font-size: 0.7rem;
                    letter-spacing: 0.1rem;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                }
                .card:hover .view-more {
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>
            <div class="card" onclick="window.showDetail('${id}')">
                <div class="image-container">
                    <img src="${image}" alt="${name}" loading="lazy">
                    <div class="view-more">VIEW DETAIL</div>
                </div>
                <div class="info">
                    <div class="name">${name}</div>
                    <div class="desc">${desc}</div>
                    <div class="price">${price}</div>
                </div>
            </div>
        `;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.classList.add('visible');
                    observer.unobserve(this);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this);
    }
}

customElements.define('product-card', ProductCard);
window.showDetail = showProductDetail;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileMenu();
    initCartDrawer();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
