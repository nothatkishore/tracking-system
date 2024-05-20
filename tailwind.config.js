	/** @type {import('tailwindcss').Config} */
	export default {
	  content: [
	    "./index.html",
	    "./src/**/*.{js,ts,jsx,tsx}",
	  ],
	  theme: {
	    extend: {
        backgroundImage : {
          'custom-radial' : 'linear-gradient(to right, #434343 0%, black 100%)',
        },
      },
	  },
	  plugins: [],
	}