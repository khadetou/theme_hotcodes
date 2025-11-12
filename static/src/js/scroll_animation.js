/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.ScrollAnimationSection = publicWidget.Widget.extend({
    selector: '.hotcodes-scroll-section',
    
    start: function() {
        this._super.apply(this, arguments);
        console.log('ScrollAnimationSection widget initialized');

        // FRAMER-STYLE APPROACH: Only enable scroll animations on desktop (>1024px)
        this.isDesktop = window.innerWidth > 1024;
        this.scrollAnimationsEnabled = false;

        // Initialize or destroy animations based on screen size
        this._handleResponsiveInit();

        // Re-check on resize and reinitialize if needed
        this._resizeHandler = this._debounce(() => {
            const wasDesktop = this.isDesktop;
            this.isDesktop = window.innerWidth > 1024;

            // If screen size category changed, reinitialize
            if (wasDesktop !== this.isDesktop) {
                console.log(`Screen size changed: ${this.isDesktop ? 'Desktop' : 'Mobile/Tablet'} mode`);
                this._handleResponsiveInit();
            }
        }, 250);

        window.addEventListener('resize', this._resizeHandler);
    },

    /**
     * Initialize or destroy scroll animations based on screen size
     * Framer-style: Desktop = scroll animations, Mobile/Tablet = static stacked cards
     */
    _handleResponsiveInit: function() {
        if (this.isDesktop && !this.scrollAnimationsEnabled) {
            // Desktop: Enable scroll animations
            console.log('Initializing scroll animations for desktop');
            setTimeout(() => {
                try {
                    this._initScrollAnimation();
                    this._initProgressIndicator();
                    this._initProgressIndicatorVisibility();
                    this.scrollAnimationsEnabled = true;
                    console.log('Scroll animations initialized successfully');
                } catch (error) {
                    console.error('Error initializing scroll animations:', error);
                }
            }, 100);
        } else if (!this.isDesktop && this.scrollAnimationsEnabled) {
            // Mobile/Tablet: Disable scroll animations and cleanup
            console.log('Disabling scroll animations for mobile/tablet');
            this._cleanupScrollAnimations();
            this.scrollAnimationsEnabled = false;
        } else if (!this.isDesktop) {
            // Mobile/Tablet on initial load: Show static content
            console.log('Mobile/Tablet mode: Showing static stacked cards');
            this._initStaticMobileView();
        }
    },

    /**
     * Initialize static mobile view (all states visible)
     */
    _initStaticMobileView: function() {
        const section = this.el;
        const textStates = section.querySelectorAll('.scroll-state');

        // Make all states visible on mobile
        textStates.forEach(state => {
            state.classList.add('active');
        });
    },

    /**
     * Cleanup scroll animations
     */
    _cleanupScrollAnimations: function() {
        if (this._scrollCleanup) {
            this._scrollCleanup();
        }
        if (this._indicatorCleanup) {
            this._indicatorCleanup();
        }
    },

    /**
     * Debounce utility
     */
    _debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Initialize scroll-linked animations (DESKTOP ONLY)
     */
    _initScrollAnimation: function() {
        // Only run on desktop
        if (!this.isDesktop) {
            console.log('Skipping scroll animations on mobile/tablet');
            return;
        }

        const section = this.el;
        const textStates = section.querySelectorAll('.scroll-state');
        const visualStates = section.querySelectorAll('.scroll-visual');
        const progressDots = section.querySelectorAll('.progress-dot');

        if (!textStates.length || !visualStates.length) {
            console.warn('No states found for scroll animation');
            return;
        }

        const totalStates = textStates.length;
        let currentState = 0;
        let isAnimating = false;

        // Initialize first state
        textStates[0].classList.add('active');
        visualStates[0].classList.add('active');
        if (progressDots.length > 0) {
            progressDots[0].classList.add('active');
        }

        // Calculate scroll progress through the section (DESKTOP ONLY)
        const getScrollProgress = () => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Desktop: When section top is at viewport top = 0
            // When section bottom is at viewport bottom = 1
            const scrolled = Math.max(0, -rect.top);
            const scrollableHeight = sectionHeight - viewportHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

            return progress;
        };

        // Update state based on progress
        const updateState = () => {
            const progress = getScrollProgress();

            // Calculate state index (0 to 3 for 4 states)
            // Improved calculation to ensure last state is reachable
            let stateIndex;
            if (progress >= 0.95) {
                // Ensure last state is shown when near the bottom
                stateIndex = totalStates - 1;
            } else {
                // Distribute states evenly across scroll progress
                stateIndex = Math.floor(progress * totalStates);
                stateIndex = Math.min(stateIndex, totalStates - 1);
            }

            // Only update if state changed
            if (stateIndex !== currentState && !isAnimating) {
                console.log(`State change: ${currentState} → ${stateIndex} (progress: ${progress.toFixed(2)})`);
                isAnimating = true;

                this._transitionToState(stateIndex, textStates, visualStates, progressDots);

                // Debounce rapid state changes
                setTimeout(() => {
                    isAnimating = false;
                }, 400);

                currentState = stateIndex;
            }
        };

        // Throttled scroll handler
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateState);
                ticking = true;
                setTimeout(() => { ticking = false; }, 16); // ~60fps
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateState(); // Initial call

        // Store cleanup function
        this._scrollCleanup = () => {
            window.removeEventListener('scroll', onScroll);
        };
    },

    /**
     * Transition to specific state
     */
    _transitionToState: function(stateIndex, textStates, visualStates, progressDots) {
        // Update text states
        textStates.forEach((state, index) => {
            if (index === stateIndex) {
                state.classList.add('active');
                // Animate heading text with Motion.js
                this._animateHeadingText(state);
            } else {
                state.classList.remove('active');
            }
        });

        // Update visual states
        visualStates.forEach((visual, index) => {
            if (index === stateIndex) {
                visual.classList.add('active');
                // Animate performance bars if present
                this._animatePerformanceBars(visual);
            } else {
                visual.classList.remove('active');
            }
        });

        // Update progress dots
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === stateIndex);
        });
    },

    /**
     * Animate performance bars when visual becomes active
     */
    _animatePerformanceBars: function(visual) {
        const Motion = this._loadMotion();
        const bars = visual.querySelectorAll('.perf-bar');
        
        if (bars.length && Motion) {
            bars.forEach((bar, index) => {
                const fill = bar.querySelector('::after') || bar;
                const width = bar.dataset.width || ['96%', '89%', '94%'][index];
                
                setTimeout(() => {
                    Motion.animate(
                        fill,
                        { width: width },
                        { duration: 1.5, easing: [0.4, 0, 0.2, 1] }
                    );
                }, index * 100);
            });
        }
    },

    /**
     * Animate heading text with Motion.js (futuristic staggered effect)
     */
    _animateHeadingText: function(state) {
        const Motion = this._loadMotion();
        const heading = state.querySelector('.scroll-heading');
        if (!heading) return;

        // Split text into words for staggered animation
        const text = heading.textContent.trim();
        const words = text.split(' ');

        // Only split if not already split
        if (!heading.dataset.animated) {
            heading.innerHTML = words.map(word =>
                `<span class="word">${word}</span>`
            ).join(' ');
            heading.dataset.animated = 'true';
        }

        // If Motion.js is available, animate the words
        if (Motion) {
            const wordElements = heading.querySelectorAll('.word');

            // Reset opacity first
            wordElements.forEach(word => {
                word.style.opacity = '0';
            });

            // Animate words with stagger
            Motion.animate(
                wordElements,
                {
                    opacity: [0, 1],
                    y: [20, 0],
                    filter: ['blur(4px)', 'blur(0px)']
                },
                {
                    duration: 0.8,
                    delay: Motion.stagger(0.08),
                    easing: [0.22, 1, 0.36, 1] // Smooth spring-like easing
                }
            );
        }
    },

    /**
     * Initialize progress indicator click handlers (DESKTOP ONLY)
     */
    _initProgressIndicator: function() {
        // Only run on desktop
        if (!this.isDesktop) {
            return;
        }

        const section = this.el;
        const progressDots = section.querySelectorAll('.progress-dot');
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const sectionTop = section.offsetTop;
                const scrollableHeight = sectionHeight - viewportHeight;
                const targetScroll = sectionTop + (scrollableHeight * index / progressDots.length);

                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            });
        });
    },

    /**
     * Show/hide progress indicator based on scroll section visibility (DESKTOP ONLY)
     */
    _initProgressIndicatorVisibility: function() {
        // Only run on desktop
        if (!this.isDesktop) {
            return;
        }

        const section = this.el;
        const progressIndicator = section.querySelector('.scroll-progress-indicator');

        if (!progressIndicator) {
            console.warn('Progress indicator not found');
            return;
        }

        const updateIndicatorVisibility = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Show indicator when section is in viewport
            // Hide when scrolled past (either above or below)
            const isInViewport = rect.top < viewportHeight && rect.bottom > 0;

            if (isInViewport) {
                progressIndicator.classList.add('visible');
            } else {
                progressIndicator.classList.remove('visible');
            }
        };

        // Throttled scroll handler for indicator visibility
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateIndicatorVisibility);
                ticking = true;
                setTimeout(() => { ticking = false; }, 16);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateIndicatorVisibility(); // Initial call

        // Store cleanup function
        this._indicatorCleanup = () => {
            window.removeEventListener('scroll', onScroll);
        };
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

    destroy: function() {
        // Cleanup scroll animations
        this._cleanupScrollAnimations();

        // Cleanup resize handler
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
        }

        this._super.apply(this, arguments);
    }
});

export default publicWidget.registry.ScrollAnimationSection;