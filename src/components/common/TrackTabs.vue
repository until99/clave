<script setup lang="ts">
import { computed, ref } from 'vue';
import Songs from '@/components/common/tabs/Songs.vue';
import Albums from '@/components/common/tabs/Albums.vue';
import Shows from '@/components/common/tabs/Shows.vue';
import Favorites from '@/components/common/tabs/Favorites.vue';

const tabs = ref([
  {
    key: 0,
    title: 'Songs',
    component: Songs,
    active: true
  },
  {
    key: 1,
    title: 'Albums',
    component: Albums,
    active: false
  },
  {
    key: 2,
    title: 'Shows',
    component: Shows,
    active: false
  },
  {
    key: 3,
    title: 'Favorites',
    component: Favorites,
    active: false
  },
])

const activeTab = computed(() => {
  return tabs.value.find(t => t.active)
})

const changeActiveTab = (key: number) => {
  tabs.value.forEach(t => {
    t.active = false;
  });

  if (tabs.value[key]) {
    tabs.value[key].active = true
  }
}
</script>

<template>
  <div>
    <ul class="flex gap-2">
      <li v-for="tab in tabs" :key="tab.key">
        <button :class="tab.active ? 'border-b-2 border-white text-white font-semibold pb-2' : ''"
          class="text-slate-200 cursor-pointer px-2" @click="changeActiveTab(tab.key)">
          {{ tab.title }}
        </button>
      </li>
    </ul>
    <div class="mt-4 w-full max-h-[35dvh] overflow-y-scroll">
      <component :is="activeTab?.component" v-if="activeTab" />
    </div>
  </div>
</template>
