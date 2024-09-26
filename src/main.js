import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/tailwind.css" //追加
import router from './router' // 追加
import pinia from './store' // 追加

// createApp(App).mount('#app')

const app = createApp(App)

app.use(router) // 追加
app.use(pinia) // 追加
app.mount('#app')
