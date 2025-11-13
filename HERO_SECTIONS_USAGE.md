# 🎨 Hero Sections Usage Guide

## Overview

This guide shows you how to use the **5 animated hero section templates** in your Odoo pages. All hero sections are **reusable templates** that accept variables - just like the standard `hotcodes_hero_section` template!

---

## 📚 Available Hero Sections

| Template ID | Style | Best For |
|-------------|-------|----------|
| `hotcodes_hero_floating_cards` | Floating 3D cards with features list | Agency pages, Partner programs |
| `hotcodes_hero_particle_network` | Animated grid with gradient text | Tech products, AI/ML services |
| `hotcodes_hero_morphing_blobs` | Organic morphing shapes | Creative agencies, Design studios |
| `hotcodes_hero_video_background` | Animated pattern with typing cursor | Homepage, About page |
| `hotcodes_hero_split_screen` | 50/50 split with image mockup | Product pages, SaaS landing |

---

## 🚀 How to Use

### Method 1: Direct Usage in Your Page Template

```xml
<template id="my_custom_page" name="My Custom Page">
    <t t-call="website.layout">
        <div id="wrap" class="oe_structure">
            
            <!-- Use the hero section template -->
            <t t-call="theme_hotcodes.hotcodes_hero_floating_cards">
                <t t-set="hero_title_part1" t-value="'Transform Your'"/>
                <t t-set="hero_title_part2" t-value="'Business'"/>
                <t t-set="hero_title_part3" t-value="'With AI Automation'"/>
                <t t-set="feature_1" t-value="'AI-powered workflows'"/>
                <t t-set="feature_2" t-value="'Save 80% of time'"/>
                <t t-set="feature_3" t-value="'24/7 support'"/>
                <t t-set="hero_cta_primary_text" t-value="'Get Started'"/>
                <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
                <t t-set="hero_cta_secondary_text" t-value="'Learn More'"/>
                <t t-set="hero_cta_secondary_url" t-value="'/services'"/>
            </t>
            
            <!-- Rest of your page content -->
            
        </div>
    </t>
</template>
```

### Method 2: Create a Wrapper Template (Recommended)

```xml
<!-- Create a specific hero for your page -->
<template id="my_page_hero" name="My Page Hero">
    <t t-call="theme_hotcodes.hotcodes_hero_particle_network">
        <t t-set="hero_title" t-value="'AI Solutions'"/>
        <t t-set="hero_subtitle" t-value="'Automate your business'"/>
        <t t-set="hero_cta_primary_text" t-value="'Start Free Trial'"/>
        <t t-set="hero_cta_primary_url" t-value="'/trial'"/>
        <!-- ... more variables ... -->
    </t>
</template>

<!-- Then use it in your page -->
<template id="my_page" name="My Page">
    <t t-call="website.layout">
        <div id="wrap" class="oe_structure">
            <t t-call="my_page_hero"/>
            <!-- Rest of content -->
        </div>
    </t>
</template>
```

---

## 📋 Template Variables Reference

### 1. Floating 3D Cards (`hotcodes_hero_floating_cards`)

**Variables:**
```python
hero_title_part1       # First line of title (default: 'Framer for')
hero_title_part2       # Second line of title (default: 'agencies.')
hero_title_part3       # Third line (highlighted) (default: 'No limits, no fees.')
feature_1              # First feature text
feature_2              # Second feature text
feature_3              # Third feature text
hero_cta_primary_text  # Primary button text
hero_cta_primary_url   # Primary button URL
hero_cta_secondary_text # Secondary button text
hero_cta_secondary_url  # Secondary button URL
```

**Example:**
```xml
<t t-call="theme_hotcodes.hotcodes_hero_floating_cards">
    <t t-set="hero_title_part1" t-value="'Solutions IA'"/>
    <t t-set="hero_title_part2" t-value="'pour entreprises'"/>
    <t t-set="hero_title_part3" t-value="'Automatisation intelligente'"/>
    <t t-set="feature_1" t-value="'500+ intégrations disponibles'"/>
    <t t-set="feature_2" t-value="'Économisez 80% de temps'"/>
    <t t-set="feature_3" t-value="'Support expert 24/7'"/>
    <t t-set="hero_cta_primary_text" t-value="'Démarrer'"/>
    <t t-set="hero_cta_primary_url" t-value="'/services/solutions-ia'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Voir les cas d\'usage'"/>
    <t t-set="hero_cta_secondary_url" t-value="'#use-cases'"/>
</t>
```

