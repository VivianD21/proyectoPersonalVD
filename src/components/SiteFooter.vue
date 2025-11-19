<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <img class="footer-logo" :src="logo" alt="logo" />
      </div>

      <div class="footer-center">
        <div class="contact">
          <div class="line">Dirección: Av. Ejemplo 123, Santiago, Chile</div>
          <div class="line">Teléfono: +56 2 2345 6789</div>
        </div>
        <div class="copyright">© Nombre, Todos los derechos reservados, 2025.</div>
      </div>

      <div class="footer-right">
        <button class="social" aria-label="Facebook" v-html="icons.facebook"></button>
        <button class="social" aria-label="Twitter" v-html="icons.twitter"></button>
        <button class="social" aria-label="Instagram" v-html="icons.instagram"></button>
      </div>
    </div>
  </footer>
</template>

<script>
import logoImg from '/src/assets/logo.png'

export default {
  name: 'SiteFooter',
  setup() {
    const logo = logoImg

    const icons = {
      facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.96 3.63 9.07 8.36 9.86v-6.98H8.11v-2.88h3.11V9.41c0-3.08 1.82-4.77 4.59-4.77 1.33 0 2.72.24 2.72.24v3h-1.54c-1.52 0-2 0.95-2 1.92v2.3h3.4l-.54 2.88h-2.86v6.98c4.73-.79 8.36-4.9 8.36-9.86z" fill="#fff"/></svg>`,
      twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.92c-.63.28-1.3.46-2 .55.72-.43 1.28-1.1 1.54-1.9-.68.4-1.44.7-2.25.86C18.9 4.6 17.9 4 16.78 4c-1.78 0-3.22 1.43-3.22 3.19 0 .25.03.5.08.74C10.3 7.75 7.13 6.1 5.03 3.5c-.28.5-.44 1.08-.44 1.7 0 1.17.59 2.2 1.49 2.8-.55-.02-1.07-.17-1.52-.42v.04c0 1.55 1.08 2.83 2.5 3.12-.26.07-.53.11-.81.11-.2 0-.39-.02-.58-.06.39 1.22 1.52 2.11 2.86 2.14-1.05.82-2.37 1.3-3.81 1.3-.25 0-.5-.02-.75-.04 1.36.9 3 1.43 4.75 1.43 5.7 0 8.82-4.82 8.82-9.01v-.41c.6-.43 1.12-.97 1.53-1.59-.56.25-1.15.43-1.77.51.64-.4 1.13-1.02 1.36-1.76z" fill="#fff"/></svg>`,
      instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.5-2.7a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 9.5z" fill="#fff"/></svg>`
    }

    return { logo, icons }
  }
}
</script>

<style scoped>
.site-footer {
  background: linear-gradient(90deg,#0b2545);
  color: #fff;
  padding: 1.25rem 1rem;
  margin-top: 2rem;
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.footer-left { flex: 0 0 auto; display:flex; align-items:center; gap:.75rem; }
.footer-logo { width: 140px; height: auto; display:block; }

/* center block: contact + copyright */
.footer-center { flex: 1 1 320px; color: #fff; }
.footer-center .contact { margin-bottom: .5rem; }
.footer-center .line { font-size: .95rem; color: #fff; }
.footer-center .copyright { font-size: .85rem; color: #fff; opacity: .95; }

/* right block: socials */
.footer-right { flex: 0 0 auto; display:flex; gap:.5rem; align-items:center; }
.social {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition: background .12s ease, transform .08s ease;
  color: #fff;
}
.social:hover { background: #0b2545; transform: translateY(-2px); }

/* responsive adjustments */
@media (max-width: 720px) {
  .footer-inner { gap:.75rem; padding: .5rem 0; }
  .footer-left { order: 1; width: 100%; justify-content: flex-start; }
  .footer-center { order: 2; width: 100%; margin-top: .5rem; }
  .footer-right { order: 3; width: 100%; justify-content: flex-start; margin-top: .5rem; }
  .footer-logo { width: 110px; }
}
</style>
