<template>
  <div id="app">
    <!-- Single Navbar instance for the whole app -->
    <Navbar :cart="cart" @open-cart="openCart" />

    <!-- Router view: render each route component and pass cart + handlers as props/events -->
    <router-view v-slot="{ Component }">
      <component
        :is="Component"
        :cart="cart"
        @add-to-cart="addToCart"
      />
    </router-view>

    <!-- Single CartDetail popup instance controlled from App -->
    <CartDetail
      v-if="showCart"
      :items="cart"
      @remove-item="removeItem"
      @clear-cart="clearCart"
      @close="closeCart"
      @checkout="onCheckout"
    />
    <Notification />

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import CartDetail from './components/CartDetail.vue'
import Notification from '@/components/Notification.vue'


export default {
  name: 'App',
 components: { Navbar, CartDetail, Notification },

  setup() {
    const router = useRouter()
    const route = useRoute()

    // single source of truth for cart and popup visibility
    const cart = ref([]) // array of { product, quantity }
    const showCart = ref(false)

    function addToCart({ product, quantity }) {
      const qty = Number(quantity) || 1
      const existing = cart.value.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity = Math.min(product.stock || Infinity, existing.quantity + qty)
      } else {
        cart.value.push({ product, quantity: Math.min(product.stock || qty, qty) })
      }
    }

    function removeItem(id) {
      cart.value = cart.value.filter(i => i.product.id !== id)
    }

    function clearCart() {
      cart.value = []
    }

    function openCart() {
      showCart.value = true
    }

    function closeCart() {
      showCart.value = false
    }

    // Checkout handler: close popup and navigate to /checkout (create view if needed)
    function onCheckout() {
      closeCart()
      router.push({ name: 'Checkout' }).catch(() => {
        // If route not found, fallback to Home
        router.push({ name: 'Home' })
      })
    }

    // Detect ?logged_out=1 on app load and show popup + navigate to Home
    onMounted(() => {
      try {
        const params = new URLSearchParams(window.location.search)
        if (params.get('logged_out') === '1') {
          // show popup
          window.alert('Su sesión se ha cerrado correctamente')
          // remove query param without reload
          const url = new URL(window.location.href)
          url.searchParams.delete('logged_out')
          window.history.replaceState({}, document.title, url.pathname + url.search)
          // ensure user is on Home
          if (route.name !== 'Home') {
            router.push({ name: 'Home' }).catch(() => {})
          }
        }
      } catch (e) {
        // do not block app if something fails
        console.error('Error checking logged_out param', e)
      }
    })

    // fallback: listen to a global event only if some legacy code triggers it
    const handler = () => openCart()
    if (typeof window !== 'undefined') window.addEventListener('open-cart', handler)

    // cleanup listener on unmount to avoid duplicates
    onUnmounted(() => {
      if (typeof window !== 'undefined') window.removeEventListener('open-cart', handler)
    })

    return {
      cart,
      showCart,
      addToCart,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      onCheckout
    }
  }
}
</script>

<style>
/* Keep layout neutral; global styles in styles.css */
#app { min-height: 100vh; display: block; }
</style>
