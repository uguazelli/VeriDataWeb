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

    // Map of specific page names that change across languages
    const pageMap = {
        'leadership.html': { 'pt': 'lideranca.html', 'es': 'liderazgo.html' },
        'lideranca.html': { 'en': 'leadership.html', 'es': 'liderazgo.html' },
        'liderazgo.html': { 'en': 'leadership.html', 'pt': 'lideranca.html' }
    };

    const root = window.resRoot || '';
    const langs = ['en', 'pt', 'es'];

    langs.forEach(lang => {
        const desktopLink = document.getElementById(`lang-link-${lang}`);
        const mobileLink = document.getElementById(`mobile-lang-link-${lang}`);

        let targetFile = fileName;
        // If the current file has a translation mapping, use it
        if (pageMap[fileName] && pageMap[fileName][lang]) {
            targetFile = pageMap[fileName][lang];
        } else if (pageMap[fileName] && lang === 'en' && fileName === 'leadership.html') {
            // Already correct
        } else if (pageMap[fileName] && lang === 'pt' && fileName === 'lideranca.html') {
            // Already correct
        } else if (pageMap[fileName] && lang === 'es' && fileName === 'liderazgo.html') {
            // Already correct
        } else if (pageMap[fileName]) {
            // Fallback if needed, but the map above covers cross-lang
            if (fileName === 'leadership.html' && lang === 'en') targetFile = 'leadership.html';
            if (fileName === 'lideranca.html' && lang === 'pt') targetFile = 'lideranca.html';
            if (fileName === 'liderazgo.html' && lang === 'es') targetFile = 'liderazgo.html';
        }

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
        } else {
            // Check if we are on a localized version of the link
            const fileName = currentPath.split('/').pop();
            if (href === 'leadership.html' && (fileName === 'lideranca.html' || fileName === 'liderazgo.html')) {
                isMatch = true;
            }
        }

        if (isMatch) {
            link.classList.add('text-primary');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const root = window.resRoot || '';

    // Check if placeholders exist, if not, try to init menu on hardcoded header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        loadComponent('header-placeholder', root + 'components/header.html');
    } else {
        // Handle hardcoded header
        setupMobileMenu();
        highlightActiveLink();
        if (window.resRoot) updateLanguageSwitcher();
    }

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
            'header.revops': 'RevOps',
            'header.integrations': 'Integrações',
            'header.leadership': 'Liderança',
            'footer.home': 'Início',
            'footer.revops': 'RevOps',
            'footer.integrations': 'Integrações',
            'footer.leadership': 'Liderança',
            'footer.academy': 'Academia',
            'footer.privacy': 'Política de Privacidade'
        },
        'es': {
            'header.home': 'Inicio',
            'header.revops': 'RevOps',
            'header.integrations': 'Integraciones',
            'header.leadership': 'Liderazgo',
            'footer.home': 'Inicio',
            'footer.revops': 'RevOps',
            'footer.integrations': 'Integraciones',
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
