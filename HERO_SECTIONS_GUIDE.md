# 🎨 Animated Hero Sections Guide

## Overview

This guide explains how to use the 5 different animated hero section variants created for the Hotcodes theme. Each variant features unique animations, visual effects, and layouts inspired by modern web design trends (especially Framer).

---

## 📋 Available Hero Section Variants

### 1. **Floating 3D Cards** (`hotcodes_hero_floating_cards`)
**Best for**: Product launches, agency websites, feature showcases

**Features**:
- 4 floating 3D cards with icons ($, ↑, ⚡, ★)
- Animated gradient orbs in background
- Feature list with checkmarks
- Dual CTA buttons
- Scroll indicator

**Animations**:
- `float3D` - 3D rotation and floating effect on cards
- `fadeInUp` - Content slides up on load
- `pulse` - Gradient glow pulsing
- `bounce` - Scroll indicator bouncing

**Usage**:
```xml
<t t-call="theme_hotcodes.hotcodes_hero_floating_cards">
    <t t-set="hero_title_part1" t-value="'Framer for'"/>
    <t t-set="hero_title_part2" t-value="'agencies.'"/>
    <t t-set="hero_title_part3" t-value="'No limits, no fees.'"/>
    <t t-set="feature_1" t-value="'Free and unlimited access'"/>
    <t t-set="feature_2" t-value="'Earn up to 50% commission'"/>
    <t t-set="feature_3" t-value="'Dedicated expert support'"/>
    <t t-set="hero_cta_primary_text" t-value="'Join the program'"/>
    <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
    <t t-set="hero_cta_secondary_text" t-value="'See all benefits'"/>
    <t t-set="hero_cta_secondary_url" t-value="'#benefits'"/>
</t>
```

---

### 2. **Particle Network** (`hotcodes_hero_particle_network`)
**Best for**: Tech companies, AI/ML products, data platforms

**Features**:
- Animated grid background
- Particle canvas (requires JS implementation)
- Animated badge with pulsing dot
- Gradient text title
- Shine effect on primary CTA
- Stats cards (3 columns)

**Animations**:
- `gridMove` - Moving grid background
- `slideDown` - Badge slides down
- `fadeInUp` - Staggered content appearance
- `shine` - Shine effect sweeping across button
- `pulse` - Pulsing dot in badge

**Usage**:
```xml
<t t-call="theme_hotcodes.hotcodes_hero_particle_network">
    <t t-set="hero_badge" t-value="'🚀 Nouveau: Automatisation IA avec n8n'"/>
    <t t-set="hero_title_part1" t-value="'Transformez Votre'"/>
    <t t-set="hero_title_part2" t-value="'Entreprise avec l\'IA'"/>
    <t t-set="hero_subtitle" t-value="'Automatisation intelligente, workflows n8n'"/>
    <t t-set="hero_cta_primary_text" t-value="'Démarrer Maintenant'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Voir la Démo'"/>
</t>
```

---

### 3. **Morphing Gradient Blobs** (`hotcodes_hero_morphing_blobs`)
**Best for**: Creative agencies, design studios, modern SaaS

**Features**:
- 3 morphing gradient blobs (orange, purple, blue)
- Eyebrow text (small uppercase label)
- Animated underline on title
- Trust badges (stars + client count)
- Left-aligned content

**Animations**:
- `morphBlob` - Organic blob shape morphing
- `float` - Gentle floating motion
- `slideInLeft` - Content slides in from left
- `expandWidth` - Underline expands from left to right

**Usage**:
```xml
<t t-call="theme_hotcodes.hotcodes_hero_morphing_blobs">
    <t t-set="hero_eyebrow" t-value="'✨ Solutions IA &amp; Automatisation'"/>
    <t t-set="hero_title_part1" t-value="'Automatisez'"/>
    <t t-set="hero_title_part2" t-value="'Tout avec l\'IA'"/>
    <t t-set="hero_subtitle" t-value="'Créez des workflows intelligents avec n8n'"/>
    <t t-set="hero_cta_primary_text" t-value="'Commencer Gratuitement'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Documentation'"/>
</t>
```

---

### 4. **Video Background** (`hotcodes_hero_video_background`)
**Best for**: Portfolios, creative showcases, immersive experiences

**Features**:
- Animated pattern background (placeholder for video)
- Dark gradient overlay
- Typing cursor effect on title
- Bouncing icon on CTA
- Scroll down indicator with animated line
- Centered layout

**Animations**:
- `moveBackground` - Moving diagonal pattern
- `fadeInUp` - Content fades up
- `blink` - Typing cursor blinking
- `bounce` - Icon bouncing
- `scrollLine` - Scroll indicator line animation

