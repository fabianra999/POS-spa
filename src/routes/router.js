import { createRouter, createWebHistory } from 'vue-router'
import billing from '../views/Billing.vue'
import Reports from '../views/Reports.vue'

const routes = [
  { path: '/', component: billing },
  { path: '/Billing', component: billing },
  { path: '/Reports', component: Reports },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router