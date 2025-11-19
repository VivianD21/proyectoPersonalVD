// src/stores/notification.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const visible = ref(false)
  const timeoutId = ref(null)

  function show(msg = '', ms = 3500) {
    // clear previous
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    message.value = msg
    visible.value = true
    timeoutId.value = setTimeout(() => {
      visible.value = false
      timeoutId.value = null
    }, ms)
  }

  function hide() {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    visible.value = false
    message.value = ''
  }

  return { message, visible, show, hide }
})
