import './assets/main.css'
import 'daisyui/dist/full.css'
import { createApp } from 'vue'
import App from './App.vue';
// import "path/to/daisyui.css";
import { DaisyUI } from "daisyui";

const app = createApp(App);

app.use(DaisyUI, {
  theme: 'light'
});

app.mount("#app");
