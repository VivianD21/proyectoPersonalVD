<template>
  <div>
    <div class="app-frame" style="max-width:640px;margin:1rem auto;">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h3 class="mb-0">{{ mode === 'login' ? 'Iniciar sesión' : 'Registro de usuario' }}</h3>
      </div>

      <div class="d-flex gap-2 mb-3">
        <button type="button" :class="['btn', mode === 'login' ? 'btn-white' : 'btn-outline-light']" @click="setMode('login')">Login</button>
        <button type="button" :class="['btn', mode === 'register' ? 'btn-white' : 'btn-outline-light']" @click="setMode('register')">Registrarse</button>
      </div>

      <form @submit.prevent="submit" novalidate>
        <div v-if="mode === 'register'">
          <div style="margin-bottom:.5rem">
            <label class="small">Nombre</label>
            <input
              v-model="firstName"
              type="text"
              class="form-input"
              :class="{ 'is-invalid': touched.firstName && !firstNameValid }"
              @blur="touched.firstName = true"
              @input="onInput('firstName')"
              required
            />
            <div v-if="touched.firstName && !firstNameValid" class="small text-danger">Nombre requerido</div>
          </div>

          <div style="margin-bottom:.5rem">
            <label class="small">Apellido</label>
            <input
              v-model="lastName"
              type="text"
              class="form-input"
              :class="{ 'is-invalid': touched.lastName && !lastNameValid }"
              @blur="touched.lastName = true"
              @input="onInput('lastName')"
              required
            />
            <div v-if="touched.lastName && !lastNameValid" class="small text-danger">Apellido requerido</div>
          </div>
        </div>

        <div style="margin-bottom:.5rem">
          <label class="small">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-input"
            :class="{ 'is-invalid': touched.email && !emailValid }"
            @blur="touched.email = true"
            @input="onInput('email')"
            required
          />
          <div v-if="touched.email && !emailValid" class="small text-danger">Email inválido (ej: usuario@dominio.com)</div>
        </div>

        <div style="margin-bottom:.5rem">
          <label class="small">Contraseña</label>
          <div class="input-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input with-icon"
              :class="{ 'is-invalid': touched.password && !passwordValid }"
              @blur="touched.password = true"
              @input="onInput('password')"
              required
            />
            <button type="button" class="eye" @click="showPassword = !showPassword" :title="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 14.47 14.47"/></svg>
            </button>
          </div>
          <div v-if="touched.password && !passwordValid" class="small text-danger">Mínimo 8 caracteres e incluir al menos 1 mayúscula</div>
        </div>

        <div v-if="mode === 'register'" style="margin-bottom:.5rem">
          <label class="small">Confirmar contraseña</label>
          <div class="input-wrap">
            <input
              v-model="passwordConfirm"
              :type="showPasswordConfirm ? 'text' : 'password'"
              class="form-input with-icon"
              :class="{ 'is-invalid': touched.passwordConfirm && !passwordsMatch }"
              @blur="touched.passwordConfirm = true"
              @input="onInput('passwordConfirm')"
              required
            />
            <button type="button" class="eye" @click="showPasswordConfirm = !showPasswordConfirm" :title="showPasswordConfirm ? 'Ocultar confirmación' : 'Mostrar confirmación'">
              <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 14.47 14.47"/></svg>
            </button>
          </div>
          <div v-if="touched.passwordConfirm && !passwordsMatch" class="small text-danger">Las contraseñas no coinciden</div>
        </div>

        <div class="flex-between" style="margin-top:.5rem; gap:.5rem">
          <button class="btn btn-white" type="submit">{{ mode === 'login' ? 'Entrar' : 'Registrar' }}</button>
          <div class="small text-muted-light">Demo: usuario1@mitienda.com / Password</div>
        </div>

        <div v-if="error" class="text-danger small mt-2">{{ error }}</div>
        <div v-if="success" class="text-success small mt-2">{{ success }}</div>
      </form>
    </div>

    <SiteFooter />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import SiteFooter from '../components/SiteFooter.vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'LoginView',
  components: { SiteFooter },
  setup () {
    const router = useRouter()
    const auth = useAuthStore()

    const mode = ref('login')
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const error = ref(null)
    const success = ref(null)

    const touched = reactive({
      firstName: false, lastName: false, email: false, password: false, passwordConfirm: false
    })

    const showPassword = ref(false)
    const showPasswordConfirm = ref(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/

    const firstNameValid = computed(() => firstName.value.trim().length > 0)
    const lastNameValid = computed(() => lastName.value.trim().length > 0)
    const emailValid = computed(() => emailRegex.test((email.value || '').trim()))
    const passwordValid = computed(() => passwordRegex.test(password.value || ''))
    const passwordsMatch = computed(() => (password.value || '').trim() === (passwordConfirm.value || '').trim())

    function setMode (m) {
      mode.value = m
      error.value = null
      success.value = null
      Object.keys(touched).forEach(k => (touched[k] = false))
      password.value = ''
      passwordConfirm.value = ''
      showPassword.value = false
      showPasswordConfirm.value = false
    }

    function onInput (field) {
      touched[field] = true
      if (!error.value) return
      const e = error.value.toLowerCase()
      if ((field === 'firstName' && firstNameValid.value && e.includes('nombre')) ||
          (field === 'lastName' && lastNameValid.value && e.includes('apellido')) ||
          (field === 'email' && emailValid.value && e.includes('email')) ||
          (field === 'password' && passwordValid.value && e.includes('contraseña')) ||
          (field === 'passwordConfirm' && passwordsMatch.value && e.includes('contraseñas'))) {
        error.value = null
      }
    }

    function loadUsers () { try { return JSON.parse(localStorage.getItem('tickets_users') || '[]') } catch { return [] } }
    function saveUsers (list) { localStorage.setItem('tickets_users', JSON.stringify(list)) }
    function saveUserToStore (user) { const users = loadUsers(); users.push(user); saveUsers(users) }
    function findRegisteredUser (emailToFind, pass) { return loadUsers().find(u => u.email === emailToFind && u.password === pass) }
    function findUserByEmail (emailToFind) { return loadUsers().find(u => u.email === emailToFind) }

    // helper local usado como fallback
    function findRegisteredUserLocal(em, pw) {
      try {
        const users = JSON.parse(localStorage.getItem('tickets_users') || '[]')
        return users.find(u => u.email === em && u.password === pw) || null
      } catch (e) {
        return null
      }
    }

    async function submit () {
      error.value = null
      success.value = null
      // marcar touched
      touched.email = true
      touched.password = true
      if (mode.value === 'register') {
        touched.firstName = true
        touched.lastName = true
        touched.passwordConfirm = true
      }

      // validaciones
      if (!emailValid.value) { error.value = 'Email inválido'; return }
      if (!passwordValid.value) { error.value = 'Contraseña inválida: mínimo 8 caracteres y al menos 1 mayúscula'; return }

      if (mode.value === 'register') {
        if (!firstNameValid.value) { error.value = 'Nombre requerido'; return }
        if (!lastNameValid.value) { error.value = 'Apellido requerido'; return }
        if (!passwordsMatch.value) { error.value = 'Las contraseñas no coinciden'; return }
        if (findUserByEmail(email.value.trim())) { error.value = 'Ya existe un usuario con ese email'; return }

        const newUser = {
          name: firstName.value.trim() + ' ' + lastName.value.trim(),
          email: email.value.trim(),
          password: password.value
        }

        saveUserToStore(newUser)
        try { localStorage.setItem('tickets_user', JSON.stringify({ name: newUser.name, email: newUser.email })) } catch {}
        window.dispatchEvent(new Event('tickets-user-updated'))
        success.value = 'Registro exitoso. Iniciando sesión...'
        alert('Se ha registrado y logeado correctamente')
        setTimeout(() => router.push({ name: 'Home' }), 700)
        return
      }

      // LOGIN
      try {
        // 1) Intentar login local primero para evitar redirección a Auth0 cuando el usuario ya existe
        const foundLocal = findRegisteredUserLocal(email.value.trim(), password.value)
        if (foundLocal) {
          try { localStorage.setItem('tickets_user', JSON.stringify({ name: foundLocal.name, email: foundLocal.email })) } catch (err) {}
          window.dispatchEvent(new Event('tickets-user-updated'))
          success.value = 'Login exitoso'
          alert('Se ha logeado correctamente')
          setTimeout(() => router.push({ name: 'Home' }), 300)
          return
        }

        // 2) No hay usuario local: llamar al store (puede iniciar redirect a Auth0 o devolver user como fallback)
        let u = null
        try {
          // intentar firma con objeto (recomendado)
          u = await auth.login({ email: email.value.trim(), password: password.value })
        } catch (innerErr) {
          try {
            // fallback a firma posicional si la store implementa otra firma
            u = await auth.login(email.value.trim(), password.value)
          } catch (innerErr2) {
            // re-lanzar el error original para que lo capture el outer catch
            throw innerErr
          }
        }

        // 3) Si recibimos user, persistir y redirigir (fallback local del store)
        if (u) {
          try { localStorage.setItem('tickets_user', JSON.stringify(u)) } catch (e) {}
          window.dispatchEvent(new Event('tickets-user-updated'))
          success.value = 'Login exitoso'
          alert('Se ha logeado correctamente')
          setTimeout(() => router.push({ name: 'Home' }), 300)
          return
        }

        // 4) u falsy => probablemente se inició loginWithRedirect (Auth0). Mostrar estado y no redirigir localmente.
        success.value = 'Redirigiendo a proveedor de identidad...'
      } catch (e) {
        // fallback final: volver a intentar con usuarios registrados en localStorage (seguro adicional)
        const found = findRegisteredUserLocal(email.value.trim(), password.value)
        if (found) {
          try { localStorage.setItem('tickets_user', JSON.stringify({ name: found.name, email: found.email })) } catch (err) {}
          window.dispatchEvent(new Event('tickets-user-updated'))
          alert('Se ha logeado correctamente')
          setTimeout(() => router.push({ name: 'Home' }), 300)
          return
        }

        // Mostrar error final
        error.value = e && e.message ? e.message : 'Credenciales inválidas'
      }
    }

    // función util para iniciar Auth0 redirect desde el botón (si usas store.login que hace redirect, no hace falta)
    async function loginWithRedirect () {
      try {
        await auth.login() // store.login debe hacer loginWithRedirect para Auth0
      } catch (err) {
        console.error(err)
        error.value = 'Error al iniciar login'
      }
    }

    return {
      mode, setMode,
      firstName, lastName, email, password, passwordConfirm,
      error, success, touched, submit,
      emailValid, passwordValid, passwordsMatch, firstNameValid, lastNameValid,
      showPassword, showPasswordConfirm, onInput, loginWithRedirect
    }
  }
}
</script>

<style scoped>
.btn-outline-light { background: transparent; color: #fff; border:1px solid rgba(255,255,255,0.12) }
.btn-white { background:#fff; color:#0b2545; border:1px solid rgba(0,0,0,0.06) }
.is-invalid { border-color: #dc3545 !important; }
.text-danger { color: #ffb3b3 !important; }
.text-success { color: #b7f0b7 !important; }
.input-wrap { position:relative; display:flex; align-items:center }
.with-icon { padding-right:2.5rem }
.eye {
  position:absolute; right:.45rem; top:50%; transform:translateY(-50%);
  background:transparent; border:none; padding:.2rem; cursor:pointer; color:#fff;
  display:inline-flex; align-items:center; justify-content:center;
}
.eye svg { stroke: currentColor; display:block }
.form-input { width:100%; padding:.5rem; border-radius:4px; border:1px solid rgba(0,0,0,0.08) }
.flex-between { display:flex; justify-content:space-between; align-items:center }
</style>
