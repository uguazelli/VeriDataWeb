/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./en/**/*.html", "./pt/**/*.html", "./es/**/*.html", "./components/**/*.html", "./assets/js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    hover: 'var(--color-primary-hover)',
                    dark: 'var(--color-primary-dark)',
                    light: 'var(--color-primary-light)',
                },
                secondary: 'var(--color-secondary)',
                "background-light": "#f5f6f8", // Consolidated
                "background-dark": "#121121",
                "surface-white": "#ffffff",
                "surface-offwhite": "#f1f5f9",
                "text-main": "#1e293b",
                "text-muted": "#64748b",
                "border-light": "#e2e8f0",
                "slate-custom": "#0f0e1b",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
