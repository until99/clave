<script setup lang="ts">
import TrackHeader from '@/components/common/TrackHeader.vue'
import TrackTabs from '@/components/common/TrackTabs.vue';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps<{
  id?: string | number
}>()

const playlist_data = ref<IPlaylists>()

interface IPlaylists {
  id: number
  name: string
  description: string | undefined
  cover_image: string | undefined
  icon_image: string | undefined
}

const playlists = ref<IPlaylists[]>([
  {
    id: 1,
    name: 'liked_songs',
    description: undefined,
    cover_image: undefined,
    icon_image: undefined,
  },
])

const getPlaylist = (id: number) => {
  return playlists.value.find((t) => t.id === id)
}

onMounted(() => {
  const routeId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (routeId) {
    const data = getPlaylist(parseInt(routeId))
    if (data) {
      playlist_data.value = data
    }
  }
})
</script>

<template>
  <TrackHeader :cover_image="playlist_data?.cover_image" :title="playlist_data?.name"
    :subtitle="playlist_data?.description" :icon_image="playlist_data?.icon_image" />

  <TrackTabs class="mt-16" />
</template>
