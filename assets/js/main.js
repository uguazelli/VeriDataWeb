/**
 * Redirects the root page to the best supported language based on browser settings.
 */
function redirectToPreferredLanguage() {
    const supportedLangs = ['en', 'pt', 'es'];
    let userLang = 'en';

    try {
        const browserLang = (navigator.language || '').split('-')[0].toLowerCase();
        if (supportedLangs.includes(browserLang)) {
            userLang = browserLang;
        }
    } catch (error) {
        console.error('Language detection failed', error);
    }

    window.location.replace(`./${userLang}/index.html`);
}

if (window.enableLanguageRedirect) {
    redirectToPreferredLanguage();
}

/**
 * Loads a reusable HTML component into a target element.
 * @param {string} elementId - The ID of the DOM element to inject content into.
 * @param {string} filePath - The path to the HTML component file.
 */
async function loadComponent(elementId, filePath) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        targetElement.innerHTML = html;

        // Update language switcher links if root is defined
        if (window.resRoot) {
            updateLanguageSwitcher();

            // Update relative image sources
            const relativeImages = targetElement.querySelectorAll('[data-relative-src="true"]');
            relativeImages.forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', window.resRoot + src);
                }
            });

            // Translate footer links if applicable
            if (elementId === 'footer-placeholder') {
                translateUI('footer');
            }
            // Translate header links if applicable
            if (elementId === 'header-placeholder') {
                translateUI('header');
            }
        }

        // Highlight active link based on current path
        if (elementId === 'header-placeholder') {
            highlightActiveLink();
            setupMobileMenu();
        }

    } catch (error) {
        console.error('Error loading component:', error);
    }
}

/**
 * Sets up mobile menu toggle functionality.
 */
function setupMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const content = document.getElementById('mobile-menu-content');

    if (!openBtn || !menu || !closeBtn || !backdrop || !content) return;

    const toggleMenu = (show) => {
        if (show) {
            menu.style.display = 'block';
            // Force a reflow to ensure the slide transition plays
            void menu.offsetWidth;
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.remove('active');
            menu.style.display = 'block'; // Keep visible during transition
            setTimeout(() => {
                menu.style.display = ''; // Let CSS display: none take over
            }, 300);
            document.body.style.overflow = '';
        }
    };

    openBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    backdrop.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking a link
    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/**
 * Updates language switcher links to point to the current page in different languages.
 */
function updateLanguageSwitcher() {
    const currentPath = window.location.pathname;
    let fileName = currentPath.split('/').pop();
    if (!fileName || fileName === '') fileName = 'index.html';

    // Ensure we have .html if missing (though user wants it present)
    if (!fileName.includes('.')) fileName += '.html';

    const root = window.resRoot || '';
    const langs = ['en', 'pt', 'es'];

    langs.forEach(lang => {
        const desktopLink = document.getElementById(`lang-link-${lang}`);
        const mobileLink = document.getElementById(`mobile-lang-link-${lang}`);

        const target = new URL(root + lang + '/' + fileName, window.location.href);
        const href = target.pathname + target.search + target.hash;

        if (desktopLink) desktopLink.setAttribute('href', href);
        if (mobileLink) mobileLink.setAttribute('href', href);
    });
}

/**
 * Highlights the navigation link corresponding to the current page.
 */
function highlightActiveLink() {
    let currentPath = window.location.pathname;
    // Normalize index.html and root
    if (currentPath === '/' || currentPath === '') currentPath = '/index.html';

    const navLinks = document.querySelectorAll('nav a, .mobile-nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Create a normalized href for comparison (absolute-like for current dir)
        let normalizedHref = href;
        if (!href.startsWith('/') && !href.startsWith('http')) {
            // It's a relative link in the current directory
            const pathParts = window.location.pathname.split('/');
            pathParts.pop(); // Remove current filename
            normalizedHref = pathParts.join('/') + '/' + href;
            // Clean double slashes
            normalizedHref = normalizedHref.replace(/\/+/g, '/');
        }

        // Handle specific mapped pages for highlighting
        let isMatch = false;
        if (normalizedHref === currentPath || currentPath.endsWith('/' + href)) {
            isMatch = true;
        }

        if (isMatch) {
            link.classList.add('active');
        }

    });

    document.querySelectorAll('.nav-menu').forEach(menu => {
        const activeChild = menu.querySelector('.nav-submenu-link.active');
        const trigger = menu.querySelector('.nav-menu-trigger');
        if (activeChild && trigger) {
            trigger.classList.add('active');
        }
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    if (window.enableLanguageRedirect) return;

    const root = window.resRoot || '';

    // Load shared components.
    loadComponent('header-placeholder', root + 'components/header.html');
    loadComponent('footer-placeholder', root + 'components/footer.html');
});

/**
 * Translates UI elements based on the current language folder.
 * @param {string} context - 'header' or 'footer' or both/undefined
 */
