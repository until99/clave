<script setup lang="ts">
import { PhMagnifyingGlass, PhNotebook, PhPlus } from '@phosphor-icons/vue';
import Badge from '../common/Badge.vue';
import Button from '../common/Button.vue';
import PlaylistItem from '../common/PlaylistItem.vue';
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
      <Button />

      <label
        class="flex justify-center gap-3 items-center bg-[rgb(203_213_255/20%)] py-3 rounded-md cursor-pointer hover:bg-[rgb(203_213_255/30%)] transition-colors">
        <PhPlus size="22" class="text-white" />
        <span class="text-white font-semibold">Upload Audio</span>
        <input type="file" accept="audio/*" class="hidden" />
      </label>

      <p class="mt-1 text-sm text-slate-400 mx-auto" id="file_input_help">
        MP3, FLAC, ... (MAX. 800x400px).
      </p>
    </div>
  </aside>
</template>
