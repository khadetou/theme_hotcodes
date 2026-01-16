/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

// Widget for Navbar (always present)
publicWidget.registry.HotCodesNavbar = publicWidget.Widget.extend({
  selector: ".hotcodes-navbar",
  disabledInEditableMode: false,

  start: function () {
    this._super(...arguments);

    this.Motion = this._loadMotion();

    // Disable Bootstrap click behavior
    this._disableBootstrapDropdowns();

    if (this.editableMode || this.$el.hasClass("o_editable")) {
      return;
    }

    // Show navbar immediately without entry animations (for browser compatibility)
    this._showNavbarWithoutAnimations();
    this._initScrollEffects();

    // If Motion.js is available, still use it for dropdown and hover animations
    if (this.Motion) {
      const { animate, stagger } = this.Motion;
      this._initDropdownAnimations(animate, stagger);
    }
  },

  _showNavbarWithoutAnimations: function () {
    // Show navbar immediately without any entry animations
    this.el.classList.add("loaded");
    this.el.style.opacity = "1";
    this.el.style.transform = "none";
  },

  destroy: function () {
    this.el.style.opacity = "";
    this.el.style.transform = "";
    this._super(...arguments);
  },

  _loadMotion: function () {
    if (!window.Motion || !window.Motion.animate) return null;
    const Motion = window.Motion;
    if (!Motion.stagger) {
      Motion.stagger = function (duration) {
        return function (index) {
          return index * duration;
        };
      };
    }
    return Motion;
  },

  _disableBootstrapDropdowns: function () {
    // Disable old custom mega-dropdown behavior
    this.el
      .querySelectorAll(".mega-dropdown > .dropdown-toggle")
      .forEach((toggle) => {
        toggle.setAttribute("data-bs-toggle", "disabled");
        toggle.addEventListener("click", (e) => e.preventDefault());
      });

    // Enable Odoo mega menu behavior (hover on desktop, click on mobile)
    this._initOdooMegaMenuBehavior();
  },

  _initDesktopMegaMenuHoverDelay: function () {
    // Only apply on desktop (min-width: 992px)
    if (window.innerWidth < 992) return;

    const navItems = this.el.querySelectorAll(".nav-item.position-static");
    const closeDelay = 300; // 300ms delay before closing

    navItems.forEach((navItem) => {
      const megaMenu = navItem.querySelector(".hotcodes-mega-desktop");
      if (!megaMenu) return;

      let closeTimeout = null;

      // When mouse leaves the nav item
      navItem.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => {
          megaMenu.style.opacity = "0";
          megaMenu.style.visibility = "hidden";
          megaMenu.style.pointerEvents = "none";
        }, closeDelay);
      });

      // When mouse enters the nav item or mega menu, cancel close
      const cancelClose = () => {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
        megaMenu.style.opacity = "1";
        megaMenu.style.visibility = "visible";
        megaMenu.style.pointerEvents = "all";
      };

      navItem.addEventListener("mouseenter", cancelClose);
      megaMenu.addEventListener("mouseenter", cancelClose);

      // When mouse leaves the mega menu
      megaMenu.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(() => {
          megaMenu.style.opacity = "0";
          megaMenu.style.visibility = "hidden";
          megaMenu.style.pointerEvents = "none";
        }, closeDelay);
      });
    });

    // Re-initialize on window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 992) {
          this._initDesktopMegaMenuHoverDelay();
        }
      }, 250);
    });
  },

  _initOdooMegaMenuBehavior: function () {
    // Desktop: Add hover delay to prevent mega menu from closing too quickly
    this._initDesktopMegaMenuHoverDelay();

    // Mobile-only mega menu click behavior
    // Desktop uses pure CSS hover (no JavaScript needed)
    const mobileToggles = this.el.querySelectorAll(
      ".hotcodes-mega-toggle-mobile"
    );

    // Helper function to close all mobile mega menus
    const closeAllMobileMenus = () => {
      this.el.querySelectorAll(".hotcodes-mega-mobile").forEach((menu) => {
        menu.classList.remove("show");
      });
      this.el
        .querySelectorAll(".hotcodes-mega-toggle-mobile")
        .forEach((toggle) => {
          toggle.classList.remove("active");
        });
    };

    mobileToggles.forEach((toggle) => {
      // Get submenu ID from data attribute
      const submenuId = toggle.getAttribute("data-submenu-id");
      if (!submenuId) return;

      // Find the associated mobile mega menu
      const navItem = toggle.closest(".nav-item");
      const megaMenu = navItem?.querySelector(
        `.hotcodes-mega-mobile[data-submenu-id="${submenuId}"]`
      );

      if (!navItem || !megaMenu) return;

      // Click handler for mobile
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close all other mobile mega menus
        this.el.querySelectorAll(".hotcodes-mega-mobile").forEach((menu) => {
          if (menu !== megaMenu) {
            menu.classList.remove("show");
          }
        });

        // Remove active class from all other toggles
        this.el
          .querySelectorAll(".hotcodes-mega-toggle-mobile")
          .forEach((t) => {
            if (t !== toggle) {
              t.classList.remove("active");
            }
          });

        // Toggle current menu
        const isOpen = megaMenu.classList.contains("show");
        if (isOpen) {
          megaMenu.classList.remove("show");
          toggle.classList.remove("active");
        } else {
          megaMenu.classList.add("show");
          toggle.classList.add("active");
        }
      });

      // Prevent clicks inside mega menu from closing it
      megaMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    // Click-outside handler: Close mobile mega menus when clicking outside
    document.addEventListener("click", (e) => {
      // Check if click is outside all mobile mega menus and toggles
      const isClickInsideMegaMenu = e.target.closest(".hotcodes-mega-mobile");
      const isClickOnToggle = e.target.closest(".hotcodes-mega-toggle-mobile");

      if (!isClickInsideMegaMenu && !isClickOnToggle) {
        closeAllMobileMenus();
      }
    });

    // Handle window resize - close all mobile menus
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        closeAllMobileMenus();
      }, 250);
    });
  },

  // Note: _initNavbarAnimations removed to eliminate entry animations for browser compatibility
  // Header now appears immediately without any slide-down or fade-in effects

  _initDropdownAnimations: function (animate, stagger) {
    // Animate old custom mega-dropdown cards
    this.el.querySelectorAll(".mega-dropdown").forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-menu");
      const cards = dropdown.querySelectorAll(".dropdown-card");

      if (!menu || !cards.length) return;

      let isAnimating = false;

      const animateCards = () => {
        if (isAnimating) return;
        isAnimating = true;

        animate(
          cards,
          { opacity: [0, 1], y: [8, 0] },
          {
            duration: 0.3,
            delay: stagger(0.04, { start: 0.05 }),
            easing: [0.4, 0, 0.2, 1],
          }
        ).finished.then(() => {
          setTimeout(() => {
            isAnimating = false;
          }, 500);
        });
      };

      dropdown.addEventListener("mouseenter", animateCards);
    });

    // Animate Odoo mega menu cards
    this.el.querySelectorAll(".nav-item.position-static").forEach((navItem) => {
      const megaMenu = navItem.querySelector(".o_mega_menu");
      const cards = navItem.querySelectorAll(".hotcodes-mega-card");

      if (!megaMenu || !cards.length) return;

      let isAnimating = false;

      const animateCards = () => {
        if (isAnimating) return;
        isAnimating = true;

        animate(
          cards,
          { opacity: [0, 1], y: [8, 0] },
          {
            duration: 0.3,
            delay: stagger(0.04, { start: 0.05 }),
            easing: [0.4, 0, 0.2, 1],
          }
        ).finished.then(() => {
          setTimeout(() => {
            isAnimating = false;
          }, 500);
        });
      };

      navItem.addEventListener("mouseenter", animateCards);
    });
  },

  _initScrollEffects: function () {
    const navbar = this.el;
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
        navbar.style.boxShadow = `0 1px 0 rgba(255, 255, 255, 0.06), 0 4px 24px rgba(0, 0, 0, ${
          0.2 + shadowOpacity * 0.3
        })`;
      } else {
        navbar.style.boxShadow = "0 1px 0 rgba(255, 255, 255, 0.06)";
      }

      // Always keep navbar visible (no auto-hide like Framer)
      navbar.style.transform = "translateY(0)";

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateNavbar);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial call to set proper state
    updateNavbar();
  },
});

