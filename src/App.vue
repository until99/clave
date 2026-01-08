<script setup lang="ts">
import { PhCirclesFour, PhHeart, PhHouseSimple, PhMagnifyingGlass, PhNotebook, PhPlus, PhPushPin } from '@phosphor-icons/vue'
</script>

<template>
  <div class="flex">


    <aside class="h-[calc(100dvh-48px)] flex flex-col">
      <nav
        class="mt-12 mx-20 p-5 w-64 rounded-md flex flex-col gap-3 bg-[rgb(203_213_255/20%)] backdrop-blur-sm shadow-white">
        <router-link to="/" class="flex gap-3 items-center">
          <PhHouseSimple :size="22" weight="fill" class="text-white" />
          <p class="text-white">Home</p>
        </router-link>
        <router-link to="/" class="flex gap-3 items-center">
          <PhMagnifyingGlass :size="22" weight="regular" class="text-slate-300" />
          <p class="text-slate-300">Search</p>
        </router-link>
        <router-link to="/" class="flex gap-3 items-center">
          <PhCirclesFour :size="22" weight="regular" class="text-slate-300" />
          <p class="text-slate-300">Explore</p>
        </router-link>
      </nav>
      <div
        class="h-full flex flex-col justify-between mt-5 mx-20 p-5 w-64 rounded-md bg-[rgb(203_213_255/20%)] backdrop-blur-sm shadow-white">
        <div class="flex flex-col gap-5 ">
          <div class=" flex gap-3">
            <div class="flex gap-3">
              <PhNotebook :size="22" weight="regular" class="text-slate-300" />
              <p class="text-slate-300">Your Library</p>
            </div>
            <PhMagnifyingGlass :size="22" weight="regular" class="text-slate-300" />
          </div>
          <!-- Badges -->
          <div class="flex gap-3">
            <div class="w-16 h-6 bg-slate-500 backdrop-blur-sm shadow rounded-full"></div>
            <div class="w-16 h-6 bg-slate-500 backdrop-blur-sm shadow rounded-full"></div>
          </div>
          <!-- Playlists -->
          <div class="flex flex-col gap-3">
            <!-- Playlist -->
            <div class="flex gap-2">
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
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <button class="flex justify-center gap-3 items-center bg-[rgb(203_213_255/20%)] py-3 rounded-md">
            <PhPlus size="22" class="text-white" />
            <p class="text-white font-semibold">
              Escolher arquivo
            </p>
          </button>
          <input type="file">
        </div>
      </div>
    </aside>
    <main>
      <p class="text-white">home</p>
      <router-view />
    </main>
  </div>
</template>
