<template>
  <div class="flex flex-col gap-5">
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
</template>
