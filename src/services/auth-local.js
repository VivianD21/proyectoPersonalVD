// src/services/auth-local.js
export default {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Credenciales demo: aceptar únicamente 'Password' (mayúscula inicial)
        if (email === 'usuario1@mitienda.com' && password === 'Password') {
          resolve({ name: 'Usuario Ejemplo', email })
          return
        }

        // Buscar en usuarios registrados en localStorage (coincidencia exacta)
        try {
          const users = JSON.parse(localStorage.getItem('tickets_users') || '[]')
          const found = users.find(u => u.email === email && u.password === password)
          if (found) {
            resolve({ name: found.name || 'Usuario', email: found.email })
            return
          }
        } catch (e) {
          console.error('auth-local.login: error leyendo tickets_users desde localStorage', e)
        }

        reject(new Error('Credenciales inválidas'))
      }, 400)
    })
  }
}