---

### 2. Particle Network (`hotcodes_hero_particle_network`)

**Variables:**
```python
hero_title             # Main title
hero_subtitle          # Subtitle text
hero_cta_primary_text  # Primary button text
hero_cta_primary_url   # Primary button URL
hero_cta_secondary_text # Secondary button text
hero_cta_secondary_url  # Secondary button URL
stat_1_value           # First stat value (e.g., '500+')
stat_1_label           # First stat label (e.g., 'Clients')
stat_2_value           # Second stat value
stat_2_label           # Second stat label
stat_3_value           # Third stat value
stat_3_label           # Third stat label
```

**Example:**
```xml
<t t-call="theme_hotcodes.hotcodes_hero_particle_network">
    <t t-set="hero_title" t-value="'Business Intelligence'"/>
    <t t-set="hero_subtitle" t-value="'Transformez vos données en décisions stratégiques'"/>
    <t t-set="hero_cta_primary_text" t-value="'Demander une démo'"/>
    <t t-set="hero_cta_primary_url" t-value="'/demo'"/>
    <t t-set="hero_cta_secondary_text" t-value="'En savoir plus'"/>
    <t t-set="hero_cta_secondary_url" t-value="'#features'"/>
    <t t-set="stat_1_value" t-value="'1000+'"/>
    <t t-set="stat_1_label" t-value="'Rapports générés'"/>
    <t t-set="stat_2_value" t-value="'99.9%'"/>
    <t t-set="stat_2_label" t-value="'Précision'"/>
    <t t-set="stat_3_value" t-value="'24/7'"/>
    <t t-set="stat_3_label" t-value="'Disponibilité'"/>
</t>
```

---

### 3. Morphing Blobs (`hotcodes_hero_morphing_blobs`)

**Variables:**
```python
hero_title_line1       # First word (large)
hero_title_line2       # Second word (large)
hero_title_line3       # Third word (large)
hero_subtitle          # Subtitle text
hero_cta_primary_text  # Primary button text
hero_cta_primary_url   # Primary button URL
hero_cta_secondary_text # Secondary button text
hero_cta_secondary_url  # Secondary button URL
```

**Example:**
```xml
<t t-call="theme_hotcodes.hotcodes_hero_morphing_blobs">
    <t t-set="hero_title_line1" t-value="'Concevoir.'"/>
    <t t-set="hero_title_line2" t-value="'Développer.'"/>
    <t t-set="hero_title_line3" t-value="'Déployer.'"/>
    <t t-set="hero_subtitle" t-value="'Solutions complètes pour entreprises modernes'"/>
    <t t-set="hero_cta_primary_text" t-value="'Commencer'"/>
    <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Portfolio'"/>
    <t t-set="hero_cta_secondary_url" t-value="'/portfolio'"/>
</t>
```

---

### 4. Video Background (`hotcodes_hero_video_background`)

**Variables:**
```python
hero_title             # Main title
hero_subtitle          # Subtitle with typing animation
hero_cta_primary_text  # Primary button text
hero_cta_primary_url   # Primary button URL
hero_cta_secondary_text # Secondary button text
hero_cta_secondary_url  # Secondary button URL
```

**Example:**
```xml
<t t-call="theme_hotcodes.hotcodes_hero_video_background">
    <t t-set="hero_title" t-value="'Bienvenue chez HotCodes'"/>
    <t t-set="hero_subtitle" t-value="'Nous créons des expériences digitales exceptionnelles'"/>
    <t t-set="hero_cta_primary_text" t-value="'Démarrer un projet'"/>
    <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Nos réalisations'"/>
    <t t-set="hero_cta_secondary_url" t-value="'/portfolio'"/>
</t>
```

