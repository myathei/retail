
import {createPinia} from 'pinia'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'

const app = createApp(App)

const queryClient = new QueryClient();
app.use(VueQueryPlugin, { queryClient });

const pinia = createPinia()

app.use(router)
app.use(pinia)


app.mount('#app')