**Usage**:
```xml
<t t-call="theme_hotcodes.hotcodes_hero_video_background">
    <t t-set="hero_title_part1" t-value="'Créez des'"/>
    <t t-set="hero_title_part2" t-value="'Expériences Digitales'"/>
    <t t-set="hero_subtitle" t-value="'Des solutions web innovantes'"/>
    <t t-set="hero_cta_primary_text" t-value="'Lancer Votre Projet'"/>
    <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
</t>
```

---

### 5. **Split Screen** (`hotcodes_hero_split_screen`)
**Best for**: Developer tools, technical products, minimalist brands

**Features**:
- 50/50 split layout
- Logo/brand icon
- Left side: content (dark background)
- Right side: visual (gradient background with animated shapes)
- Large centered icon with float animation

**Animations**:
- `fadeIn` - Logo fades in
- `slideInLeft` - Content slides from left
- `morphBlob` - Shapes morph on right side
- `float` - Center icon floats

**Usage**:
```xml
<t t-call="theme_hotcodes.hotcodes_hero_split_screen">
    <t t-set="hero_title_part1" t-value="'Build'"/>
    <t t-set="hero_title_part2" t-value="'Better'"/>
    <t t-set="hero_title_part3" t-value="'Faster'"/>
    <t t-set="hero_subtitle" t-value="'Développement web moderne'"/>
    <t t-set="hero_cta_primary_text" t-value="'Get Started'"/>
</t>
```

---

## 🎬 Animation Reference

All animations are defined in the `hotcodes_hero_animations_css` template. Here's a complete list:

| Animation | Duration | Effect | Use Case |
|-----------|----------|--------|----------|
| `fadeInUp` | 1s | Fade in + slide up | Content entrance |
| `slideInLeft` | 1s | Slide from left | Left-aligned content |
| `slideDown` | 1s | Slide from top | Badges, notifications |
| `float` | 8s | Gentle up/down | Floating elements |
| `float3D` | 6-9s | 3D rotation + float | Cards, objects |
| `pulse` | 2-4s | Opacity + scale | Glows, indicators |
| `bounce` | 2s | Vertical bounce | Icons, scroll indicators |
| `morphBlob` | 10-15s | Shape morphing | Organic backgrounds |
| `shine` | 3s | Sweep effect | Button highlights |
| `expandWidth` | 1.5s | Width 0 to 100% | Underlines |
| `blink` | 1s | On/off | Typing cursor |
| `gridMove` | 20s | Grid translation | Background patterns |
| `scrollLine` | 2s | Line grows/fades | Scroll indicators |

---

## 🎨 Customization Tips

### Colors
All hero sections use CSS variables:
- `var(--hotcodes-primary)` - Orange (#FF6B35)
- `var(--hotcodes-secondary)` - Purple (#8A2BE2)
- `var(--bg-dark)` - Dark background

### Responsive Behavior
- **Desktop (>992px)**: Full animations, large text
- **Tablet (768-992px)**: Reduced font sizes, simplified animations
- **Mobile (<768px)**: Minimal animations, stacked layout

### Accessibility
- `prefers-reduced-motion` support included
- All animations disabled for users who prefer reduced motion
- Semantic HTML structure
- ARIA-friendly

---

## 📱 Mobile Optimization

All hero sections are fully responsive:
- Font sizes scale down on mobile
- Floating cards hidden on small screens
- Gradient orbs/blobs reduced in size
- CTAs stack vertically
- Touch-friendly button sizes (min 44x44px)

---

## 🚀 Performance

Optimizations included:
- `will-change: transform` on animated elements
- `backface-visibility: hidden` for smoother animations
- GPU-accelerated transforms
- Reduced motion support
- Lazy-loaded heavy elements

---

## 💡 Best Practices

1. **Choose the right variant** for your content type
2. **Keep titles short** (2-3 lines max)
3. **Use contrasting CTAs** (primary vs secondary)
4. **Test on mobile** devices
5. **Limit custom animations** to avoid performance issues
6. **Use semantic HTML** for SEO
7. **Optimize images** if adding custom backgrounds

---

## 🔧 Advanced Customization

To create your own variant:
1. Copy an existing template
2. Modify the structure
3. Add custom animations to the CSS template
4. Test responsiveness
5. Add to manifest.py

---

## 📞 Support

For questions or custom hero sections, contact the Hotcodes team.

**Created by**: Hotcodes Agency  
**Version**: 1.0.0  
**Last Updated**: 2025