function translateUI(context) {
    const validLangs = ['en', 'pt', 'es'];
    // Get language from path or default to en
    const pathParts = window.location.pathname.split('/');
    // Check if any of the path parts is a valid language
    const currentLang = pathParts.find(part => validLangs.includes(part)) || 'en';

    if (currentLang === 'en') return; // Default is English

    const translations = {
        'pt': {
            'header.home': 'Início',
            'header.what_we_do': 'O que fazemos',
            'header.ai_deployment': 'Implementação de IA',
            'header.fde': 'Engenharia Forward-Deployed',
            'header.odoo': 'Odoo',
            'header.integrations': 'Integração e Automação',
            'header.healthcare': 'Sistemas de Saúde',
            'header.ai_whatsapp_crm': 'WhatsApp + CRM com IA',
            'header.case_studies': 'Casos',
            'header.how_we_work': 'Como trabalhamos',
            'header.about': 'Sobre',
            'header.contact': 'Fale Conosco',
            'header.bring_problem': 'Falar sobre um problema',
            'header.language_select': 'Idioma',
            'footer.home': 'Início',
            'footer.navigation': 'Navegação',
            'footer.tools': 'Ferramentas',
            'footer.how_we_work': 'Como trabalhamos',
            'footer.ai_whatsapp_crm': 'Assistente de WhatsApp + CRM com IA',
            'footer.contact': 'Fale Conosco',
            'footer.privacy': 'Política de Privacidade',
            'footer.services': 'Serviços',
            'footer.ai_deployment': 'Implementação de IA',
            'footer.fde': 'Engenharia Forward-Deployed',
            'footer.odoo_work': 'Odoo',
            'footer.integration_work': 'Engenharia de Integração',
            'footer.healthcare_work': 'Sistemas de Saúde',
            'footer.ai_work': 'Assistente de WhatsApp + CRM com IA',
            'footer.registered': 'Registrada em Wyoming, EUA · hello@veridatapro.com',
            'footer.senior_led': 'Entrega liderada por profissionais seniores, com responsabilidade técnica direta.'
        },
        'es': {
            'header.home': 'Inicio',
            'header.what_we_do': 'Qué hacemos',
            'header.ai_deployment': 'Implementación de IA',
            'header.fde': 'Ingeniería Forward-Deployed',
            'header.odoo': 'Odoo',
            'header.integrations': 'Integración y Automatización',
            'header.healthcare': 'Sistemas de Salud',
            'header.ai_whatsapp_crm': 'WhatsApp + CRM con IA',
            'header.case_studies': 'Casos',
            'header.how_we_work': 'Cómo trabajamos',
            'header.about': 'Sobre nosotros',
            'header.contact': 'Contacto',
            'header.bring_problem': 'Hablar de un problema',
            'header.language_select': 'Idioma',
            'footer.home': 'Inicio',
            'footer.navigation': 'Navegación',
            'footer.tools': 'Herramientas',
            'footer.how_we_work': 'Cómo trabajamos',
            'footer.ai_whatsapp_crm': 'Asistente de WhatsApp + CRM con IA',
            'footer.contact': 'Contacto',
            'footer.privacy': 'Política de Privacidad',
            'footer.services': 'Servicios',
            'footer.ai_deployment': 'Implementación de IA',
            'footer.fde': 'Ingeniería Forward-Deployed',
            'footer.odoo_work': 'Odoo',
            'footer.integration_work': 'Ingeniería de Integración',
            'footer.healthcare_work': 'Sistemas de Salud',
            'footer.ai_work': 'Asistente de WhatsApp + CRM con IA',
            'footer.registered': 'Registrada en Wyoming, EE. UU. · hello@veridatapro.com',
            'footer.senior_led': 'Entrega liderada por profesionales sénior, con responsabilidad técnica directa.'
        }
    };

    const strings = translations[currentLang];
    if (!strings) return;

    const links = document.querySelectorAll('[data-i18n]');
    links.forEach(link => {
        const key = link.getAttribute('data-i18n');
        if (strings[key]) {
            link.textContent = strings[key];
        }
    });

    // Handle href translations (e.g. localized WhatsApp links)
    const hrefLinks = document.querySelectorAll('[data-i18n-href]');
    hrefLinks.forEach(link => {
        const key = link.getAttribute('data-i18n-href');
        if (strings[key]) {
            link.setAttribute('href', strings[key]);
        }
    });
}

// if (!window.enableLanguageRedirect) {
//     // Chatwoot Widget Initialization
//     const useCompactChatLauncher = window.matchMedia('(max-width: 640px)').matches;
//     window.chatwootSettings = { "position": "right", "launcherTitle": "Chat with us" };
//     if (!useCompactChatLauncher) {
//         window.chatwootSettings.type = "expanded_bubble";
//     }
//     (function (d, t) {
//         var BASE_URL = "https://chat.veridatapro.com";
//         var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
//         g.src = BASE_URL + "/packs/js/sdk.js";
//         g.async = true;
//         s.parentNode.insertBefore(g, s);
//         g.onload = function () {
//             window.chatwootSDK.run({
//                 websiteToken: 'wCRs91qZ7z6igvX8xQnot3p6',
//                 baseUrl: BASE_URL
//             })
//         }
//     })(document, "script");
// }
