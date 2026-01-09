<script setup lang="ts">
import PrimaryNav from './components/sidebar/PrimaryNav.vue';
import LibrarySidebar from './components/sidebar/LibrarySidebar.vue';
import PlaybackBar from './components/layout/PlaybackBar.vue';
import NowPlaying from './components/player/NowPlaying.vue';
import QueueList from './components/player/QueueList.vue';
</script>

<template>
  <div class="flex">
    <aside class="h-[calc(100dvh-48px)] flex flex-col ml-20 mr-4">
      <PrimaryNav />
      <LibrarySidebar />
    </aside>
    <main class="flex gap-4">
      <div class="flex flex-col gap-4">
        <section
          class="mt-12 p-5 h-[calc(82dvh-32px)] w-[calc(100dvw-704px)] rounded-md flex flex-col gap-3 bg-[rgb(203_213_255/20%)] backdrop-blur-lg shadow-white">
          <router-view />
        </section>
        <PlaybackBar />
      </div>
      <aside
        class=" mt-12 p-5 w-64 rounded-md flex flex-col gap-3 bg-[rgb(203_213_255/20%)] backdrop-blur-lg shadow-white">
        <NowPlaying />
        <QueueList />
      </aside>
    </main>
  </div>
</template>
