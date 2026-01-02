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

    const root = window.resRoot || '';
    const langs = ['en', 'pt', 'es'];

    langs.forEach(lang => {
        const desktopLink = document.getElementById(`lang-link-${lang}`);
        const mobileLink = document.getElementById(`mobile-lang-link-${lang}`);
        const href = root + lang + '/' + fileName;

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

        if (normalizedHref === currentPath || currentPath.endsWith('/' + href)) {
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
