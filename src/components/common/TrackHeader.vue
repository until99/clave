<script setup lang="ts">
import { PhHeart } from '@phosphor-icons/vue';

const props = defineProps({
  title: String,
  subtitle: String || undefined,
  cover_image: String || undefined,
  icon_image: String || undefined
});

const formatTrackTitle = (title: String | undefined) => {
  if (!title) { return title }
  return title.replace('_', ' ').replace(/\b\w/g, c => c.toLocaleUpperCase())
}
</script>

<template>
  <div class="w-full h-[25dvh] rounded-md relative lazy bg-cover bg-center"
    :style="{ backgroundImage: cover_image ? `url(/src/assets/${cover_image})` : 'url(/src/assets/Playlist_Default_Background_Image.jpg)' }">
    <div class="absolute -bottom-12 left-6 flex items-center gap-4">
      <div
        class="rounded-full w-24 aspect-square shadow-md bg-cover bg-center flex justify-center items-center bg-[#d13575]"
        :style="{ backgroundImage: cover_image ? `url(/src/assets/${cover_image})` : 'display: hidden' }">
        <PhHeart size=56 weight="fill" color="white" />
      </div>
      <div class="flex flex-col">
        <p class="font-semibold text-3xl text-white">{{ formatTrackTitle(title) }}</p>
        <p class="text-slate-200">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>
