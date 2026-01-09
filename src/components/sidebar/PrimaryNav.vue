<script setup lang="ts">
import { PhCirclesFour, PhHouseSimple, PhMagnifyingGlass } from '@phosphor-icons/vue';

</script>

<template>
  <nav class="mt-12 p-5 w-64 rounded-md flex flex-col gap-3 bg-[rgb(203_213_255/20%)] backdrop-blur-lg shadow-white">
    <router-link to="/" :class="[$route.name == 'home' ? 'text-white' : 'text-slate-300', 'flex items-center']">
      <PhHouseSimple :size="22" weight="fill" />
      <p class="ml-3">Home</p>
    </router-link>
    <router-link to="/search" :class="[$route.name == 'search' ? 'text-white' : 'text-slate-300', 'flex items-center']">
      <PhMagnifyingGlass :size="22" weight="regular" />
      <p class="ml-3">Search</p>
    </router-link>
    <router-link to="/explore"
      :class="[$route.name == 'explore' ? 'text-white' : 'text-slate-300', 'flex items-center']">
      <PhCirclesFour :size="22" weight="regular" />
      <p class="ml-3">Explore</p>
    </router-link>
  </nav>
</template>
