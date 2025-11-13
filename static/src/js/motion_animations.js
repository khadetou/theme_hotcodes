/** @odoo-module **/

/**
 * Motion.js Animations for Hotcodes Theme
 * Using Motion One (https://motion.dev/)
 * 
 * USAGE GUIDE:
 * 
 * 1. TEXT ANIMATIONS:
 *    <h1 data-motion="text-reveal">Character by character</h1>
 *    <h2 data-motion="word-reveal">Word by word animation</h2>
 *    <span data-motion="gradient-text" style="background: linear-gradient(90deg, #FF6B35, #8A2BE2); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Animated Gradient</span>
 * 
 * 2. BUTTON EFFECTS:
 *    <button data-motion="flare">Flare on hover</button>
 *    <button data-motion="magnetic" data-magnetic-strength="0.5">Magnetic button</button>
 * 
 * 3. SCROLL ANIMATIONS:
 *    <div data-motion="scroll-fade">Fade in on scroll</div>
 *    <div data-motion="scroll-scale">Scale in on scroll</div>
 *    <div data-motion="scroll-stagger"><div>Item 1</div><div>Item 2</div></div>
 *    <img data-motion="parallax" data-parallax-speed="0.5" src="..."/>
 * 
 * 4. CARD EFFECTS:
 *    <div data-motion="card-tilt" style="transform-style: preserve-3d;">3D tilt card</div>
 * 
 * 5. COUNTERS:
 *    <span data-motion="counter" data-counter-target="500" data-counter-suffix="+" data-counter-duration="2">0</span>
 * 
 * 6. SHAPES:
 *    <div data-motion="morph-blob" style="width: 200px; height: 200px; background: #FF6B35;">Morphing blob</div>
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // Check if Motion is available
        if (typeof Motion === 'undefined' && typeof motion === 'undefined') {
            console.warn('⚠️ Motion.js not loaded. Animations disabled.');
            return;
        }

        // Use the global motion object
        const { animate, stagger, inView, scroll } = window.Motion || window.motion;

        // ========================================
        // 1. TEXT REVEAL ANIMATIONS
        // ========================================

        function initTextReveal() {
            const textElements = document.querySelectorAll('[data-motion="text-reveal"]');
            
            textElements.forEach(element => {
                const text = element.textContent;
                element.innerHTML = '';
                
                // Split into characters
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.display = 'inline-block';
                    element.appendChild(span);
                });

                // Animate characters
                animate(
                    element.querySelectorAll('span'),
                    { 
                        opacity: [0, 1],
                        y: [20, 0],
                        rotateX: [90, 0]
                    },
                    { 
                        duration: 0.5,
                        delay: stagger(0.03),
                        easing: [0.22, 0.03, 0.26, 1]
                    }
                );
            });
        }

        function initWordReveal() {
            const wordElements = document.querySelectorAll('[data-motion="word-reveal"]');
            
            wordElements.forEach(element => {
                const text = element.textContent;
                element.innerHTML = '';
                
                // Split into words
                text.split(' ').forEach((word, index) => {
                    const span = document.createElement('span');
                    span.textContent = word;
                    span.style.display = 'inline-block';
                    span.style.marginRight = '0.3em';
                    element.appendChild(span);
                });

                // Animate words
                animate(
                    element.querySelectorAll('span'),
                    { 
                        opacity: [0, 1],
                        y: [30, 0],
                        scale: [0.8, 1]
                    },
                    { 
                        duration: 0.6,
                        delay: stagger(0.1),
                        easing: 'ease-out'
                    }
                );
            });
        }

        function initGradientText() {
            const gradientTexts = document.querySelectorAll('[data-motion="gradient-text"]');
            
            gradientTexts.forEach(element => {
                animate(
                    element,
                    {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    },
                    {
                        duration: 3,
                        repeat: Infinity,
                        easing: 'linear'
                    }
                );
            });
        }

        // ========================================
        // 2. FLARE / SHINE EFFECTS
        // ========================================

        function initFlareEffect() {
            const flareButtons = document.querySelectorAll('[data-motion="flare"]');
            
            flareButtons.forEach(button => {
                // Create flare element
                const flare = document.createElement('div');
                flare.className = 'motion-flare';
                flare.style.cssText = `
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
                    pointer-events: none;
                    transform: translateX(-100%) translateY(-100%) rotate(45deg);
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(flare);

                // Animate on hover
                button.addEventListener('mouseenter', () => {
                    animate(
                        flare,
                        {
                            transform: [
                                'translateX(-100%) translateY(-100%) rotate(45deg)',
                                'translateX(100%) translateY(100%) rotate(45deg)'
                            ]
                        },
                        {
                            duration: 0.6,
                            easing: 'ease-out'
                        }
                    );
                });
            });
        }

        // ========================================
        // 3. SCROLL-TRIGGERED ANIMATIONS
        // ========================================

        function initScrollFade() {
            const fadeElements = document.querySelectorAll('[data-motion="scroll-fade"]');
            
            fadeElements.forEach(element => {
                inView(element, ({ target }) => {
                    animate(
                        target,
                        { 
                            opacity: [0, 1],
                            y: [50, 0]
                        },
                        { 
                            duration: 0.8,
                            easing: [0.22, 0.03, 0.26, 1]
                        }
                    );
                });
            });
        }

        function initScrollScale() {
            const scaleElements = document.querySelectorAll('[data-motion="scroll-scale"]');
            
            scaleElements.forEach(element => {
                inView(element, ({ target }) => {
                    animate(
                        target,
                        { 
                            opacity: [0, 1],
                            scale: [0.8, 1]
                        },
                        { 
                            duration: 0.6,
                            easing: 'ease-out'
                        }
                    );
                });
            });
        }

        function initScrollStagger() {
            const staggerContainers = document.querySelectorAll('[data-motion="scroll-stagger"]');
            
            staggerContainers.forEach(container => {
                const children = container.children;
                
                inView(container, () => {
                    animate(
                        children,
                        { 
                            opacity: [0, 1],
                            y: [30, 0]
                        },
                        { 
                            duration: 0.5,
                            delay: stagger(0.1),
                            easing: 'ease-out'
                        }
                    );
                });
            });
        }

        function initParallax() {
            const parallaxElements = document.querySelectorAll('[data-motion="parallax"]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallaxSpeed || 0.5;
                
                scroll(
                    animate(element, {
                        y: [0, -100 * speed]
                    }),
                    { target: element }
                );
            });
        }

        // ========================================
        // 4. MAGNETIC BUTTONS
        // ========================================

        function initMagneticButtons() {
            const magneticButtons = document.querySelectorAll('[data-motion="magnetic"]');
            
            magneticButtons.forEach(button => {
                const strength = parseFloat(button.dataset.magneticStrength) || 0.3;
                
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    animate(
                        button,
                        {
                            x: x * strength,
                            y: y * strength
                        },
                        {
                            duration: 0.3,
                            easing: 'ease-out'
                        }
                    );
                });
                
                button.addEventListener('mouseleave', () => {
                    animate(
                        button,
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            duration: 0.5,
                            easing: [0.22, 0.03, 0.26, 1]
                        }
                    );
                });
            });
        }

        // ========================================
        // 5. CARD HOVER EFFECTS
        // ========================================

        function initCardTilt() {
            const tiltCards = document.querySelectorAll('[data-motion="card-tilt"]');
            
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    animate(
                        card,
                        {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            scale: 1.05
                        },
                        {
                            duration: 0.3,
                            easing: 'ease-out'
                        }
                    );
                });
                
                card.addEventListener('mouseleave', () => {
                    animate(
                        card,
                        {
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1
                        },
                        {
                            duration: 0.5,
                            easing: [0.22, 0.03, 0.26, 1]
                        }
                    );
                });
            });
        }

        // ========================================
        // 6. COUNTER ANIMATIONS
        // ========================================

        function initCounters() {
            const counters = document.querySelectorAll('[data-motion="counter"]');
            
            counters.forEach(counter => {
                const target = parseFloat(counter.dataset.counterTarget) || 100;
                const duration = parseFloat(counter.dataset.counterDuration) || 2;
                const suffix = counter.dataset.counterSuffix || '';
                const prefix = counter.dataset.counterPrefix || '';
                
                inView(counter, () => {
                    animate(
                        (progress) => {
                            const value = Math.floor(progress * target);
                            counter.textContent = prefix + value + suffix;
                        },
                        {
                            duration: duration,
                            easing: 'ease-out'
                        }
                    );
                });
            });
        }

        // ========================================
        // 7. MORPHING SHAPES
        // ========================================

        function initMorphingBlobs() {
            const blobs = document.querySelectorAll('[data-motion="morph-blob"]');
            
            blobs.forEach(blob => {
                const shapes = [
                    '40% 60% 70% 30% / 40% 50% 60% 50%',
                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '70% 30% 30% 70% / 60% 40% 60% 40%'
                ];
                
                animate(
                    blob,
                    {
                        borderRadius: shapes
                    },
                    {
                        duration: 10,
                        repeat: Infinity,
                        easing: 'ease-in-out'
                    }
                );
            });
        }

        // ========================================
        // INITIALIZE ALL ANIMATIONS
        // ========================================

        try {
            initTextReveal();
            initWordReveal();
            initGradientText();
            initFlareEffect();
            initScrollFade();
            initScrollScale();
            initScrollStagger();
            initParallax();
            initMagneticButtons();
            initCardTilt();
            initCounters();
            initMorphingBlobs();
            
            console.log('✅ Motion.js animations initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Motion.js animations:', error);
        }
    });

})();
