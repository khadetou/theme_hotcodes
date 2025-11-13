# 🎬 Motion.js Animations Guide

## Overview

This guide shows you how to use Motion.js (Motion One) animations in your Hotcodes theme. Motion.js is already loaded and configured - just add `data-motion` attributes to your HTML elements!

**Motion.js** is a lightweight, performant animation library that powers Framer Motion. It's perfect for creating smooth, professional animations with minimal code.

---

## 📚 Table of Contents

1. [Text Animations](#1-text-animations)
2. [Button Effects](#2-button-effects)
3. [Scroll Animations](#3-scroll-animations)
4. [Card Effects](#4-card-effects)
5. [Counters](#5-counters)
6. [Morphing Shapes](#6-morphing-shapes)
7. [Advanced Examples](#7-advanced-examples)

---

## 1. Text Animations

### Character-by-Character Reveal

Animates each character individually with a stagger effect.

```xml
<h1 data-motion="text-reveal">Hello World</h1>
```

**Effect**: Each character fades in and slides up with a 3D rotation.

---

### Word-by-Word Reveal

Animates each word individually.

```xml
<h2 data-motion="word-reveal">Animate Each Word Separately</h2>
```

**Effect**: Each word fades in, slides up, and scales from 0.8 to 1.

---

### Animated Gradient Text

Creates a moving gradient effect on text.

```xml
<span data-motion="gradient-text" 
      style="background: linear-gradient(90deg, #FF6B35, #8A2BE2, #FF6B35); 
             background-size: 200% 100%; 
             -webkit-background-clip: text; 
             -webkit-text-fill-color: transparent;">
    Animated Gradient
</span>
```

**Effect**: Gradient continuously moves across the text.

---

## 2. Button Effects

### Flare/Shine Effect

Adds a shine effect that sweeps across the button on hover.

```xml
<button data-motion="flare" 
        style="background: linear-gradient(135deg, #FF6B35, #8A2BE2); 
               color: white; 
               padding: 1rem 2rem; 
               border: none; 
               border-radius: 12px; 
               cursor: pointer;">
    Hover Me
</button>
```

**Effect**: A white shine sweeps across the button when you hover over it.

---

### Magnetic Button

Button follows the cursor when you hover near it.

```xml
<button data-motion="magnetic" 
        data-magnetic-strength="0.5"
        style="background: white; 
               color: #000; 
               padding: 1rem 2rem; 
               border: none; 
               border-radius: 12px; 
               cursor: pointer;">
    Magnetic Button
</button>
```

**Attributes**:
- `data-magnetic-strength`: Controls how much the button moves (0.1 to 1.0)

**Effect**: Button moves toward your cursor, creating a magnetic effect.

---

## 3. Scroll Animations

### Fade In on Scroll

Element fades in and slides up when it enters the viewport.

```xml
<div data-motion="scroll-fade" 
     style="padding: 2rem; 
            background: rgba(255,255,255,0.1); 
            border-radius: 16px;">
    This fades in when you scroll to it
</div>
```

**Effect**: Opacity 0→1, Y position 50px→0px

---

### Scale In on Scroll

Element scales up and fades in when visible.

```xml
<div data-motion="scroll-scale" 
     style="padding: 2rem; 
            background: linear-gradient(135deg, #FF6B35, #8A2BE2); 
            border-radius: 16px;">
    This scales in when you scroll to it
</div>
```

**Effect**: Opacity 0→1, Scale 0.8→1

---

### Stagger Children on Scroll

Animates child elements one after another.

```xml
<div data-motion="scroll-stagger" 
     style="display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 1rem;">
    <div style="padding: 2rem; background: #FF6B35; border-radius: 12px;">Item 1</div>
    <div style="padding: 2rem; background: #8A2BE2; border-radius: 12px;">Item 2</div>
    <div style="padding: 2rem; background: #3B82F6; border-radius: 12px;">Item 3</div>
</div>
```

**Effect**: Each child animates with a 0.1s delay between them.

---

### Parallax Scroll

Element moves at a different speed than the scroll.

```xml
<img data-motion="parallax" 
     data-parallax-speed="0.5" 
     src="/path/to/image.jpg" 
     style="width: 100%; border-radius: 16px;"/>
```

**Attributes**:
- `data-parallax-speed`: Speed multiplier (0.1 to 1.0)
  - `0.5` = moves at half scroll speed
  - `1.0` = moves at full scroll speed

---

## 4. Card Effects

### 3D Tilt Card

Card tilts in 3D based on mouse position.

```xml
<div data-motion="card-tilt" 
     style="width: 300px; 
            height: 400px; 
            background: linear-gradient(135deg, #FF6B35, #8A2BE2); 
            border-radius: 24px; 
            padding: 2rem; 
            transform-style: preserve-3d;">
    <h3 style="color: white;">3D Tilt Card</h3>
    <p style="color: rgba(255,255,255,0.8);">Move your mouse over me!</p>
</div>
```

**Important**: Must include `transform-style: preserve-3d` for 3D effect.

**Effect**: Card rotates in 3D following your mouse movement.

---

## 5. Counters

### Animated Number Counter

Numbers count up from 0 to target value when scrolled into view.

```xml
<div style="text-align: center;">
    <h2 style="font-size: 4rem; font-weight: 900; color: #FF6B35;">
        <span data-motion="counter" 
              data-counter-target="500" 
              data-counter-suffix="+" 
              data-counter-duration="2">0</span>
    </h2>
    <p>Happy Clients</p>
</div>
```

**Attributes**:
- `data-counter-target`: Final number (e.g., 500)
- `data-counter-suffix`: Text after number (e.g., "+", "K", "%")
- `data-counter-prefix`: Text before number (e.g., "$", "€")
- `data-counter-duration`: Animation duration in seconds (default: 2)

---

## 6. Morphing Shapes

### Morphing Blob

Shape continuously morphs between different border-radius values.

```xml
<div data-motion="morph-blob" 
     style="width: 200px; 
            height: 200px; 
            background: linear-gradient(135deg, #FF6B35, #8A2BE2); 
            filter: blur(40px);">
</div>
```

**Effect**: Border-radius continuously morphs creating an organic blob effect.

---

## 7. Advanced Examples

### Complete Hero Section with Multiple Animations

```xml
<section style="min-height: 100vh; background: #000; display: flex; align-items: center; position: relative; overflow: hidden;">
    <!-- Morphing background blobs -->
    <div data-motion="morph-blob" 
         style="position: absolute; top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,107,53,0.3), transparent); filter: blur(100px);"></div>
    
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <!-- Text reveal animation -->
                <h1 data-motion="text-reveal" 
                    style="font-size: 5rem; font-weight: 900; color: white; margin-bottom: 2rem;">
                    Hello World
                </h1>
                
                <!-- Word reveal animation -->
                <p data-motion="word-reveal" 
                   style="font-size: 1.5rem; color: rgba(255,255,255,0.8); margin-bottom: 3rem;">
                    Create amazing experiences with Motion.js
                </p>
                
                <!-- Magnetic button with flare -->
                <button data-motion="magnetic flare" 
                        data-magnetic-strength="0.3"
                        style="background: linear-gradient(135deg, #FF6B35, #8A2BE2); color: white; padding: 1.5rem 3rem; border: none; border-radius: 14px; font-size: 1.25rem; font-weight: 700; cursor: pointer;">
                    Get Started
                </button>
            </div>
        </div>
    </div>
</section>
```

---

### Stats Section with Counters and Stagger

```xml
<section data-motion="scroll-stagger" 
         style="padding: 5rem 0; background: #0a0a0a;">
    <div class="container">
        <div class="row text-center">
            <div class="col-md-4">
                <h2 style="font-size: 4rem; font-weight: 900; color: #FF6B35;">
                    <span data-motion="counter" data-counter-target="500" data-counter-suffix="+">0</span>
                </h2>
                <p style="color: rgba(255,255,255,0.7);">Happy Clients</p>
            </div>
            <div class="col-md-4">
                <h2 style="font-size: 4rem; font-weight: 900; color: #8A2BE2;">
                    <span data-motion="counter" data-counter-target="1000" data-counter-suffix="+">0</span>
                </h2>
                <p style="color: rgba(255,255,255,0.7);">Projects Completed</p>
            </div>
            <div class="col-md-4">
                <h2 style="font-size: 4rem; font-weight: 900; color: #3B82F6;">
                    <span data-motion="counter" data-counter-target="99" data-counter-suffix="%">0</span>
                </h2>
                <p style="color: rgba(255,255,255,0.7);">Client Satisfaction</p>
            </div>
        </div>
    </div>
</section>
```

---

## 🎨 Combining Multiple Animations

You can combine multiple `data-motion` attributes:

```xml
<div data-motion="scroll-fade card-tilt" 
     style="transform-style: preserve-3d;">
    This element fades in on scroll AND has 3D tilt on hover
</div>
```

---

## 🚀 Performance Tips

1. **Use sparingly**: Don't animate everything - focus on key elements
2. **Reduce motion**: Animations automatically disable for users who prefer reduced motion
3. **GPU acceleration**: Animations use transform and opacity for best performance
4. **Lazy loading**: Scroll animations only trigger when elements are visible

---

## 📞 Support

For questions or custom animations, contact the Hotcodes team.

**Created by**: Hotcodes Agency  
**Library**: Motion One (https://motion.dev/)  
**Version**: 1.0.0

