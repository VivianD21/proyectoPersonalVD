<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid px-3 d-flex align-items-center justify-content-between">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img :src="logo" alt="logo" class="logo-img" />
        <span class="visually-hidden">tickets</span>
      </router-link>

      <!-- Botón carrito en mobile (fuera del collapse) -->
      <button
        class="btn btn-white navbar-cart-btn d-lg-none"
        @click="openCart"
        aria-label="Abrir carrito"
      >
        🛒 <span class="ms-1 cart-count">{{ cartCount }}</span>
      </button>

      <!-- Menú colapsable -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">&#9776;</span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/contact">Contacto</router-link></li>

          <li class="nav-item" v-if="!currentUser">
            <router-link class="nav-link" to="/login">Ingresar</router-link>
          </li>

          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              {{ currentUser.name || 'Cuenta' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-dark">
              <li class="px-3 py-2">
                <div class="small text-white">Usuario: <strong>{{ currentUser.name }}</strong></div>
                <div class="small text-muted">{{ currentUser.email }}</div>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item logout-btn text-white" @click.prevent="handleLogout">
                  Salir
                </button>
              </li>
            </ul>
          </li>

          <!-- Botón carrito en pantallas grandes -->
          <li class="nav-item ms-2 d-none d-lg-block">
            <button class="btn btn-white" @click="openCart">Carrito ({{ cartCount }})</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '/src/assets/logo.png'
import { useAuthStore } from '@/stores/auth' // IMPORTAR SOLO UNA VEZ

export default {
  name: 'Navbar',
  props: {
    cart: { type: Array, default: () => [] }
  },
  emits: ['open-cart'],
  setup (props, { emit }) {
    const router = useRouter()
    const logo = logoImg

    // Usar el store de auth una sola vez
    const auth = useAuthStore()

    // currentUser: proviene del store si está disponible, si no usa localStorage
    const currentUser = ref(null)

    function readUserFromLocal () {
      try {
        const u = JSON.parse(localStorage.getItem('tickets_user'))
        return u && u.email ? u : null
      } catch {
        return null
      }
    }

    function updateUser () {
      if (auth && auth.user) {
        // Si auth.user es un ref, leer su valor; si es objeto, usarlo directamente
        currentUser.value = auth.user && auth.user.value !== undefined ? auth.user.value : auth.user || readUserFromLocal()
      } else {
        currentUser.value = readUserFromLocal()
      }
    }

    onMounted(() => {
      updateUser()
      window.addEventListener('storage', updateUser)
      window.addEventListener('tickets-user-updated', updateUser)
    })

    onUnmounted(() => {
      window.removeEventListener('storage', updateUser)
      window.removeEventListener('tickets-user-updated', updateUser)
    })

    const cartCount = computed(() =>
      (props.cart || []).reduce((s, it) => s + (it.quantity || 0), 0)
    )

    function openCart () {
      emit('open-cart')
      window.dispatchEvent(new CustomEvent('open-cart'))
    }

    async function handleLogout () {
      try {
        await auth.logout()
      } catch (err) {
        console.error('Navbar logout error', err)
        try { window.alert('Su sesión se ha cerrado correctamente') } catch {}
        try { router.push({ name: 'Home' }) } catch { window.location.href = '/' }
      }
    }

    return { logo, currentUser, cartCount, openCart, handleLogout }
  }
}
</script>

<style scoped>
.navbar-custom {
  background: var(--brand-gradient);
  padding: .4rem 0;
  position: relative;
  z-index: 3000;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.navbar-custom .collapse { position: relative; z-index: 1999; }
.navbar-custom .collapse.show { z-index: 2000; }
.dropdown-menu.bg-dark { background: #07203a !important; border: none; }
.logo-img { width: 150px; max-width: 100%; height: auto; display: block; }
@media (max-width: 576px) { .logo-img { width: 20vw; } }
.navbar-cart-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  z-index: 9000;
  padding: .35rem .6rem;
  border-radius: 6px;
  background: var(--btn-bg);
  color: var(--btn-text);
  border: 1px solid rgba(0,0,0,0.06);
}
.cart-count { font-weight: 600; }
.logout-btn { transition: background-color .12s ease, color .12s ease; }
.logout-btn:hover { background: #00ffff !important; color: #000 !important; }
.logout-btn:active { background: #00ffff !important; color: #fff !important; }
</style>
