import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HomePage.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/Admin.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../components/BlogPage.vue'),
  },
  {
    path: '/works',
    name: 'works',
    component: () => import('../components/WorksPage.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router