// Widget for Hero Section (only on pages that have it)
publicWidget.registry.HotCodesHero = publicWidget.Widget.extend({
  selector: ".s_hotcodes_header",
  disabledInEditableMode: false,

  start: function () {
    this._super(...arguments);

    this.Motion = this._loadMotion();

    if (this.editableMode || this.$el.hasClass("o_editable")) {
      return;
    }

    // Show hero content immediately without entry animations (for browser compatibility)
    this._showContentWithoutAnimations();
    // Note: Entry animations removed for cross-browser compatibility
    // Interactive animations (hover effects, scroll-triggered) remain available if Motion.js is present
  },

  _showContentWithoutAnimations: function () {
    // Show all hero content immediately without any entry animations
    const elementsToShow = this.el.querySelectorAll(
      ".hero-title, .hero-subtitle, .hero-actions .btn, .gradient-text"
    );
    elementsToShow.forEach((el) => {
      el.classList.add("loaded");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  },

  destroy: function () {
    this.el
      .querySelectorAll(".hero-title, .hero-subtitle, .btn")
      .forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    this._super(...arguments);
  },

  _loadMotion: function () {
    if (!window.Motion || !window.Motion.animate) return null;
    const Motion = window.Motion;
    if (!Motion.stagger) {
      Motion.stagger = function (duration) {
        return function (index) {
          return index * duration;
        };
      };
    }
    return Motion;
  },

  // Note: _initAnimations function removed to eliminate entry animations for browser compatibility
  // Hero content now appears immediately without any fade-in or slide-in effects
});

// Widget for Pricing Cards (only on pages that have them)
publicWidget.registry.HotCodesPricing = publicWidget.Widget.extend({
  selector:
    ".pricing-card-starter, .pricing-card-business, .pricing-card-enterprise",
  disabledInEditableMode: false,

  start: function () {
    this._super(...arguments);

    if (this.editableMode || this.$el.hasClass("o_editable")) {
      return;
    }

    this._initPricingInteractions();
  },

  _initPricingInteractions: function () {
    const card = this.el;

    // Add magnetic effect on mouse move (subtle)
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // Subtle tilt effect (max 3 degrees)
      const tiltX = deltaY * 3;
      const tiltY = -deltaX * 3;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // Add ripple effect on button click
    const buttons = card.querySelectorAll(
      ".pricing-btn-primary, .pricing-btn-secondary, .pricing-btn-accent"
    );
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          transform: scale(0);
          animation: ripple-effect 0.6s ease-out;
        `;

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  },
});

// Add ripple animation to CSS dynamically
if (!document.getElementById("pricing-ripple-animation")) {
  const style = document.createElement("style");
  style.id = "pricing-ripple-animation";
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

export default {
  HotCodesNavbar: publicWidget.registry.HotCodesNavbar,
  HotCodesHero: publicWidget.registry.HotCodesHero,
  HotCodesPricing: publicWidget.registry.HotCodesPricing,
};
