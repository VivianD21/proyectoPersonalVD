<template>
  <div>
    <div class="search-row">
      <input v-model="q" @input="applyFilter" placeholder="Buscar por nombre o palabra..." class="form-input" />
      <button class="btn btn-white" @click="clearSearch">Limpiar</button>
    </div>

    <div class="product-grid">
      <div v-for="p in visibleProducts" :key="p.id" class="product-card">
        <img :src="getImage(p)" :alt="p['Nombre de película']" loading="lazy" />
        <h5 class="small text-capitalize">{{ p['Nombre de película'] }}</h5>
        <div class="text-muted-light small">Director: {{ p.director }}</div>
        <div class="text-muted-light small">País: {{ p.país }} • Año: {{ p['año de realización'] }}</div>

        <div class="flex-between" style="margin-top:.5rem">
          <div>
            <strong>{{ formatCurrency(p['valor del producto']) }}</strong>
            <div class="small text-muted-light">Stock: {{ p.stock }}</div>
          </div>

          <div style="min-width:140px; text-align:right">
            <input
              type="number"
              min="1"
              class="form-input"
              v-model.number="qty[p.id]"
              style="width:72px;margin-bottom:.4rem"
            />
            <button class="btn btn-white" :disabled="!canAdd(p)" @click="add(p)">Agregar</button>
          </div>
        </div>

        <div v-if="p.stock === 0" class="text-muted-light small mt-2">Agotado</div>
      </div>
    </div>

    <ProductModal v-if="modalProduct" :product="modalProduct" @close="modalProduct = null" />
  </div>
</template>

<script>
import api from '../services/api'
import ProductModal from './ProductModal.vue'
import { ref, reactive, onMounted, computed } from 'vue'

export default {
  name: 'Products',
  components: { ProductModal },
  emits: ['add-to-cart'],
  setup(_, { emit }) {
    const products = ref([])
    const q = ref('')
    const qty = reactive({})
    const modalProduct = ref(null)

    function getImage(p) {
      return p.imagen ? `/src/assets/${p.imagen}` : 'https://via.placeholder.com/400x250?text=Poster'
    }

    function formatCurrency(v) {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)
    }

    async function load() {
      try {
        const data = await api.all()
        products.value = data || []
        products.value.forEach(x => { qty[x.id] = 1 })
      } catch (e) {
        products.value = []
      }
    }

    function applyFilter() {
      // visibleProducts es computada; no se necesita lógica adicional aquí
    }

    function clearSearch() { q.value = '' }

    const visibleProducts = computed(() => {
      const term = (q.value || '').toString().trim().toLowerCase()
      return products.value.filter(p => {
        if (!p || typeof p !== 'object') return false
        if ((p.stock || 0) <= 0) return false // mostrar solo con stock
        if (!term) return true
        const name = (p['Nombre de película'] || '').toString().toLowerCase()
        const director = (p.director || '').toString().toLowerCase()
        const pais = (p.país || '').toString().toLowerCase()
        return name.includes(term) || director.includes(term) || pais.includes(term)
      })
    })

    function canAdd(p) {
      const qn = Number(qty[p.id] || 0)
      return qn > 0 && qn <= (p.stock || 0)
    }

    function add(p) {
      const quantity = Number(qty[p.id] || 1)
      if (!canAdd(p)) return
      emit('add-to-cart', { product: p, quantity })
      modalProduct.value = p
    }

    onMounted(load)

    return {
      products,
      q,
      qty,
      visibleProducts,
      getImage,
      formatCurrency,
      add,
      applyFilter,
      clearSearch,
      modalProduct,
      canAdd
    }
  }
}
</script>

<style scoped>
.product-grid { margin-top:.5rem; display: grid; gap: .75rem; grid-template-columns: repeat(1,1fr); }
@media(min-width:700px) { .product-grid { grid-template-columns: repeat(2,1fr); } }
@media(min-width:992px) { .product-grid { grid-template-columns: repeat(3,1fr); } }
.form-input { background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:.4rem; border-radius:6px; color:var(--text-light) }
</style>
