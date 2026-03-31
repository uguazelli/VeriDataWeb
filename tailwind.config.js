/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./en/**/*.html", "./pt/**/*.html", "./es/**/*.html", "./components/**/*.html", "./assets/js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB',
                    hover: '#1D4ED8',
                    dark: '#1E40AF',
                    light: '#DBEAFE',
                },
                secondary: '#1E293B',
                "background-light": "#F8FAFC",
                "background-dark": "#0F172A",
                "surface-white": "#FFFFFF",
                "surface-offwhite": "#F1F5F9",
                "text-main": "#1E293B",
                "text-muted": "#64748B",
                "border-light": "#CBD5E1",
                "success": "#059669",
            },
            fontFamily: {
                display: ["'IBM Plex Sans'", "sans-serif"],
                body: ["'IBM Plex Sans'", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"],
            },
            borderRadius: {
                DEFAULT: "4px",
                sm: "4px",
                md: "4px",
                lg: "4px",
                xl: "4px",
                '2xl': "4px",
                '3xl': "4px",
                full: "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
