<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { trackService, type Track } from '@/services/api'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { PhArrowLeft, PhPlay, PhPause, PhSpeakerHigh, PhSpeakerSlash } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const track = ref<Track | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isMuted = ref(false)

const trackId = computed(() => Number(route.params.id))
const streamUrl = computed(() => trackService.getStreamUrl(trackId.value))

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const loadTrack = async () => {
  try {
    track.value = await trackService.getTrackById(trackId.value)
  } catch (error) {
    console.error('Erro ao carregar track:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar música.',
      life: 3000,
    })
  }
}

const togglePlay = () => {
  if (!audioElement.value) return

  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const toggleMute = () => {
  if (!audioElement.value) return
  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
}

const updateVolume = (event: Event) => {
  const target = event.target as HTMLInputElement
  volume.value = Number(target.value)
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }
}

const seek = (event: MouseEvent) => {
  if (!audioElement.value) return
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const percentage = (event.clientX - rect.left) / rect.width
  audioElement.value.currentTime = percentage * duration.value
}

const onTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  loadTrack()
})
</script>

<template>
  <div class="p-8 w-full max-w-4xl mx-auto">
    <Toast />

    <Button @click="goBack" severity="secondary" size="small" class="mb-4">
      <PhArrowLeft :size="18" class="mr-2" />
      Voltar
    </Button>

    <Card v-if="track" class="shadow-lg">
      <template #title>
        <h1 class="text-3xl font-bold">{{ track.title }}</h1>
      </template>

      <template #content>
        <div class="space-y-4">
          <div>
            <p class="text-xl text-gray-700"><strong>Artista:</strong> {{ track.artist }}</p>
            <p v-if="track.album" class="text-lg text-gray-600">
              <strong>Álbum:</strong> {{ track.album }}
            </p>
            <p v-if="track.release_date" class="text-gray-500">
              <strong>Lançamento:</strong> {{ track.release_date }}
            </p>
          </div>

          <!-- Player de Áudio -->
          <div v-if="track.file_path" class="mt-6 p-6 bg-slate-100 rounded-lg">
            <audio ref="audioElement" :src="streamUrl" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata"
              @ended="isPlaying = false"></audio>

            <!-- Controles -->
            <div class="flex items-center gap-4 mb-4">
              <Button @click="togglePlay" :severity="isPlaying ? 'success' : 'secondary'" size="large">
                <PhPause v-if="isPlaying" :size="24" weight="fill" />
                <PhPlay v-else :size="24" weight="fill" />
              </Button>

              <div class="flex-1">
                <div @click="seek" class="h-2 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden">
                  <div class="h-full bg-blue-500 transition-all" :style="{ width: `${progressPercentage}%` }"></div>
                </div>
                <div class="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{{ formatTime(currentTime) }}</span>
                  <span>{{ formatTime(duration) }}</span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <Button @click="toggleMute" severity="secondary" size="small">
                  <PhSpeakerSlash v-if="isMuted" :size="20" />
                  <PhSpeakerHigh v-else :size="20" />
                </Button>
                <input type="range" min="0" max="1" step="0.01" :value="volume" @input="updateVolume" class="w-24" />
              </div>
            </div>
          </div>

          <div v-else class="text-red-500 p-4 bg-red-50 rounded">
            <strong>Atenção:</strong> Arquivo de áudio não disponível para esta track.
          </div>
        </div>
      </template>
    </Card>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Carregando...</p>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type='range']::-webkit-slider-track {
  background: #d1d5db;
  height: 0.5rem;
  border-radius: 0.25rem;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #3b82f6;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-top: -0.25rem;
}

input[type='range']::-moz-range-track {
  background: #d1d5db;
  height: 0.5rem;
  border-radius: 0.25rem;
}

input[type='range']::-moz-range-thumb {
  background: #3b82f6;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: none;
}
</style>
