<template>
  <div>
    <div class="app-frame" style="max-width:800px;margin:1rem auto;">
      <h3>Contacto</h3>
      <p class="small text-muted-light">Formulario de contacto</p>

      <form @submit.prevent="send">
        <div style="margin-bottom:.5rem">
          <label class="small">Nombre</label>
          <input class="form-input" v-model="name" required />
        </div>
        <div style="margin-bottom:.5rem">
          <label class="small">Correo</label>
          <input class="form-input" v-model="email" type="email" required />
        </div>
        <div style="margin-bottom:.5rem">
          <label class="small">Mensaje</label>
          <textarea class="form-input" v-model="message" rows="4"></textarea>
        </div>

        <div class="flex-between">
          <button class="btn btn-white" type="submit">Enviar</button>
        </div>
      </form>

      <div v-if="sent" class="text-muted-light small mt-2">Mensaje enviado (simulado).</div>
    </div>

    <!-- Footer colocado fuera de .app-frame para que siempre sea visible -->
    <SiteFooter />
  </div>
</template>

<script>
import { ref } from 'vue'
import SiteFooter from '../components/SiteFooter.vue'

export default {
  name: 'ContactView',
  components: { SiteFooter },
  setup() {
    const name = ref('')
    const email = ref('')
    const message = ref('')
    const sent = ref(false)

    function send() {
      sent.value = true
      setTimeout(() => (sent.value = false), 2000)
    }

    return { name, email, message, sent, send }
  }
}
</script>

<style scoped>
/* mantén estilos locales si los necesitas */
</style>
