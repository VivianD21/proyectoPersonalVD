import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

// crear e instalar Pinia antes de acceder a cualquier store
const pinia = createPinia()
app.use(pinia)
app.use(router)

// proteger montaje único y manejar HMR
async function bootstrap() {
  // inicializar auth (initAuth0 dentro del store)
  try {
    // obtener el store correctamente a través de la instancia de Pinia
    const auth = useAuthStore()

    
console.log('Auth0 env at bootstrap:', {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin
})



  await auth.init({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID
})
  } catch (err) {
    // si falla inicializar Auth0, seguimos con la app (fallback local)
    console.warn('Auth init failed (main bootstrap):', err)
  }

  // montar la app solo una vez
  if (!window.__VUE_APP_MOUNTED__) {
    app.mount('#app')
    window.__VUE_APP_MOUNTED__ = true
  }
}

bootstrap()

// HMR: desmontar la app al recargar módulos para evitar montajes dobles
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    try { app.unmount() } catch (e) { /* ignore */ }
    window.__VUE_APP_MOUNTED__ = false
  })
}
