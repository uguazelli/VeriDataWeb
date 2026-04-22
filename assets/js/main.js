/**
 * Loads a reusable HTML component into a target element.
 * @param {string} elementId - The ID of the DOM element to inject content into.
 * @param {string} filePath - The path to the HTML component file.
 */
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Update language switcher links if root is defined
        if (window.resRoot) {
            updateLanguageSwitcher();

            // Update relative image sources
            const relativeImages = document.getElementById(elementId).querySelectorAll('[data-relative-src="true"]');
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
            const placeholder = document.getElementById(elementId);
            placeholder.classList.add('sticky', 'top-0', 'z-50', 'w-full');
            
            highlightActiveLink();
            setupMobileMenu();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

/**
 * Handles Web3Forms contact form submission via AJAX.
 */
function handleContactForm() {
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!form || !result) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Prevent double submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Sending...';
        }

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Processing...";
        result.classList.remove('hidden', 'text-red-500', 'text-success');

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.classList.add('text-success');
                    result.innerHTML = document.querySelector('[data-i18n="contact.success"]')?.textContent || "Success!";
                    form.reset();
                } else {
                    console.log(response);
                    result.classList.add('text-red-500');
                    result.innerHTML = document.querySelector('[data-i18n="contact.error"]')?.textContent || "Something went wrong!";
                }
            })
            .catch(error => {
                console.log(error);
                result.classList.add('text-red-500');
                result.innerHTML = document.querySelector('[data-i18n="contact.error"]')?.textContent || "Something went wrong!";
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    const originalText = document.querySelector('[data-i18n="contact.submit"]')?.textContent || "Send Message";
                    submitBtn.innerHTML = originalText + ' <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>';
                }
            });
    });
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
            menu.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('translate-x-full');
            }, 10);
            document.body.classList.add('overflow-hidden');
        } else {
            content.classList.add('translate-x-full');
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
            document.body.classList.remove('overflow-hidden');
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

    // Map of specific page names that change across languages (now all same names)
    const pageMap = {};

    const root = window.resRoot || '';
    const langs = ['en', 'pt', 'es'];

    langs.forEach(lang => {
        const desktopLink = document.getElementById(`lang-link-${lang}`);
        const mobileLink = document.getElementById(`mobile-lang-link-${lang}`);

        let targetFile = fileName;
        // If the current file has a translation mapping, use it
        const href = root + lang + '/' + targetFile;

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
            link.classList.add('text-primary');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
        }
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    const root = window.resRoot || '';

    // Load components
    loadComponent('header-placeholder', root + 'components/header.html');
    loadComponent('footer-placeholder', root + 'components/footer.html');

    // Initialize contact form separately to ensure it only runs once
    if (document.getElementById('contact-form')) {
        handleContactForm();
    }

    // Convert prices to BRL on Portuguese pages
    convertPricesToBRL();
});

/**
 * Fetches the current USD to BRL exchange rate and updates all prices on 'pt' pages.
 */
