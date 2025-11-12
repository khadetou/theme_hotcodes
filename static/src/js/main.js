/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.HotCodesHeader = publicWidget.Widget.extend({
    selector: '.s_hotcodes_header',
    disabledInEditableMode: false,

    start: function() {
        this._super(...arguments);

        this.Motion = this._loadMotion();

        // Disable Bootstrap click behavior
        this._disableBootstrapDropdowns();

        if (this.editableMode || this.$el.hasClass('o_editable')) {
            return;
        }

        // If Motion.js is not available, show content immediately without animations
        if (!this.Motion) {
            this._showContentWithoutAnimations();
            this._initScrollEffects();
            return;
        }

        const { animate, stagger } = this.Motion;
        this._initAnimations(animate, stagger);
        this._initDropdownAnimations(animate, stagger);
        this._initScrollEffects();
    },

    _showContentWithoutAnimations: function() {
        // Fallback: show all content immediately if Motion.js fails to load
        const elementsToShow = this.el.querySelectorAll(
            '.hotcodes-navbar, .hero-title, .hero-subtitle, .hero-actions .btn'
        );
        elementsToShow.forEach(el => {
            el.classList.add('loaded');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    },

    destroy: function() {
        this.el.querySelectorAll('.hero-title, .hero-subtitle, .btn, .dropdown-card').forEach(el => {
            el.style.opacity = '';
            el.style.transform = '';
        });
        this._super(...arguments);
    },

    _loadMotion: function() {
        if (!window.Motion || !window.Motion.animate) return null;
        const Motion = window.Motion;
        if (!Motion.stagger) {
            Motion.stagger = function(duration) {
                return function(index) { return index * duration; };
            };
        }
        return Motion;
    },

    _disableBootstrapDropdowns: function() {
        this.el.querySelectorAll('.mega-dropdown > .dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('data-bs-toggle', 'disabled');
            toggle.addEventListener('click', (e) => e.preventDefault());
        });
    },

    _initAnimations: function(animate, stagger) {
        const navbar = this.el.querySelector('.hotcodes-navbar');
        const heroTitle = this.el.querySelector('.hero-title');
        const heroSubtitle = this.el.querySelector('.hero-subtitle');
        const heroButtons = this.el.querySelectorAll('.hero-actions .btn');

        // Navbar - add loaded class immediately, then animate
        if (navbar) {
            navbar.classList.add('loaded');
            animate(
                navbar,
                { y: [-100, 0], opacity: [0, 1] },
                { duration: 0.8, easing: [0.22, 0.61, 0.36, 1] }
            );
        }

        // Hero title - split into characters and animate
        const titleElements = this.el.querySelectorAll('.gradient-text');
        titleElements.forEach((el, index) => {
            const text = el.textContent;
            el.innerHTML = text.split('').map(char =>
                `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');

            const chars = el.querySelectorAll('.char');
            animate(
                chars,
                { opacity: [0, 1], y: [40, 0] },
                {
                    duration: 0.7,
                    delay: stagger(0.03, { start: 0.2 + (index * 0.15) }),
                    easing: [0.25, 0.1, 0.25, 1]
                }
            ).finished.then(() => {
                chars.forEach(char => char.classList.add('loaded'));
            });
        });

        if (heroTitle) {
            heroTitle.classList.add('loaded');
        }

        // Subtitle
        if (heroSubtitle) {
            heroSubtitle.classList.add('loaded');
            animate(
                heroSubtitle,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.8, delay: 0.8, easing: 'ease-out' }
            );
        }

        // Buttons
        if (heroButtons.length) {
            animate(
                heroButtons,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.6, delay: stagger(0.1, { start: 1 }) }
            ).finished.then(() => {
                heroButtons.forEach(btn => btn.classList.add('loaded'));
            });
        }
    },

    _initDropdownAnimations: function(animate, stagger) {
        // Dropdowns now work purely with CSS hover states
        // This function only adds the stagger animation for cards when dropdown is hovered
        this.el.querySelectorAll('.mega-dropdown').forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            const cards = dropdown.querySelectorAll('.dropdown-card');

            if (!menu || !cards.length) return;

            let isAnimating = false;

            const animateCards = () => {
                if (isAnimating) return;
                isAnimating = true;

                // Animate cards with stagger effect
                animate(cards,
                    { opacity: [0, 1], y: [8, 0] },
                    {
                        duration: 0.3,
                        delay: stagger(0.04, { start: 0.05 }),
                        easing: [0.4, 0, 0.2, 1]
                    }
                ).finished.then(() => {
                    // Reset animation flag after a delay to allow re-triggering
                    setTimeout(() => { isAnimating = false; }, 500);
                });
            };

            // Trigger card animation when dropdown is hovered
            dropdown.addEventListener('mouseenter', animateCards);
        });
    },

    _initScrollEffects: function() {
        const navbar = this.el.querySelector('.hotcodes-navbar');
        let ticking = false;

        const updateNavbar = () => {
            const current = window.pageYOffset;

            if (!navbar) return;

            // Smooth background opacity transition (Framer-style)
            // Gradually increase opacity from 0.7 to 0.95 as user scrolls
            const bgOpacity = Math.min(current / 300, 0.25);
            navbar.style.backgroundColor = `rgba(10, 10, 10, ${0.7 + bgOpacity})`;

            // Add subtle shadow when scrolling past hero section
            if (current > 50) {
                const shadowOpacity = Math.min(current / 200, 0.5);
                navbar.style.boxShadow = `0 1px 0 rgba(255, 255, 255, 0.06), 0 4px 24px rgba(0, 0, 0, ${0.2 + shadowOpacity * 0.3})`;
            } else {
                navbar.style.boxShadow = '0 1px 0 rgba(255, 255, 255, 0.06)';
            }

            // Always keep navbar visible (no auto-hide like Framer)
            navbar.style.transform = 'translateY(0)';

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });

        // Initial call to set proper state
        updateNavbar();
    }
});

export default publicWidget.registry.HotCodesHeader;