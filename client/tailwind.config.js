/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				accent: "#E91E63",
				darkblack: "#111110",
				secondary: "#222221",
			},
		},
	},
	plugins: [],
};
