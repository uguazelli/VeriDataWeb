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
            const langLinks = document.getElementById(elementId).querySelectorAll('[data-lang-link="true"]');
            langLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    link.setAttribute('href', window.resRoot + href);
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
 * Highlights the navigation link corresponding to the current page.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Simple check: if href matches the end of the current path
        if (href === currentPath || (currentPath === '/' && href === '/index.html') || (currentPath === '/' && href === 'index.html')) {
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
