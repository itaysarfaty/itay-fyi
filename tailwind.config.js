import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    sm: '600px',
                    md: '640px',
                },
            },
            animation: {
                'spin-slow': 'spin 5s linear infinite',
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
                serif: ['var(--font-serif)', ...fontFamily.serif],
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                primary: 'hsl(var(--primary))',
            },
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        function ({ addUtilities }) {
            addUtilities({
                '.big-dash': {
                    'border-width': '5px',
                    'border-style': 'solid',
                    'border-image':
                        'linear-gradient(90deg, black 50%, rgba(255, 255, 255, 0) 0%) 5',
                },
            })
        },
    ],
}
