import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import 'bootstrap-icons/font/bootstrap-icons.css';
import "@fontsource/poppins";

import "@/assets/css/root.css";
import "@/assets/css/common.css";
import "@/assets/css/custom.css";


const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
