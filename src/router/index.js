import { createRouter, createWebHistory } from 'vue-router'
import InboxView from '../views/InboxView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inbox',
      component: InboxView
    },
    {
      path: '/archive',
      name: 'Archive',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ArchiveView.vue')
    }
  ]
})

export default router
