<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'

import { PhPlayPause, PhTrash, PhUpload } from '@phosphor-icons/vue'

// const STORAGE_KEY = 'music_player_metadata'

// TODO: Implementar controle de som usando essa lib
// https://github.com/kimlarocca/vue-sound

// TODO: Implementar componentes usando essa lib
// https://primevue.org/

const size = ref<any>()
const title = ref<any>()
const album = ref<any>()
const artist = ref<any>()
const year = ref<any>()
const track = ref<any>()
const cover = ref<any>()
const cover_description = ref<any>()

const file = ref<File | null>(null)
const audioInstance = ref<HTMLAudioElement | null>(null)
// const isPlaying = ref(false)

// function saveMetadata() {
//   if (!file.value) return

//   const reader = new FileReader()

//   reader.onload = (e) => {
//     const audioBase64 = e.target?.result

//     const dataToSave = {
//       audioData: audioBase64,
//       size: size.value,
//       title: title.value,
//       album: album.value,
//       artist: artist.value,
//       year: year.value,
//       track: track.value,
//       cover: cover.value,
//       cover_description: cover_description.value,
//     }

//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
//     } catch (e) {
//       console.warn('Não foi possível salvar os dados (QuotaExceeded).', e)
//       alert('O arquivo é muito grande para salvar no LocalStorage.')
//     }
//   }

//   reader.readAsDataURL(file.value)
// }

// function loadMetadata() {
//   const saved = localStorage.getItem(STORAGE_KEY)
//   if (saved) {
//     try {
//       const data = JSON.parse(saved)

//       size.value = data.size
//       title.value = data.title
//       album.value = data.album
//       artist.value = data.artist
//       year.value = data.year
//       track.value = data.track
//       cover.value = data.cover
//       cover_description.value = data.cover_description

//       if (data.audioData) {
//         if (audioInstance.value) {
//           audioInstance.value.pause()
//         }

//         const audio = new Audio(data.audioData)
//         audio.volume = 0.5
//         audio.onended = () => {
//           isPlaying.value = false
//         }
//         audioInstance.value = audio
//       }
//     } catch (e) {
//       console.error('Erro ao ler dados salvos', e)
//     }
//   }
// }

// function clearMetadata() {
//   localStorage.removeItem(STORAGE_KEY)

//   size.value = null
//   title.value = null
//   album.value = null
//   artist.value = null
//   year.value = null
//   track.value = null
//   cover.value = null
//   cover_description.value = null

//   if (audioInstance.value) {
//     audioInstance.value.pause()
//     audioInstance.value = null
//     isPlaying.value = false
//   }
//   file.value = null
// }

// onMounted(() => {
//   loadMetadata()
// })

function appendFile() {
  const inputElement = document.getElementById('audio-file-import') as HTMLInputElement

  if (inputElement.files?.length === 0) {
    alert('No file selected.')
    return
  }

  if (inputElement.files && inputElement.files.length > 0) {
    file.value = inputElement.files[0]

    jsmediatags.read(file.value, {
      onSuccess: (tag) => {
        size.value = tag.size || 'N/A'
        title.value = tag.tags.title || 'Desconhecido'
        album.value = tag.tags.album || 'Desconhecido'
        artist.value = tag.tags.artist || 'Desconhecido'
        year.value = tag.tags.year || ''
        track.value = tag.tags.track || ''

        if (tag.tags.picture) {
          const { data, format } = tag.tags.picture
          let base64String = ''

          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i])
          }

          cover.value = `data:${format};base64,${window.btoa(base64String)}`
          cover_description.value = tag.tags.picture.description
        } else {
          cover.value = null
          cover_description.value = 'Sem capa'
        }

        // saveMetadata()
      },
      onError: (err) => {
        console.error('Erro ao ler metadata:', err)
      },
    })
  }
}

// watch(file, (populatedFile) => {
//   if (populatedFile) {
//     if (audioInstance.value) {
//       audioInstance.value.pause()
//       audioInstance.value = null
//       isPlaying.value = false
//     }

//     const objectUrl = URL.createObjectURL(populatedFile)
//     const audio = new Audio(objectUrl)

//     audio.volume = 0.5
//     audio.onended = () => {
//       isPlaying.value = false
//     }

//     audioInstance.value = audio
//   }
// })

// onUnmounted(() => {
//   if (audioInstance.value) {
//     audioInstance.value.pause()
//     audioInstance.value = null
//   }
// })

// function togglePlay() {
//   if (audioInstance.value?.paused) {
//     audioInstance.value
//       ?.play()
//       .then(() => {
//         isPlaying.value = true
//       })
//       .catch((err) => {
//         console.error('Erro no play:', err)
//       })
//   } else {
//     audioInstance.value?.pause()
//     isPlaying.value = false
//   }
// }
</script>

<template>
  <main class="p-4">
    <div class="flex gap-2">
      <input
        type="file"
        id="audio-file-import"
        accept="audio/mp3"
        class="border-2 border-blue-600 rounded bg-blue-200 px-2 py-1 cursor-pointer"
        multiple="false"
      />
      <button
        class="flex items-center gap-2 border-2 border-blue-600 rounded bg-blue-200 px-2 py-1 cursor-pointer font-semibold hover:bg-blue-600 hover:text-white"
        @click="appendFile()"
      >
        <PhUpload :size="18" weight="duotone" />
        Upload
      </button>
      <button
        v-if="title"
        @click="clearMetadata()"
        class="flex items-center gap-2 border-2 border-red-600 rounded bg-red-200 px-2 py-1 cursor-pointer font-semibold hover:bg-red-600 hover:text-white"
        title="Limpar dados salvos"
      >
        <PhTrash :size="18" />
      </button>
    </div>
    <ul>
      <li>{{ size }}</li>
      <li>{{ title }}</li>
      <li>{{ album }}</li>
      <li>{{ artist }}</li>
      <li>{{ year }}</li>
      <li>{{ track }}</li>
      <li>{{ cover_description }}</li>
    </ul>
    <div class="border p-2 rounded bg-gray-100 flex items-center justify-center min-h-50">
      <img
        v-if="cover"
        :src="cover"
        alt="Capa do Álbum"
        class="max-w-75 h-auto rounded shadow-lg"
      />
      <span v-else class="text-gray-500">Nenhuma capa encontrada</span>
    </div>
  </main>
  <footer class="flex justify-center">
    <button
      v-if="audioInstance"
      @click="togglePlay()"
      class="border-2 border-blue-600 rounded-full bg-blue-200 px-2 py-2 cursor-pointer"
    >
      <PhPlayPause :size="18" />
    </button>
    <div v-else-if="title" class="text-sm text-gray-500 italic p-2">Carregando áudio...</div>
  </footer>
</template>

<style scoped></style>
