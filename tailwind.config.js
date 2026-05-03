/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-color': '#df678c',
				'primary-color-light': '#FD8C91',
				'text-gray-primary-color': '#FD8C91',
				'secondary-color': '#009B81',
				'tertiary-color': '#3F4D71',
				'dark-primary-bg-color': '#111',
				'dark-primary-color': '',
				'dark-primary-text-color': '#f3f6f4',
				'dark-secondary-color': '',
				'dark-tertiary-color': '',
				'bg-primary': '#faf9f6',
				'bg-primary-dark': '#0f0f0f',
				'text-heading': '#111111',
				'text-heading-dark': '#f3f6f4',
				'text-body': '#6b6b6b',
				'text-body-dark': '#a0a0a0',
				'text-meta': '#9ca3af',
				'text-meta-dark': '#6b7280',
				'border-color': '#e5e5e5',
				'border-color-dark': '#262626',
			},
			screens: {
				'2xl': '1536px',
			}

		},
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
		},

	},
	plugins: [],
	darkMode: 'selector',
}
