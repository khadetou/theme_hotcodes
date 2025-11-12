/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Text Animation Widget
 * Adds Motion.js animations to text elements throughout the theme
 * Features: fade-in, slide-up, blur effects, staggered animations, spring-like easing
 */
publicWidget.registry.TextAnimations = publicWidget.Widget.extend({
    selector: 'body',
    
    start: function() {
        this._super.apply(this, arguments);
        console.log('TextAnimations widget initialized');

        // Load Motion.js
        this.Motion = this._loadMotion();
        if (!this.Motion) {
            console.warn('Motion.js not available, skipping text animations');
            return;
        }

        // Initialize animations after a short delay to ensure DOM is ready
        setTimeout(() => {
            this._initTextAnimations();
            this._initScrollAnimations();
        }, 100);
    },

    /**
     * Load Motion.js safely
     */
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

    /**
     * Initialize text animations for various elements
     */
    _initTextAnimations: function() {
        const { animate, stagger } = this.Motion;

        // Animate headings (h1, h2, h3) with fade-in and slide-up
        this._animateHeadings(animate, stagger);

        // Animate paragraphs with subtle fade-in
        this._animateParagraphs(animate, stagger);

        // Animate buttons and CTAs
        this._animateButtons(animate, stagger);

        // Animate list items
        this._animateListItems(animate, stagger);

        // Animate cards and sections
        this._animateCards(animate, stagger);
    },

    /**
     * Animate headings with staggered word animation
     */
    _animateHeadings: function(animate, stagger) {
        const headings = document.querySelectorAll('h1:not(.animated), h2:not(.animated), h3:not(.animated)');
        
        headings.forEach((heading, headingIndex) => {
            // Skip if already animated or in editable mode
            if (heading.classList.contains('animated') || heading.closest('.o_editable')) {
                return;
            }

            // Mark as animated
            heading.classList.add('animated');

            // Split text into words
            const text = heading.textContent.trim();
            const words = text.split(' ');

            // Only split if there are multiple words
            if (words.length > 1) {
                heading.innerHTML = words.map(word =>
                    `<span class="word" style="display: inline-block;">${word}</span>`
                ).join(' ');

                const wordElements = heading.querySelectorAll('.word');

                // Animate words with stagger
                animate(
                    wordElements,
                    {
                        opacity: [0, 1],
                        y: [30, 0],
                        filter: ['blur(8px)', 'blur(0px)']
                    },
                    {
                        duration: 0.8,
                        delay: stagger(0.1, { start: headingIndex * 0.1 }),
                        easing: [0.22, 1, 0.36, 1] // Spring-like easing
                    }
                );
            } else {
                // Single word - simple fade-in
                animate(
                    heading,
                    {
                        opacity: [0, 1],
                        y: [20, 0]
                    },
                    {
                        duration: 0.6,
                        delay: headingIndex * 0.1,
                        easing: [0.22, 1, 0.36, 1]
                    }
                );
            }
        });
    },

    /**
     * Animate paragraphs with subtle fade-in
     */
    _animateParagraphs: function(animate, stagger) {
        const paragraphs = document.querySelectorAll('p:not(.animated)');
        
        paragraphs.forEach((p, index) => {
            // Skip if already animated or in editable mode
            if (p.classList.contains('animated') || p.closest('.o_editable')) {
                return;
            }

            p.classList.add('animated');

            animate(
                p,
                {
                    opacity: [0, 1],
                    y: [15, 0]
                },
                {
                    duration: 0.6,
                    delay: 0.2 + (index * 0.05),
                    easing: 'ease-out'
                }
            );
        });
    },

    /**
     * Animate buttons with bounce effect
     */
    _animateButtons: function(animate, stagger) {
        const buttons = document.querySelectorAll('.btn:not(.animated), a.btn-primary:not(.animated)');
        
        buttons.forEach((btn, index) => {
            // Skip if already animated or in editable mode
            if (btn.classList.contains('animated') || btn.closest('.o_editable')) {
                return;
            }

            btn.classList.add('animated');

            animate(
                btn,
                {
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    y: [20, 0]
                },
                {
                    duration: 0.5,
                    delay: 0.3 + (index * 0.1),
                    easing: [0.34, 1.56, 0.64, 1] // Bounce easing
                }
            );
        });
    },

    /**
     * Animate list items with stagger
     */
    _animateListItems: function(animate, stagger) {
        const lists = document.querySelectorAll('ul:not(.animated), ol:not(.animated)');
        
        lists.forEach(list => {
            // Skip if already animated or in editable mode
            if (list.classList.contains('animated') || list.closest('.o_editable')) {
                return;
            }

            list.classList.add('animated');
            const items = list.querySelectorAll('li');

            animate(
                items,
                {
                    opacity: [0, 1],
                    x: [-20, 0]
                },
                {
                    duration: 0.5,
                    delay: stagger(0.08),
                    easing: [0.22, 1, 0.36, 1]
                }
            );
        });
    },

    /**
     * Animate cards and sections
     */
    _animateCards: function(animate, stagger) {
        const cards = document.querySelectorAll('.card:not(.animated), .section:not(.animated)');
        
        cards.forEach((card, index) => {
            // Skip if already animated or in editable mode
            if (card.classList.contains('animated') || card.closest('.o_editable')) {
                return;
            }

            card.classList.add('animated');

            animate(
                card,
                {
                    opacity: [0, 1],
                    y: [40, 0],
                    scale: [0.95, 1]
                },
                {
                    duration: 0.7,
                    delay: index * 0.15,
                    easing: [0.22, 1, 0.36, 1]
                }
            );
        });
    },

    /**
     * Initialize scroll-triggered animations using Intersection Observer
     */
    _initScrollAnimations: function() {
        const { animate } = this.Motion;

        // Elements to animate on scroll
        const scrollElements = document.querySelectorAll('[data-animate-on-scroll]');

        if (!scrollElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('scroll-animated')) {
                    entry.target.classList.add('scroll-animated');

                    animate(
                        entry.target,
                        {
                            opacity: [0, 1],
                            y: [50, 0]
                        },
                        {
                            duration: 0.8,
                            easing: [0.22, 1, 0.36, 1]
                        }
                    );
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        scrollElements.forEach(el => observer.observe(el));

        // Store observer for cleanup
        this._scrollObserver = observer;
    },

    /**
     * Cleanup
     */
    destroy: function() {
        if (this._scrollObserver) {
            this._scrollObserver.disconnect();
        }
        this._super.apply(this, arguments);
    }
});

export default publicWidget.registry.TextAnimations;

