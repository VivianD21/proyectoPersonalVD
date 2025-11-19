<template>
  <div v-if="store.visible" class="notif-root" role="status" aria-live="polite">
    <div class="notif-box">{{ store.message }}</div>
  </div>
</template>

<script>
import { useNotificationStore } from '@/stores/notification'
import { storeToRefs } from 'pinia'

export default {
  name: 'Notification',
  setup() {
    const store = useNotificationStore()
    return { store, ...storeToRefs(store) }
  }
}
</script>

<style scoped>
.notif-root {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.notif-box {
  pointer-events: auto;
  background: #fff;
  border: 2px solid #0b63ff; /* borde azul */
  color: #000;              /* texto negro */
  padding: .6rem 1rem;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(11,99,255,0.12);
  font-weight: 600;
  min-width: 220px;
  text-align: center;
}
</style>
