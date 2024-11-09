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
