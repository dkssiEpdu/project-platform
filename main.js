class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
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
            </style>
            <div class="card">
                <div class="image-container">
                    <img src="${image}" alt="${name}" loading="lazy">
                </div>
                <div class="info">
                    <div class="name">${name}</div>
                    <div class="desc">${desc}</div>
                    <div class="price">${price}</div>
                </div>
            </div>
        `;

        // Intersection Observer for scroll reveal
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

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero__background');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
