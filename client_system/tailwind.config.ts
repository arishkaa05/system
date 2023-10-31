import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: ["light"], // Укажите только "light" вместо ["light", "dark", "cupcake"]
  },
  plugins: [daisyui],
};