# -*- coding: utf-8 -*-
#############################################################################
#
#    Cybrosys Technologies Pvt. Ltd.
#
#    Copyright (C) 2025-TODAY Cybrosys Technologies(<https://www.cybrosys.com>)
#    Author: Cybrosys Techno Solutions(<https://www.cybrosys.com>)
#
#    You can modify it under the terms of the GNU AFFERO
#    GENERAL PUBLIC LICENSE (AGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU AFFERO GENERAL PUBLIC LICENSE (AGPL v3) for more details.
#
#    You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
#    (AGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
#############################################################################
{
    "name": "Theme Hotcdoes",
    "version": "19.0.1.0.0",
    "category": "Theme/Hotcdoesmerce",
    "summary": "Theme Hotcdoes is an attractive and modern Hotcdoesmerce Website theme",
    "description": "Theme Hotcdoes is new kind of Theme.The theme is very "
    "user-friendly and suitable for your eCommerce website "
    "with blog",
    "author": "Hotcodes Agency",
    "company": "Hotcodes Agency",
    "maintainer": "Hotcodes Agency",
    "website": "https://www.hotcodes.io",
    "depends": [
        "website",
        "website_blog",
        "website_helpdesk",
        "survey",
        "survey_crm",
        "portal",
        "sale",
        "crm",
        "website_crm",
    ],
    "data": [
        "data/crm_lead_whitelist.xml",
        "data/mail_templates.xml",
        "views/layout_templates.xml",
        "views/header_templates.xml",
        "views/hero_section.xml",
        "views/hero_sections_animated.xml",
        "views/hotcodes_homepage.xml",
        "views/scroll_animation_section.xml",
        "views/footer_templates.xml",
        "views/menues.xml",
        "views/saytu_page.xml",
        "views/odoo_enterprise_page.xml",
        "views/services_page.xml",
        "views/developpement_page.xml",
        "views/consulting_page.xml",
        "views/applications_natives_page.xml",
        "views/sites_web_page.xml",
        "views/solutions_ia_page.xml",
        "views/business_intelligence_page.xml",
        "views/support_page.xml",
        "views/about_page.xml",
        "views/motion_demo_page.xml",
        "views/contact_us.xml",
        "views/contact_us_thank_you.xml",
        "views/demo_request.xml",
        "views/demo_thank_you.xml",
        "views/helpdesk_templates.xml",
        "views/survey_templates.xml",
        "views/auth_template.xml",
        "views/portal_templates.xml",
        "views/blog_templates.xml",
        # 'security/ir.model.access.csv',
        # 'data/boec_config_data.xml',
        # 'views/about.xml',
        # 'views/snippets/snippets_group.xml',
        # 'views/blog_templates.xml',
        # 'views/blog_preview_templates.xml',
        # 'views/boec_config_views.xml',
        # 'views/cart_templates.xml',
        # 'views/contact_us_templates.xml',
        # 'views/page_top_templates.xml',
        # 'views/product_brand_views.xml',
        # 'views/product_template_views.xml',
        # 'views/product_view_templates.xml',
        # 'views/shop_templates.xml',
        # 'views/sidebar_shop_templates.xml',
        # 'views/snippets/banner.xml',
        # 'views/snippets/blog_latest.xml',
        # 'views/snippets/deal_week.xml',
        # 'views/snippets/demo_product.xml',
        # 'views/snippets/insta_feed.xml',
        # 'views/snippets/product_tab.xml',
        # 'views/snippets/product_tab_demo.xml',
    ],
    "assets": {
        "web.assets_frontend": [
            "theme_hotcodes/static/src/scss/style.scss",
            "theme_hotcodes/static/src/scss/scroll_section.scss",
            "theme_hotcodes/static/src/scss/landing_page.scss",
            "theme_hotcodes/static/src/scss/survey_custom.scss",
            "theme_hotcodes/static/src/scss/auth_custom.scss",
            "theme_hotcodes/static/src/scss/portal_custom.scss",
            "theme_hotcodes/static/src/js/main.js",
            "theme_hotcodes/static/src/js/scroll_animation.js",
            "theme_hotcodes/static/src/js/text_animations.js",
            "theme_hotcodes/static/src/js/motion_animations.js",
            "theme_hotcodes/static/src/css/style.css",
            # 'theme_boec/static/src/js/sale_utils.js',
            # "/theme_boec/static/src/css/style.css",
            # "/theme_boec/static/src/css/style.css.map",
            # "/theme_boec/static/src/css/style.scss",
            # "/theme_boec/static/src/css/owl_carousel_min.css",
            # "/theme_boec/static/src/css/owl_theme_default_min.css",
            # "/theme_boec/static/src/js/owl.carousel.js",
            # "/theme_boec/static/src/js/owl.carousel.min.js",
            # "/theme_boec/static/src/js/jquery.countdown.min.js",
            # '/theme_boec/static/src/xml/deal_week_content.xml',
            # '/theme_boec/static/src/xml/product_tab_content.xml',
            # "/theme_boec/static/src/js/deal_week.js",
            # "/theme_boec/static/src/js/product_tab.js",
            # "/theme_boec/static/src/js/custom.js",
            # 'https://cdn.jsdelivr.net/npm/material-icons@1.13.12/iconfont/material-icons.min.css',
        ],
        "web._assets_primary_variables": [
            "theme_hotcodes/static/src/scss/primary_variables.scss",
        ],
    },
    "images": [
        # 'static/description/banner.jpg',
        # 'static/description/theme_screenshot.jpg',
    ],
    "license": "AGPL-3",
    "installable": True,
    "auto_install": False,
    "application": False,
}
