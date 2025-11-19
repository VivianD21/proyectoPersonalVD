

// usa import directo del JSON para evitar problemas de ruta en dev
import peliculas from '../assets/peliculas.json'

export default {
  all() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(peliculas), 300)
    })
  }
}
