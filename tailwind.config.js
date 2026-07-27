/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-color': 'rgb(var(--color-primary) / <alpha-value>)',
				'primary-color-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
				'secondary-color': 'rgb(var(--color-secondary) / <alpha-value>)',
				'secondary-color-light': 'rgb(var(--color-secondary-light) / <alpha-value>)',
				'accent-green': '#2f8f72',
				'accent-amber': '#c4862d',
				'ink': '#17130f',
				'ink-dark': '#f5efe7',
				'tertiary-color': '#26344d',
				'dark-primary-bg-color': '#111',
				'dark-primary-text-color': '#f3f6f4',
				'bg-primary': '#fbfaf7',
				'bg-primary-dark': '#101113',
				'surface': '#ffffff',
				'surface-dark': '#17191d',
				'surface-muted': '#eef0ea',
				'surface-muted-dark': '#202228',
				'text-heading': '#161616',
				'text-heading-dark': '#f4f1eb',
				'text-body': '#555a60',
				'text-body-dark': '#b8b0a6',
				'text-meta': '#818892',
				'text-meta-dark': '#7e8794',
				'border-color': '#e2e4dc',
				'border-color-dark': '#2a2d34',
			},
			boxShadow: {
				'soft-line': '0 18px 45px rgba(35, 27, 18, 0.06)',
				'editorial': '0 28px 80px rgba(23, 19, 15, 0.16)',
			},
			screens: {
				'2xl': '1536px',
			}

		},
		fontFamily: {
			sans: ["Lato", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
			poppins: ["Poppins", "sans-serif"],
		},

	},
	plugins: [],
	darkMode: 'selector',
}
