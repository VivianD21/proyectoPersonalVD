import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },

  { path: '/contact', name: 'Contact', component: Contact },
  // product details dynamic route (props)
  { path: '/product/:id', name: 'Product', component: Home, props: true } // Home handles product modal via id param
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