---

### 5. Split Screen (`hotcodes_hero_split_screen`)

**Variables:**
```python
hero_title             # Main title
hero_subtitle          # Subtitle
hero_description       # Longer description text
hero_cta_primary_text  # Primary button text
hero_cta_primary_url   # Primary button URL
hero_cta_secondary_text # Secondary button text
hero_cta_secondary_url  # Secondary button URL
```

**Example:**
```xml
<t t-call="theme_hotcodes.hotcodes_hero_split_screen">
    <t t-set="hero_title" t-value="'Odoo Enterprise'"/>
    <t t-set="hero_subtitle" t-value="'Plateforme ERP complète'"/>
    <t t-set="hero_description" t-value="'De la gestion des stocks à la comptabilité, du CRM aux RH - gérez tout en un seul endroit avec nos solutions Odoo personnalisées.'"/>
    <t t-set="hero_cta_primary_text" t-value="'Demander une démo'"/>
    <t t-set="hero_cta_primary_url" t-value="'/demo'"/>
    <t t-set="hero_cta_secondary_text" t-value="'Voir les tarifs'"/>
    <t t-set="hero_cta_secondary_url" t-value="'/pricing'"/>
</t>
```

---

## 🎯 Real-World Examples

### Example: AI Automation Page

```xml
<template id="solutions_ia_hero" name="Solutions IA Hero">
    <t t-call="theme_hotcodes.hotcodes_hero_floating_cards">
        <t t-set="hero_title_part1" t-value="'Automatisation IA'"/>
        <t t-set="hero_title_part2" t-value="'avec n8n'"/>
        <t t-set="hero_title_part3" t-value="'Transformez votre entreprise'"/>
        <t t-set="feature_1" t-value="'500+ intégrations (OpenAI, Claude, Gemini)'"/>
        <t t-set="feature_2" t-value="'Économisez 80% de temps sur les tâches répétitives'"/>
        <t t-set="feature_3" t-value="'Support expert et formation complète'"/>
        <t t-set="hero_cta_primary_text" t-value="'Automatiser Mon Entreprise'"/>
        <t t-set="hero_cta_primary_url" t-value="'/contact'"/>
        <t t-set="hero_cta_secondary_text" t-value="'Voir les Cas d\'Usage'"/>
        <t t-set="hero_cta_secondary_url" t-value="'#use-cases'"/>
    </t>
</template>
```

---

## ✨ Features Included

All hero sections include:

✅ **Motion.js animations** - Text reveal, magnetic buttons, scroll effects  
✅ **Framer-inspired design** - Gradient glows, glassmorphism, 3D effects  
✅ **Fully responsive** - Mobile, tablet, desktop optimized  
✅ **Accessible** - Respects `prefers-reduced-motion`  
✅ **Performance optimized** - GPU-accelerated animations  
✅ **Easy customization** - Just pass variables!  

---

## 📱 Responsive Behavior

All hero sections automatically adapt to different screen sizes:

- **Desktop (>992px)**: Full layout with all animations
- **Tablet (768px-992px)**: Adjusted spacing and font sizes
- **Mobile (<768px)**: Stacked layout, optimized for touch

---

## 🎨 Customization Tips

### Change Colors

The hero sections use CSS variables. Override them in your page:

```xml
<style>
    :root {
        --hotcodes-primary: #FF6B35;    /* Orange */
        --hotcodes-secondary: #8A2BE2;  /* Purple */
        --hotcodes-accent: #3B82F6;     /* Blue */
    }
</style>
```

### Add Custom Animations

All hero sections support Motion.js data attributes:

```xml
<h1 data-motion="text-reveal">Your Title</h1>
<button data-motion="magnetic flare">Click Me</button>
```

---

## 🚀 Next Steps

1. Choose a hero section template
2. Copy the example code
3. Customize the variables
4. Add to your page template
5. Update Odoo module: `./odoo-bin -c odoo.conf -u theme_hotcodes`

**Happy coding!** 🎉

