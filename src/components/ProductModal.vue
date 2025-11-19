<template>
  <div class="modal-detail" @click.self="$emit('close')">
    <div class="modal-box-alt">
      <div class="flex-between">
        <h4 class="small text-capitalize modal-title">{{ product['Nombre de película'] }}</h4>
        <button class="btn btn-white" @click="$emit('close')">Cerrar</button>
      </div>

      <div style="display:flex; gap:1rem; margin-top:.5rem; align-items:flex-start">
        <img :src="getImage(product)" alt="" style="width:40%; border-radius:6px" />
        <div style="flex:1">
          <p class="small text-dark">Director: {{ product.director }} • País: {{ product.país }}</p>
          <p class="small text-dark">Duración: {{ product.duracion }} min • Año: {{ product['año de realización'] }}</p>
          <p class="small text-dark">Fecha exhibición: {{ product['fecha de exhibición'] }}</p>
          <p class="small text-dark"><strong>Precio: {{ formatCurrency(product['valor del producto']) }}</strong></p>
          <p class="small text-dark">Stock: {{ product.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { product: { type: Object, required: true } },
  methods: {
    getImage(p) { return p.imagen ? `/src/assets/${p.imagen}` : 'https://via.placeholder.com/400x250?text=Poster' },
    formatCurrency(v) { return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v) }
  }
}
</script>

<style scoped>
/* overlay reuse */
.modal-detail { background: rgba(0,0,0,0.5); position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:2100 }

/* nueva caja: azul piedra claro y textos en negro */
.modal-box-alt {
  width:90%; max-width:560px;
  background: linear-gradient(180deg, #bfcad3 0%, #d7e0e6 100%); /* azul piedra claro */
  padding:1rem;
  border-radius:8px;
  border:1px solid rgba(0,0,0,0.06);
  color: #0b0b0b; /* textos negros */
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
.modal-box-alt img { object-fit:cover; }
.modal-title { color: #0b0b0b; }
.btn-white { background:#ffffff; color:#0b2545; border:1px solid rgba(0,0,0,0.06); }
.text-dark { color:#0b0b0b }
</style>
