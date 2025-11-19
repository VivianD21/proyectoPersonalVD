<template>
  <div>
    <div class="app-frame">
      <div class="center-text mb-3">
        <h1>Bienvenido a Tickets de Cine</h1>
        <p class="text-muted-light small">Explora la cartelera y agrega entradas a tu carrito.</p>
      </div>

      <!-- Products emite 'add-to-cart' que App.vue captura -->
      <Products @add-to-cart="$emit('add-to-cart', $event)" />
    </div>

    <!-- Footer: se muestra fuera de .app-frame para que siempre quede al final -->
    <SiteFooter />
  </div>
</template>

<script>
import Products from '../components/Products.vue'
import SiteFooter from '../components/SiteFooter.vue'

export default {
  name: 'HomeView',
  components: { Products, SiteFooter }
}
</script>

<style scoped>
/* mantiene estilos globales */
</style>
