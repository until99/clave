<script setup lang="ts">
import { PhHeart } from '@phosphor-icons/vue';
import { ref } from 'vue';

const isFavorite = ref<boolean>(false)

const toggleSelectedIsFavorite = () => {
  if (isFavorite.value == true) {
    isFavorite.value = false
  }
  else {
    isFavorite.value = true
  }
}

</script>

<template>
  <div class="w-full aspect-square bg-[url(../assets/playlist_background_cover.jpg)] bg-cover bg-center rounded-md">
  </div>
  <div class="flex justify-between items-center">
    <div class="flex flex-col gap-1">
      <p class="text-lg font-semibold text-white">Find Away</p>
      <span class="text-sm text-slate-200">Cise Star</span>
    </div>
    <button class="cursor-pointer" @click="toggleSelectedIsFavorite()">
      <PhHeart size="22" class="text-white" :weight="isFavorite ? 'fill' : 'regular'" />
    </button>
  </div>
</template>
