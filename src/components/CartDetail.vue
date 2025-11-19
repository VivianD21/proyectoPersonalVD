<template>
  <div class="cart-overlay" @click.self="$emit('close')">
    <div class="cart-popup">
      <div class="flex-between">
        <h4>Detalle del carrito</h4>
        <div>
          <button class="btn btn-white me-2" @click="clearAll">Vaciar</button>
          <button class="btn btn-white" @click="$emit('close')">Cerrar</button>
        </div>
      </div>

      <div v-if="!items.length" class="center-text" style="margin-top:2rem">
        <p class="text-muted-light">El carrito está vacío.</p>
      </div>

      <div v-else style="margin-top:1rem;">
        <table class="table-morado">
          <thead>
            <tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th><th>Acción</th></tr>
          </thead>
          <tbody>
            <tr v-for="it in items" :key="it.product.id">
              <td style="width:40%">{{ it.product['Nombre de película'] }}</td>
              <td>{{ it.quantity }}</td>
              <td>{{ formatCurrency(it.product['valor del producto']) }}</td>
              <td>{{ formatCurrency(it.product['valor del producto'] * it.quantity) }}</td>
              <td><button class="btn btn-white btn-sm" @click="remove(it.product.id)">Eliminar</button></td>
            </tr>
          </tbody>
        </table>

        <div class="flex-between" style="margin-top:1rem; align-items:center;">
          <div class="small text-muted-light">Items: {{ totalItems }}</div>

          <div style="display:flex; gap:.5rem; align-items:center;">
            <div class="text-end me-3">
              <div class="small text-muted-light">Subtotal</div>
              <div><strong>{{ formatCurrency(subtotal) }}</strong></div>
            </div>

            <div>
              <button class="btn btn-white me-2" @click="generarPago">Ir a Pagar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { items: { type: Array, default: () => [] } },
  emits: ['remove-item','clear-cart','close','checkout'],
  computed: {
    totalItems() {
      return this.items.reduce((s, i) => s + i.quantity, 0)
    },
    subtotal() {
      return this.items.reduce((s, i) => s + i.quantity * i.product['valor del producto'], 0)
    }
  },
  methods: {
    formatCurrency(v) {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
      }).format(v)
    },
    remove(id) {
      this.$emit('remove-item', id)
    },
    clearAll() {
      this.$emit('clear-cart')
    },
    generarPago() {
      alert("PAGO GENERADO")
      this.$emit('clear-cart')
      this.$emit('checkout')
    }
  }
}
</script>

<style scoped>
.table-morado { margin-top:.5rem }
.btn-white {
  background: #ffffff;
  color: #0b2545;
  border: 1px solid rgba(0,0,0,0.06);
}
</style>
