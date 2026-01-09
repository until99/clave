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

interface ITracks {
  id: number
  name: string
  artist: string
  cover_image: string | undefined
}

interface IPlaylists {
  id: number
  name: string
  description: string | undefined
  cover_image: string | undefined
  icon_image: string | undefined
  tracks: ITracks[]
}

const playlists = ref<IPlaylists[]>([
  {
    id: 1,
    name: 'liked_songs',
    // description: 'songs that you marked as favorite',
    // cover_image: 'Meteora_Linkin_Park_Album_Cover.jpg',
    description: undefined,
    cover_image: undefined,
    icon_image: undefined,
    tracks: [
      {
        id: 1,
        name: 'Sun Colored Eyes',
        artist: 'Mabisyo',
        cover_image: 'Sun_Colored_Eyes_Album_Cover.jpg',
      },
      {
        id: 2,
        name: 'Find Away',
        artist: 'Cise Star',
        cover_image: 'Find_Away_Cise_Star_Album_Cover.jpg',
      },
    ],
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
  <!-- <pre>{{ playlist_data }}</pre> -->
  <!-- TODO: Display Fallback when playlist id is not found -->
  <TrackHeader :cover_image="playlist_data?.cover_image" :title="playlist_data?.name"
    :subtitle="playlist_data?.description" :icon_image="playlist_data?.icon_image" />

  <TrackTabs class="mt-12 w-fit" />
</template>
