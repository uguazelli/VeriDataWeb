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
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
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

    const enLink = document.getElementById('lang-link-en');
    const ptLink = document.getElementById('lang-link-pt');
    const esLink = document.getElementById('lang-link-es');

    const root = window.resRoot || '';

    if (enLink) enLink.setAttribute('href', root + 'en/' + fileName);
    if (ptLink) ptLink.setAttribute('href', root + 'pt/' + fileName);
    if (esLink) esLink.setAttribute('href', root + 'es/' + fileName);
}

/**
 * Highlights the navigation link corresponding to the current page.
 */
function highlightActiveLink() {
    let currentPath = window.location.pathname;
    // Normalize index.html and root
    if (currentPath === '/' || currentPath === '') currentPath = '/index.html';

    const navLinks = document.querySelectorAll('nav a');

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
    loadComponent('header-placeholder', root + 'components/header.html');
    loadComponent('footer-placeholder', root + 'components/footer.html');
});
