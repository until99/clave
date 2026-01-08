<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { trackService, type Track } from '@/services/api'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { PhPlay, PhTrash } from '@phosphor-icons/vue'

const tracks = ref<Track[]>([])
const toast = useToast()

const loadTracks = async () => {
  try {
    tracks.value = await trackService.getAllTracks()
  } catch (error) {
    console.error('Erro ao carregar tracks:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao carregar músicas.',
      life: 3000,
    })
  }
}

const deleteTrack = async (id: number, title: string) => {
  if (!confirm(`Deseja realmente deletar "${title}"?`)) return

  try {
    await trackService.deleteTrack(id)
    toast.add({
      severity: 'success',
      summary: 'Track Deletada',
      detail: `"${title}" foi removida.`,
      life: 3000,
    })
    await loadTracks()
  } catch (error) {
    console.error('Erro ao deletar track:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao deletar música.',
      life: 3000,
    })
  }
}

onMounted(() => {
  loadTracks()
})
</script>

<template>
  <div class="p-8 w-full">
    <Toast />
    <h1 class="text-3xl font-bold mb-6">Minhas Músicas</h1>

    <div v-if="tracks.length === 0" class="text-gray-500 text-center py-12">
      Nenhuma música encontrada. Faça upload de uma música usando o formulário acima.
    </div>

    <div v-else class="grid gap-4">
      <div v-for="track in tracks" :key="track.id"
        class="flex items-center gap-4 p-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
        <div class="flex-1">
          <h3 class="font-semibold text-lg">{{ track.title }}</h3>
          <p class="text-gray-600">{{ track.artist }}</p>
          <p v-if="track.album" class="text-gray-500 text-sm">Álbum: {{ track.album }}</p>
          <p v-if="track.release_date" class="text-gray-400 text-sm">
            Lançamento: {{ track.release_date }}
          </p>
        </div>

        <div class="flex gap-2">
          <RouterLink :to="`/track/${track.id}`">
            <Button severity="secondary" size="small">
              <PhPlay :size="18" weight="fill" class="mr-2" />
              Reproduzir
            </Button>
          </RouterLink>

          <Button severity="danger" size="small" @click="deleteTrack(track.id, track.title)">
            <PhTrash :size="18" weight="fill" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
