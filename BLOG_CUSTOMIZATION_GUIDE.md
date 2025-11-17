# HotCodes Blog Customization Guide

## Overview

This document describes the comprehensive blog customizations implemented for the `theme_hotcodes` Odoo 19 theme. The customizations follow a Framer-inspired dark glassmorphism design system, creating a modern, premium blog experience.

## Design Philosophy

The blog design follows these core principles:

1. **Dark Glassmorphism**: Semi-transparent cards with blur effects and subtle borders
2. **Framer-Inspired Aesthetics**: Clean, minimalist design with smooth animations
3. **Premium Typography**: Carefully chosen font sizes, weights, and spacing
4. **Smooth Interactions**: Hover effects, transitions, and micro-animations
5. **Responsive Design**: Mobile-first approach with adaptive layouts

## Key Features Implemented

### 1. Global Blog Styles

**File**: `views/blog_templates.xml` - Template ID: `hotcodes_blog_global_styles`

- **Dark Background**: Transparent wrapper with dark theme integration
- **Hero Section**: Centered titles with large, bold typography
- **Glassmorphic Cards**: Blog post cards with:
  - Semi-transparent backgrounds with gradient overlays
  - Backdrop blur effects (30px blur, 180% saturation)
  - Subtle borders (rgba(255, 255, 255, 0.08))
  - Smooth shadow effects
  - Hover animations (lift + glow effect)

- **Typography System**:
  - Headings: 700 weight, -0.03em letter-spacing
  - Body text: rgba(255, 255, 255, 0.65) color
  - Meta text: rgba(255, 255, 255, 0.45) color
  - Responsive font sizes using clamp()

- **Interactive Elements**:
  - Buttons: Orange glassmorphic style with hover effects
  - Tags: Pill-shaped badges with glassmorphism
  - Search/Filters: Dark glassmorphic inputs
  - Pagination: Glassmorphic page links

### 2. Blog Hero Section

**Template ID**: `custom_blog_cover`

- **Icon Integration**: Duotone Iconify icons (solar: family)
- **Animated Titles**: Fade-in-up animations on load
- **Contextual Headers**:
  - Single blog: Shows blog name and subtitle
  - All blogs: Generic "Blog" title
  - Filtered results: "Filtered Results" with filter icon

### 3. Enhanced Post Metadata

**Template ID**: `custom_post_info`

- **Icon-Based Display**: Each metadata item has a duotone icon
- **Metadata Items**:
  - Calendar icon + relative date
  - User icon + author name/avatar
  - Eye icon + view count
  - Chat icon + comment count (if enabled)

- **Styling**: Flexbox layout with gaps, responsive wrapping

### 4. Single Blog Post Enhancements

**Template ID**: `custom_blog_post_cover`

- **Hero Cover Image**: Full-width hero with overlay gradient
- **Text Shadow**: Improved readability on cover images
- **Scroll Indicator**: Glassmorphic circular button with down arrow icon
- **Enhanced Info Bar**: Border-bottom separator with icon-based metadata

### 5. Content Styling

- **Headings**: White color, bold weight, negative letter-spacing
- **Paragraphs**: Increased line-height (1.8), comfortable reading size
- **Links**: Orange color with underline, hover effects
- **Lists**: Proper spacing and color
- **Blockquotes**: Left border accent, italic style
- **Code Blocks**: Dark background with orange accent
- **Pre Blocks**: Glassmorphic container with syntax highlighting support

### 6. Sidebar Enhancements

- **Glassmorphic Container**: Matches blog card styling
- **Section Headings**: Bold, white, properly spaced
- **Link Hover Effects**: Slide-right animation on hover
- **Responsive Behavior**: Stacks below content on mobile

### 7. Navigation & Filtering

- **Blog Navigation**: Glassmorphic nav links with active states
- **Breadcrumbs**: Transparent background, subtle colors
- **Tag Filters**: Pill-shaped with glassmorphism
- **Date Filters**: Glassmorphic select dropdown
- **Search Bar**: Dark glassmorphic input with focus effects

## Color Palette

