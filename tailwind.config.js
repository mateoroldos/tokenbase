import { fontFamily } from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: '#D9EBEB',
				input: '#D9EBEB',
				ring: '#D7D7D7',
				background: '#FFFFFF',
				foreground: '#DEDEDE',
				primary: {
					DEFAULT: '#A4BA97',
					foreground: '#FFEBE5'
				},
				secondary: {
					DEFAULT: '#B9FFCE',
					foreground: '#395D61'
				},
				destructive: {
					DEFAULT: '#00436B',
					foreground: '#D6F5F6'
				},
				muted: {
					DEFAULT: '#D6F5F6',
					foreground: '#27AECC'
				},
				accent: {
					DEFAULT: '#AF7600',
					foreground: '#717272'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#FFD8A8'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#DEDEDE'
				}
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25em'
			},
			fontFamily: {
				sans: ['arial']
			}
		}
	},
	plugins: [tailwindcssAnimate]
}

export default config
