import HomeView from '@/view/HomeView.vue'
import TrackView from '@/view/TrackView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomeView,
    },
    { path: '/track/:id', name: 'track-page', component: TrackView, props: true },
  ],
})

export default router
