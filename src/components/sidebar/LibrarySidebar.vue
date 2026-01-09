<script setup lang="ts">
import { PhMagnifyingGlass, PhNotebook, PhPlus } from '@phosphor-icons/vue';
import Badge from '../common/Badge.vue';
import PlaylistItem from '../common/PlaylistItem.vue';
import NewPlaylistButton from '../common/NewPlaylistButton.vue';
import UploadAudioButton from '../common/UploadAudioButton.vue';
</script>

<template>
  <aside
    class="h-full flex flex-col justify-between mt-5 p-5 w-64 rounded-md bg-[rgb(203_213_255/20%)] backdrop-blur-lg shadow-white">
    <div class="flex flex-col gap-5 ">
      <div class=" flex gap-3 justify-between">
        <div class="flex gap-3">
          <PhNotebook :size="22" weight="regular" class="text-slate-300" />
          <p class="text-slate-300">Your Library</p>
        </div>
        <PhMagnifyingGlass :size="22" weight="regular" class="text-slate-300" />
      </div>
      <div class="flex gap-3">
        <Badge />
      </div>
      <div class="flex flex-col gap-3">
        <PlaylistItem />
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <NewPlaylistButton />
      <UploadAudioButton />
    </div>
  </aside>
</template>
