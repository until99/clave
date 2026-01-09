<script setup lang="ts">
import { PhHeart, PhPlay } from '@phosphor-icons/vue'
import { ref } from 'vue'

interface ITracks {
  id: number
  order: number
  title: string
  artist: string
  duration_ms: number
  cover_image: string | undefined
  is_favorite: boolean
}

const tracks = ref<ITracks[]>([
  {
    id: 1,
    order: 1,
    title: "Foreword",
    artist: "Linkin Park",
    duration_ms: 13000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 2,
    order: 2,
    title: "Don't Stay",
    artist: "Linkin Park",
    duration_ms: 188000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 3,
    order: 3,
    title: "Somewhere I Belong",
    artist: "Linkin Park",
    duration_ms: 213000,
    cover_image: undefined,
    is_favorite: true
  },
  {
    id: 4,
    order: 4,
    title: "Lying from You",
    artist: "Linkin Park",
    duration_ms: 175000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 5,
    order: 5,
    title: "Hit the Floor",
    artist: "Linkin Park",
    duration_ms: 164000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 6,
    order: 6,
    title: "Easier to Run",
    artist: "Linkin Park",
    duration_ms: 204000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 7,
    order: 7,
    title: "Faint",
    artist: "Linkin Park",
    duration_ms: 162000,
    cover_image: undefined,
    is_favorite: true
  },
  {
    id: 8,
    order: 8,
    title: "Figure.09",
    artist: "Linkin Park",
    duration_ms: 198000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 9,
    order: 9,
    title: "Breaking the Habit",
    artist: "Linkin Park",
    duration_ms: 196000,
    cover_image: undefined,
    is_favorite: true
  },
  {
    id: 10,
    order: 10,
    title: "From the Inside",
    artist: "Linkin Park",
    duration_ms: 175000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 11,
    order: 11,
    title: "Nobody's Listening",
    artist: "Linkin Park",
    duration_ms: 178000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 12,
    order: 12,
    title: "Session",
    artist: "Linkin Park",
    duration_ms: 144000,
    cover_image: undefined,
    is_favorite: false
  },
  {
    id: 13,
    order: 13,
    title: "Numb",
    artist: "Linkin Park",
    duration_ms: 186000,
    cover_image: undefined,
    is_favorite: true
  }
])

</script>

<template>
  <ul class="flex flex-col gap-2 pr-4">
    <li class="flex justify-between items-center text-white" v-for="(track, index) in tracks" :key="index">
      <div class="flex gap-2 items-center w-lg">
        <p class="w-5">{{ track.order }}</p>
        <button
          class="group cursor-pointer relative w-16 aspect-square bg-red-400 rounded bg-[url(@/assets/Meteora_Linkin_Park_Album_Cover_Tracks.avif)] bg-cover flex justify-center items-center">
          <PhPlay class="hidden group-hover:block" size="28" weight="fill" color="white" />
        </button>
        <p>{{ track.title }}</p>
      </div>

      <p>{{ track.artist }}</p>

      <p>{{ track.duration_ms }}</p>

      <PhHeart size="20" :class="track.is_favorite ? '' : 'opacity-0 hover:opacity-1'" weight="fill" />
    </li>
  </ul>
</template>

<style>
::-webkit-scrollbar {
  width: 10px;
  height: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #cad5e2;
}

::-webkit-scrollbar-thumb {
  background: #62748e;
  border-radius: 100vh;
  border: 2px solid #cad5e2;
}

/* ::-webkit-scrollbar-thumb:hover {
  background: #c0a0b9;
} */
</style>
