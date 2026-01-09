<script setup lang="ts">
import { PhHeart, PhPushPin } from '@phosphor-icons/vue';

</script>

<template>
  <router-link to="playlist/1" class="flex gap-2 hover:bg-[rgb(203_213_255/15%)] p-1 rounded-md cursor-pointer">
    <div class="w-12 h-12 bg-[#d13575] rounded flex justify-center items-center">
      <PhHeart weight="fill" size="24" class="text-white" />
    </div>
    <div class="flex flex-col justify-between">
      <p class="text-white font-semibold">Liked Songs</p>
      <div class="flex items-center gap-2 text-sm text-slate-300">
        <PhPushPin weight="fill" class="text-slate-300" />
        <p>Playlist - 2 songs</p>
      </div>
    </div>
  </router-link>
</template>
