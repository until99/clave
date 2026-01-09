import ExploreView from '@/views/ExploreView.vue'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      name: 'home',
    },
    { path: '/playlist/:id', component: PlaylistView, name: 'playlist', props: true },
    { path: '/search', component: SearchView, name: 'search' },
    { path: '/explore', component: ExploreView, name: 'explore' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