```css
--hotcodes-primary: #ff6b35      /* Primary orange */
--hotcodes-secondary: #ff4500    /* Deep red-orange */
--hotcodes-accent: #ffd700       /* Gold */
--bg-dark: #0a0a0a               /* Dark background */
--bg-card: rgba(15, 15, 15, 0.7) /* Card background */
--text-primary: #ffffff          /* White text */
--text-secondary: rgba(255, 255, 255, 0.7)  /* Secondary text */
--text-muted: rgba(255, 255, 255, 0.5)      /* Muted text */
--border-color: rgba(255, 107, 53, 0.15)    /* Border color */
```

## Icon System

All icons use the **Iconify** library with **Solar** duotone icons:

- `solar:document-text-bold-duotone` - Single blog
- `solar:documents-bold-duotone` - All blogs
- `solar:filter-bold-duotone` - Filtered results
- `solar:calendar-bold-duotone` - Date
- `solar:user-bold-duotone` - Author
- `solar:eye-bold-duotone` - Views
- `solar:chat-round-dots-bold-duotone` - Comments
- `solar:alt-arrow-down-bold` - Scroll indicator

## Animations

### Keyframe Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Transition Effects

- **Card Hover**: `transform: translateY(-12px) scale(1.02)`
- **Image Hover**: `transform: scale(1.05)`
- **Button Hover**: `transform: translateY(-2px)`
- **Link Hover**: `transform: translateX(4px)`

All transitions use: `cubic-bezier(0.4, 0, 0.2, 1)` easing

## Responsive Breakpoints

- **Mobile**: < 768px
  - Reduced padding
  - Stacked layouts
  - Smaller font sizes
  - Sidebar moves below content

- **Tablet**: 768px - 1024px
  - 2-column grid for posts
  - Adjusted spacing

- **Desktop**: > 1024px
  - 3-4 column grid for posts
  - Full sidebar support
  - Maximum visual impact

## Template Inheritance Structure

```
website_blog.index (Core)
  └─ hotcodes_blog_global_styles (Styles injection)

website_blog.blog_post_short (Core)
  ├─ custom_blog_cover (Hero section)
  └─ custom_blog_post_short (Content layout)

website_blog.post_info (Core)
  └─ custom_post_info (Enhanced metadata)

website_blog.blog_post_complete (Core)
  ├─ blog_post_complete (Layout)
  ├─ custom_blog_post_cover (Hero image)
  └─ custom_blog_post_info (Post metadata)

website_blog.blog_post_sidebar (Core)
  └─ blog_post_sidebar (Sidebar structure)
```

## Usage Instructions

### 1. Installation

The blog customizations are automatically applied when `theme_hotcodes` is installed. No additional configuration needed.

### 2. Creating Blog Posts

1. Navigate to Website → Blog → Posts
2. Create a new post
3. Add a cover image for best visual impact
4. Use the website builder to add content
5. Publish when ready

### 3. Customizing Blog Header

1. Go to your blog page in edit mode
2. Click on the hero section
3. Edit the title, subtitle, and icon
4. Add custom content using building blocks

### 4. Enabling Sidebar

1. Go to Customize → Blog Options
2. Enable "Show Sidebar"
3. Add widgets to the sidebar using building blocks

### 5. Styling Tips

- **Use high-quality cover images** (min 1920x1080px)
- **Keep titles concise** (under 60 characters)
- **Use subtitles** for additional context
- **Add tags** for better organization
- **Enable comments** for engagement

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **Backdrop Filter**: Uses GPU acceleration
- **Animations**: Hardware-accelerated transforms
- **Images**: Lazy loading enabled by default
- **CSS**: Optimized selectors, minimal specificity

## Future Enhancements

Potential improvements for future versions:

1. **Reading Time Calculator**: Display estimated reading time
2. **Social Share Buttons**: Glassmorphic share buttons
3. **Related Posts**: AI-powered recommendations
4. **Newsletter Signup**: Inline subscription widget
5. **Dark/Light Mode Toggle**: Theme switcher
6. **Advanced Animations**: Scroll-triggered effects
7. **Table of Contents**: Auto-generated for long posts

## Support

For issues or questions:
- Check Odoo logs for errors
- Verify Iconify CDN is loading
- Clear browser cache
- Test in incognito mode
- Contact HotCodes support

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-14  
**Author**: HotCodes Agency  
**License**: AGPL-3