async function convertPricesToBRL() {
    // Only run on pages explicitly marked as Portuguese
    if (document.documentElement.lang !== 'pt') return;
    
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) return;
        const data = await response.json();
        const rate = data.rates.BRL;
        if (!rate) return;

        // Recursive function to walk and process text nodes
        function walkTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const regex = /\$\s*([\d\.,]+)(?:(\s*(?:–|-|a)\s*)(?:US\$\s*|\$\s*)?([\d\.,]+))?/g;
                let originalText = node.textContent;
                
                let newText = originalText.replace(regex, (match, p1, sep, p2) => {
                    const parseVal = val => parseFloat(val.replace(/\./g, '').replace(/,/g, ''));
                    const formatVal = val => {
                        const converted = val * rate;
                        return (Math.round(converted / 500) * 500).toLocaleString('pt-BR');
                    };
                    
                    let result = `R$ ${formatVal(parseVal(p1))}`;
                    if (p2 && sep) {
                        result += `${sep}${formatVal(parseVal(p2))}`;
                    }
                    return result;
                });
                
                if (originalText !== newText) {
                    node.textContent = newText;
                }
            } else {
                // Skip processing scripts, styles, and inputs
                const tag = node.nodeName;
                if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
                    // Create a static array of children because we might modify the DOM (though text content replacement doesn't usually alter NodeList length, it's safer)
                    Array.from(node.childNodes).forEach(walkTextNodes);
                }
            }
        }

        walkTextNodes(document.body);

    } catch (error) {
        console.error('Failed to convert prices to BRL:', error);
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
            'header.home': 'Início',
            'header.leadership': 'Liderança',
            'header.contact': 'Fale Conosco',
            'contact.title': 'Entre em Contato',
            'contact.subtitle': 'Como podemos ajudar a transformar sua arquitetura?',
            'contact.label_name': 'Nome Completo',
            'contact.label_email': 'E-mail Corporativo',
            'contact.label_subject': 'Assunto',
            'contact.label_company': 'Empresa',
            'contact.label_message': 'Mensagem',
            'contact.submit': 'Enviar Mensagem',
            'contact.success': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            'contact.error': 'Ocorreu um erro. Por favor, tente novamente.',
            'footer.home': 'Início',
            'footer.revops': 'RevOps',
            'footer.integrations': 'Integrações',
            'footer.cybersecurity': 'Cibersegurança',
            'footer.leadership': 'Liderança',
            'footer.academy': 'Academia',
            'footer.privacy': 'Política de Privacidade'
        },
        'es': {
            'header.home': 'Inicio',
            'header.leadership': 'Liderazgo',
            'header.contact': 'Contacto',
            'contact.title': 'Póngase en Contacto',
            'contact.subtitle': '¿Cómo podemos ayudar a transformar su arquitectura?',
            'contact.label_name': 'Nombre Completo',
            'contact.label_email': 'Correo Corporativo',
            'contact.label_subject': 'Asunto',
            'contact.label_company': 'Empresa',
            'contact.label_message': 'Mensaje',
            'contact.submit': 'Enviar Mensaje',
            'contact.success': '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
            'contact.error': 'Ocurrió un error. Por favor, inténtelo de nuevo.',
            'footer.home': 'Inicio',
            'footer.revops': 'RevOps',
            'footer.integrations': 'Integraciones',
            'footer.cybersecurity': 'Ciberseguridad',
            'footer.leadership': 'Liderazgo',
            'footer.academy': 'Academia',
            'footer.privacy': 'Política de Privacidad'
        }
    };

    const strings = translations[currentLang];
    if (!strings) return;

    // Select all elements with data-i18n
    // If context is provided, we can scope it, but for now global replacement is fine within the loaded component
    // effectively we are calling this inside loadComponent which targets specific ID,
    // BUT we need to target the elementId passed to loadComponent.
    // However, the function `translateFooter` before was global.
    // Let's stick to valid document querySelector since loadComponent injects into document.

    // We should only translate elements relevant to the component we just loaded if we want to be safe,
    // or just run it on everything.
    const links = document.querySelectorAll('[data-i18n]');
    links.forEach(link => {
        const key = link.getAttribute('data-i18n');
        // Only translate if key starts with the context (header. or footer.) if context is strict,
        // but here we can just check if key exists in strings
        if (strings[key]) {
            link.textContent = strings[key];
        }
    });
}

// Deprecated: kept for backward compatibility if needed, but translateUI replaces it
function translateFooter() {
    translateUI('footer');
}

// Chatwoot Widget Initialization
window.chatwootSettings = { "position": "right", "type": "expanded_bubble", "launcherTitle": "Chat with us" };
(function (d, t) {
    var BASE_URL = "https://chat.veridatapro.com";
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = BASE_URL + "/packs/js/sdk.js";
    g.async = true;
    s.parentNode.insertBefore(g, s);
    g.onload = function () {
        window.chatwootSDK.run({
            websiteToken: 'wCRs91qZ7z6igvX8xQnot3p6',
            baseUrl: BASE_URL
        })
    }
})(document, "script");
