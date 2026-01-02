<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { MusicBrainzApi, type IRecordingMatch } from 'musicbrainz-api'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import * as jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { PhHouse } from '@phosphor-icons/vue'

interface trackData {
  id: string
  title: string
  length: number
  artist: string
  release_date: string
}

const mbApi = new MusicBrainzApi({
  appName: 'clave-app',
  appVersion: '0.1.0',
  appContactInfo: 'gabriel.kasten@outlook.com',
})
const formInitialValues = ref({
  title: '',
  artist: '',
})
const trackData = ref({
  id: '',
  title: '',
  length: 0,
  artist: '',
  release_date: '',
})
const toast = useToast()
const fileUploaded = ref()
const selectedFile = ref<File | null>(null)
const formKey = ref(0)
const tracks = ref<trackData[]>()

const resolver = ({ values }: { values: { title?: string; artist?: string } }) => {
  const errors: Record<string, { message: string }[]> = {}
  return { errors }
}

const onFileSelect = (event: FileUploadSelectEvent) => {
  const file = event.files[0]
  selectedFile.value = file

  if (!file) return

  toast.add({
    severity: 'info',
    summary: 'Lendo Arquivo...',
    detail: 'Extraindo metadados ID3.',
    life: 2000,
  })
  ;(jsmediatags as any).read(file, {
    onSuccess: (tag: any) => {
      const tags = tag.tags

      formInitialValues.value = {
        title: tags.title || '',
        artist: tags.artist || '',
      }
      formKey.value++

      toast.add({
        severity: 'success',
        summary: 'Metadados Extraídos',
        detail: `Artista: ${tags.artist || '?'} - Título: ${tags.title || '?'}`,
        life: 3000,
      })
    },
    onError: (error: any) => {
      console.error('Erro ao ler tags:', error)
      toast.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Não foi possível ler as tags ID3 deste arquivo.',
        life: 3000,
      })
    },
  })
}

const uploadTrackFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  toast.add({
    severity: 'info',
    summary: 'Enviando...',
    detail: 'Fazendo upload do arquivo.',
    life: 2000,
  })

  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!response.data.filename) {
      // O backend retornou sucesso (200) mas disse que ignorou (arquivo existe)
      toast.add({
        severity: 'warn',
        summary: 'Upload Ignorado',
        detail: response.data.message || 'Arquivo já existe no servidor.',
        life: 4000,
      })
    } else {
      // Upload realizado com sucesso
      toast.add({
        severity: 'success',
        summary: 'Upload Concluído',
        detail: `Salvo como: ${response.data.filename}`,
        life: 3000,
      })
    }
  } catch (error) {
    console.error('Erro no upload:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro no Upload',
      detail: 'Falha ao conectar com o servidor.',
      life: 3000,
    })
  }
}

const retrieveTracksFromDB = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tracks')
    if (response.data) {
      console.log(response.data)
      tracks.value = response.data
    }
  } catch (error) {
    console.error('Erro ao buscar músicas:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro ao buscar músicas',
      detail: 'Falha ao conectar com o servidor.',
      life: 3000,
    })
  }
}

const retrieveTrackMetadata = async ({ artist, title }: { artist: string; title: string }) => {
  const searchQuery = `query=artist:"${artist}" AND recording:"${title}"`

  try {
    const r = await mbApi.search('recording', { query: searchQuery })

    if (r.recordings && r.recordings.length > 0) {
      const result = r.recordings[0]
      populateTrackData(result)
      toast.add({
        severity: 'success',
        summary: 'MusicBrainz',
        detail: 'Metadados encontrados.',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'warn',
        summary: 'MusicBrainz',
        detail: 'Nenhum registro encontrado.',
        life: 3000,
      })
    }
  } catch (err) {
    console.error(err)
    toast.add({
      severity: 'error',
      summary: 'Erro API',
      detail: 'Falha ao buscar no MusicBrainz.',
      life: 3000,
    })
  }
}

const populateTrackData = (result: IRecordingMatch) => {
  try {
    trackData.value = {
      id: result.id,
      title: result.title,
      length: result.length || 0,
      release_date: result['first-release-date'] ?? 'Não Informado',
      artist: result['artist-credit']?.[0]?.artist?.name ?? 'Não Informado',
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Falha ao processar dados.',
      life: 3000,
    })
  }
}

const onSubmitRetrieveTrackMetadata = async (e: FormSubmitEvent) => {
  if (e.valid) {
    const artist = e.states.artist?.value
    const title = e.states.title?.value

    if (!artist || !title) {
      toast.add({
        severity: 'error',
        summary: 'Dados Incompletos',
        detail: 'Preencha Artista e Título.',
        life: 3000,
      })
      return
    }

    if (selectedFile.value) {
      await uploadTrackFile(selectedFile.value)
    } else if (!fileUploaded.value?.files?.length) {
      // Apenas aviso visual se não tiver arquivo nenhum
      toast.add({
        severity: 'secondary',
        summary: 'Aviso',
        detail: 'Nenhum arquivo anexado para upload.',
        life: 2000,
      })
    }

    retrieveTrackMetadata({ artist: String(artist), title: String(title) })
    // TODO: post na API
  }
}

onMounted(() => {
  retrieveTracksFromDB()
})
</script>

<template>
  <div class="flex items-center px-4 gap-2 border-b border-slate-200">
    <RouterLink
      :to="`/`"
      class="border border-blue-400 p-2 rounded bg-blue-200 text-blue-800 h-fit"
    >
      <PhHouse :size="22" weight="duotone" />
    </RouterLink>
    <Form
      class="flex gap-4 w-dvw p-4"
      v-slot="$form"
      :key="formKey"
      :resolver="resolver"
      :initialValues="formInitialValues"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="onSubmitRetrieveTrackMetadata"
    >
      <div class="flex flex-col gap-1">
        <InputText name="title" type="text" placeholder="Title" fluid />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
          {{ $form.title.error.message }}
        </Message>
      </div>

      <div class="flex flex-col gap-1">
        <InputText name="artist" type="text" placeholder="Artist" fluid />
        <Message v-if="$form.artist?.invalid" severity="error" size="small" variant="simple">
          {{ $form.artist.error.message }}
        </Message>
      </div>

      <Toast />

      <FileUpload
        name="file"
        ref="fileUploaded"
        mode="basic"
        accept="audio/*"
        :maxFileSize="100000000"
        @select="onFileSelect"
      />

      <Button type="submit" severity="secondary" label="Salvar e Buscar" />
    </Form>
  </div>
  <main class="flex">
    <aside class="w-fit border-r border-slate-200 h-[90dvh] bg-slate-50">
      <ul class="gap-2 flex flex-col">
        <li class="p-4 font-semibold">Tracks:</li>
        <li v-for="track in tracks" class="px-4">
          <RouterLink
            :to="`/track/${track.id}`"
            class="flex gap-2 cursor-pointer bg-blue-200 border border-blue-400 px-4 py-2 rounded hover:bg-blue-300"
          >
            <p>{{ track.title }}</p>
            |
            <p>{{ track.artist }}</p>
          </RouterLink>
        </li>
      </ul>
    </aside>
    <router-view />
  </main>
  <footer></footer>
</template>
