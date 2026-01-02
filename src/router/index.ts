import App from '@/App.vue'
import HomeView from '@/view/HomeView.vue'
import TrackView from '@/view/TrackView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    { path: '/track/:id', component: TrackView },
  ],
})

export default router
