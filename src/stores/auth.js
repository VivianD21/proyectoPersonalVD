// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { initAuth0, getAuth0 } from '../services/auth0'
import { useNotificationStore } from '@/stores/notification'
import  authLocal  from '@/services/auth-local'


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const router = useRouter()

  const notification = useNotificationStore()
  
  const init = async (opts = {}) => {
    loading.value = true
    try {
      await initAuth0(opts)
      const a = getAuth0()
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        try {
          await a.handleRedirectCallback()
          window.history.replaceState({}, document.title, window.location.pathname)
        } catch (cbErr) {
          console.error('Auth0 handleRedirectCallback error:', cbErr)
        }
      }
      const isAuth = await a.isAuthenticated()
      user.value = isAuth ? await a.getUser() : null
    } catch (err) {
      console.warn('Auth init failed, falling back to local auth. Error:', err)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async ({ email, password } = {}) => {
  // 1) Intentar el flujo Auth0 (redirect) si el SDK está inicializado
  try {
    const a = getAuth0()


    console.log('Auth0 login requested:', {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  auth0ClientPresent: Boolean(a),
  redirectUri: window.location.origin
})


    if (a) {
      // Inicia el flujo de redirect a Auth0; la finalización se procesa en init() con handleRedirectCallback
      await a.loginWithRedirect()
      return
    }
  } catch (err) {
    // Si no hay Auth0 o falla, caemos al fallback local
    console.warn('Auth0 no disponible para loginWithRedirect, usando fallback local', err)
  }

  // 2) Fallback local: credenciales contra localStorage / demo user
  try {
    const userInfo = await authLocal.login({ email, password })
    // persistir localmente para otras partes de la app
    try { localStorage.setItem('tickets_user', JSON.stringify(userInfo)) } catch (e) {}
    user.value = userInfo
    return userInfo
  } catch (localErr) {
    // Propagar el error para que el componente de login lo muestre
    throw localErr
  }
}


  const logout = async () => {
  // 1) limpieza local inmediata
  try { localStorage.removeItem('tickets_user') } catch (e) {}

  user.value = null
  window.dispatchEvent(new Event('tickets-user-updated'))

  // 2) navegar localmente al Home
  try {
    await router.push({ name: 'Home' })
  } catch (e) {
    try { window.location.href = '/' } catch {}
  }

  // 3) mostrar notificación / popup local
  try {
    notification.show('Su sesión se ha cerrado correctamente', 4000)
  } catch (e) {
    try { window.alert('Su sesión se ha cerrado correctamente') } catch {}
  }

  // 4) NO llamar a Auth0 logout aquí (evita redirección externa y la página OK)
}




  return { user, loading, init, login, logout }
})
