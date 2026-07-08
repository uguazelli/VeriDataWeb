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

    // Load components
    loadComponent('header-placeholder', root + 'components/header.html');
    loadComponent('footer-placeholder', root + 'components/footer.html');
    // Convert prices to BRL on Portuguese pages
    convertPricesToBRL();
});

/**
 * Fetches the current USD to BRL exchange rate and updates price blocks on Portuguese pages.
 * If the API fails, the original USD values remain in the DOM as fallback.
 */
async function convertPricesToBRL() {
    const currentLang = (document.documentElement.lang || '').toLowerCase();
    const pathLang = window.location.pathname.split('/').find(part => part === 'pt');
    const isPortuguesePage = currentLang.startsWith('pt') || pathLang === 'pt';
    if (!isPortuguesePage) return;

    const priceNodes = document.querySelectorAll('.price-amount, .pricing-price');
    if (!priceNodes.length) return;

    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        const rate = Number(data?.rates?.BRL);
        if (!Number.isFinite(rate) || rate <= 0) return;

        const brlFormatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0
        });

        const parseUsdValue = value => Number(value.replace(/[.,]/g, ''));
        const roundToNearest50 = value => Math.round(value / 50) * 50;

        priceNodes.forEach(node => {
            if (node.dataset.currencyConverted === 'BRL') return;

            const originalText = node.textContent.replace(/\s+/g, ' ').trim();
            const match = originalText.match(/\$\s*([\d.,]+)/);
            if (!match) return;

            const usdValue = parseUsdValue(match[1]);
            if (!Number.isFinite(usdValue)) return;

            const prefix = originalText.slice(0, match.index).trim();
            const isMonthly = /\/\s*m[eê]s/i.test(originalText);
            const brlValue = brlFormatter.format(roundToNearest50(usdValue * rate)).replace(/\u00a0/g, ' ');
            const label = document.createElement('span');
            label.style.fontSize = '1rem';
            label.style.fontFamily = "'Public Sans', sans-serif";
            label.textContent = isMonthly ? '/ mês' : 'BRL';

            node.textContent = `${prefix ? prefix + ' ' : ''}${brlValue} `;
            node.appendChild(label);
            node.dataset.currencyConverted = 'BRL';
        });

    } catch (error) {
        console.warn('Failed to convert USD prices to BRL. Keeping USD fallback.', error);
    }
}

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
            'retainer.eyebrow': 'Suporte Contínuo de Integração',
            'retainer.heading': 'Mantenha o que está em produção monitorado, com dono e corrigido — antes que vire problema.',
            'retainer.intro': 'Uma integração que movimenta receita, financeiro ou operações precisa de um responsável depois de entrar no ar. Monitoramos suas integrações em produção, identificamos falhas antes dos seus clientes ou do financeiro, e as adaptamos conforme APIs e fornecedores mudam.',
            'retainer.per_month': 'USD/mês',
            'retainer.essentials.label': 'Essentials',
            'retainer.essentials.b1': 'Monitoramento das suas integrações em produção',
            'retainer.essentials.b2': 'Correção de problemas em até 2 dias úteis',
            'retainer.essentials.b3': 'Reunião mensal + relatório de saúde escrito',
            'retainer.essentials.b4': 'Suporte assíncrono por e-mail ou WhatsApp',
            'retainer.standard.label': 'Standard — A maioria dos clientes',
            'retainer.standard.b1': 'Tudo do Essentials',
            'retainer.standard.b2': 'Resposta no próximo dia útil, no mesmo dia em falhas críticas',
            'retainer.standard.b3': 'Adaptações simples inclusas — mudanças de campos, versões de API, ajustes de fornecedor',
            'retainer.standard.b4': 'Reunião mensal + relatório de saúde escrito',
            'retainer.priority.label': 'Priority',
            'retainer.priority.b1': 'Tudo do Standard',
            'retainer.priority.b2': 'Resposta a incidente crítico com prazo definido',
            'retainer.priority.b3': 'Todas as suas integrações cobertas',
            'retainer.priority.b4': 'Bloco mensal de horas para pequenas melhorias (6–8 h)',
            'retainer.priority.b5': 'Agendamento prioritário',
            'retainer.scope_note': 'Cobre manter suas integrações em produção funcionando — monitoramento, correções e adaptações a mudanças de APIs e fornecedores. Novas construções e novas integrações são orçadas separadamente.',
            'retainer.wa_cta': 'Falar pelo WhatsApp',
            'retainer.wa_href': 'https://wa.me/17405208080?text=Oi%20Ugo%2C%20gostaria%20de%20conversar%20sobre%20uma%20integra%C3%A7%C3%A3o.',
            'header.home': 'Início',
            'header.services': 'Serviços',
            'header.odoo': 'Integrações Odoo',
            'header.integrations': 'Integrações',
            'header.healthcare_integration': 'Integrações de Saúde',
            'header.ai_whatsapp_crm': 'WhatsApp + CRM com IA',
            'header.pricing': 'Preços',
            'header.contact': 'Fale Conosco',
            'header.book_call': 'Agendar revisão gratuita de integração',
            'header.language_select': 'Idioma',
            'footer.home': 'Início',
            'footer.navigation': 'Navegação',
            'footer.tools': 'Ferramentas',
            'footer.integrations': 'Integrações',
            'footer.ai_whatsapp_crm': 'Assistente de WhatsApp + CRM com IA',
            'footer.pricing': 'Preços',
            'footer.contact': 'Fale Conosco',
            'footer.privacy': 'Política de Privacidade',
            'footer.odoo': 'Integrações Odoo',
            'footer.services': 'Serviços',
            'footer.odoo_work': 'Integração e Automação com Odoo',
            'footer.integration_work': 'Integrações de Sistemas',
            'footer.healthcare_work': 'Integração de Sistemas de Saúde',
            'footer.ai_work': 'Assistente de WhatsApp + CRM com IA',
            'footer.pricing_work': 'Preços e Pontos de Entrada',
            'footer.registered': 'Registrada em Wyoming, EUA · hello@veridatapro.com',
            'footer.no_outsourcing': 'Todos os projetos são liderados por arquiteto. Sem terceirização. Sem alocação de mão de obra técnica.'
        },
        'es': {
            'retainer.eyebrow': 'Soporte Continuo de Integración',
            'retainer.heading': 'Mantén lo que está en producción con dueño, monitoreado y resuelto — antes de que te cueste caro.',
            'retainer.intro': 'Una integración que mueve ingresos, finanzas u operaciones necesita un responsable después de salir a producción. Monitoreamos tus integraciones en vivo, detectamos fallas antes que tus clientes o el equipo financiero, y las adaptamos cuando cambian las APIs y los proveedores.',
            'retainer.per_month': 'USD/mes',
            'retainer.essentials.label': 'Essentials',
            'retainer.essentials.b1': 'Monitoreo de tus integraciones en producción',
            'retainer.essentials.b2': 'Corrección de errores en hasta 2 días hábiles',
            'retainer.essentials.b3': 'Llamada mensual de revisión + informe escrito de salud',
            'retainer.essentials.b4': 'Consultas asíncronas por email o WhatsApp',
            'retainer.standard.label': 'Standard — La mayoría elige este',
            'retainer.standard.b1': 'Todo lo del Essentials',
            'retainer.standard.b2': 'Respuesta al siguiente día hábil, mismo día en fallas críticas',
            'retainer.standard.b3': 'Adaptaciones menores incluidas — campos, versiones de API, ajustes de proveedores',
            'retainer.standard.b4': 'Llamada mensual de revisión + informe escrito de salud',
            'retainer.priority.label': 'Priority',
            'retainer.priority.b1': 'Todo lo del Standard',
            'retainer.priority.b2': 'Respuesta a incidentes críticos con tiempos definidos',
            'retainer.priority.b3': 'Todas tus integraciones cubiertas',
            'retainer.priority.b4': 'Bloque mensual de horas de cambio (6–8 h) para mejoras puntuales',
            'retainer.priority.b5': 'Programación prioritaria',
            'retainer.scope_note': 'Cubre mantener tus integraciones en producción funcionando — monitoreo, correcciones y adaptación a cambios de APIs y proveedores. Desarrollos nuevos e integraciones nuevas se cotizan por separado.',
            'retainer.wa_cta': 'Hablar por WhatsApp',
            'retainer.wa_href': 'https://wa.me/17405208080?text=Hola%20Ugo%2C%20quisiera%20hablar%20sobre%20una%20integraci%C3%B3n.',
            'header.home': 'Inicio',
            'header.services': 'Servicios',
            'header.odoo': 'Integraciones Odoo',
            'header.integrations': 'Integraciones',
            'header.healthcare_integration': 'Integraciones de Salud',
            'header.ai_whatsapp_crm': 'WhatsApp + CRM con IA',
            'header.pricing': 'Precios',
            'header.contact': 'Contacto',
            'header.book_call': 'Agendar revisión gratuita de integración',
            'header.language_select': 'Idioma',
            'footer.home': 'Inicio',
            'footer.navigation': 'Navegación',
            'footer.tools': 'Herramientas',
            'footer.integrations': 'Integraciones',
            'footer.ai_whatsapp_crm': 'Asistente de WhatsApp + CRM con IA',
            'footer.pricing': 'Precios',
            'footer.contact': 'Contacto',
            'footer.privacy': 'Política de Privacidad',
            'footer.odoo': 'Integraciones Odoo',
            'footer.services': 'Servicios',
            'footer.odoo_work': 'Integración y Automatización de Odoo',
            'footer.integration_work': 'Integraciones de Sistemas',
            'footer.healthcare_work': 'Integración de Sistemas de Salud',
            'footer.ai_work': 'Asistente de WhatsApp + CRM con IA',
            'footer.pricing_work': 'Precios y Puntos de Entrada',
            'footer.registered': 'Registrada en Wyoming, EE. UU. · hello@veridatapro.com',
            'footer.no_outsourcing': 'Todos los proyectos son liderados por un arquitecto. Sin tercerización. Sin venta de horas técnicas.'
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
