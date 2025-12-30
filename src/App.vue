<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { MusicBrainzApi, type IRecordingMatch } from 'musicbrainz-api'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import axios from 'axios';



const mbApi = new MusicBrainzApi({
  appName: 'clave-app',
  appVersion: '0.1.0',
  appContactInfo: 'gabriel.kasten@outlook.com',
})

const trackData = ref({
  track_id: '',
  track_title: '',
  track_length: 0,
  track_artist: '',
  track_release_date: '',
})


const toast = useToast()

// Ref for FileUpload component
const fileupload = ref()

const initialValues = ref({
  title: 'luv',
  artist: 'nujabes',
})

const resolver = ({ values }: { values: { title?: string; artist?: string, } }) => {
  const errors: Record<string, { message: string }[]> = {}

  if (!values.title) {
    errors.title = [{ message: 'Title is required.' }]
  }

  if (!values.artist) {
    errors.artist = [{ message: 'Artist is required.' }]
  }

  return {
    errors,
  }
}

const atachMetadata = async (result: IRecordingMatch | undefined) => {
  if (result) {
    trackData.value = {
      track_id: result.id,
      track_title: result.title,
      track_length: result.length || 0,
      track_release_date: result['first-release-date'] ?? 'Não Informado',
      track_artist: result['artist-credit']?.[0]?.artist?.name ?? 'Não Informado',
    }
  } else {
    console.error('Não foi possível atribuir metadados')
  }
}

const onSubmitRetrieveTrackMetadata = async (e: FormSubmitEvent) => {
  if (e.valid) {
    toast.add({ severity: 'success', summary: 'Metadata Retrieved.', life: 3000 })

    if (!fileupload.value || !fileupload.value.files || fileupload.value.files.length === 0) {
      alert("Por favor, selecione um arquivo de áudio.");
      return;
    }

    var formData = new FormData();
    formData.append("file", fileupload.value.files[0]);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload concluído:', response.data);
      toast.add({ severity: 'success', summary: 'Arquivo enviado para o servidor!', life: 3000 });

    } catch (error) {
      console.error('Erro no upload:', error);
      toast.add({ severity: 'error', summary: 'Falha no upload', life: 3000 });
    }

    const artist = e.states.artist?.value
    const title = e.states.title?.value

    const searchQuery = `query=artist:"${artist}" AND recording:"${title}"`

    await mbApi
      .search('recording', {
        query: searchQuery,
      })
      .then((r) => {
        atachMetadata(r.recordings[0])
      })
      .catch((err) => {
        alert(`Erro ao consultar metadados: ${err}`)
      })


  }
}

const onSubmitInsertTrackIntoDatabase = async (e: FormSubmitEvent) => {
  if (e.valid) {
    toast.add({ severity: 'success', summary: 'Inserted into Database.', life: 3000 })

    console.log(e.values)
  }
}

const formattedTrackLength = computed(() => {
  const ms = trackData.value.track_length || 0
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})
</script>

<template>
  <main class="p-4">
    <Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true"
      @submit="onSubmitRetrieveTrackMetadata" class="flex flex-col gap-4 w-full sm:w-56">
      <div class="flex flex-col gap-1">
        <InputText name="title" type="text" placeholder="Title" fluid />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
          $form.title.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="artist" type="text" placeholder="Artist" fluid />
        <Message v-if="$form.artist?.invalid" severity="error" size="small" variant="simple">{{
          $form.artist.error.message
        }}</Message>
      </div>

      <Toast />
      <FileUpload name="file" ref="fileupload" mode="basic" accept="audio/*" :maxFileSize="10000000" />


      <Button type="submit" severity="secondary" label="Submit" />
    </Form>

    <br />

    <Form v-if="trackData.track_id" v-slot="$trackForm" :initialValues="trackData"
      class="flex flex-col gap-4 w-full sm:w-56 mt-6" @submit="onSubmitInsertTrackIntoDatabase">
      <div class="flex flex-col gap-1">
        <label for="track_id">Track ID</label>
        <InputText name="track_id" id="track_id" v-model="trackData.track_id" readonly />
      </div>

      <div class="flex flex-col gap-1">
        <label for="track_title">Title</label>
        <InputText name="track_title" id="track_title" v-model="trackData.track_title" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="track_length">Length (ms)</label>
        <InputNumber name="track_length" id="track_length" v-model="trackData.track_length" type="number" />
        <small v-if="trackData.track_length">{{ formattedTrackLength }}</small>
      </div>

      <div class="flex flex-col gap-1">
        <label for="track_artist_name">Artist Name</label>
        <InputText name="track_artist_name" id="track_artist_name" v-model="trackData.track_artist" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="track_first_release_date">First Release Date</label>
        <InputText name="track_first_release_date" id="track_first_release_date"
          v-model="trackData.track_release_date" />
      </div>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>

    <!-- <vue-sound
      v-if="src"
      show-download
      image="https://images.unsplash.com/photo-1506423456648-c11ccb27338d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=750&q=80"
      title="Haydn Cello Concerto"
      title-link="https://github.com/kimlarocca/vue-sound"
      details="Lorem Ipsum Dolor Sit Amet"
      details-link="https://github.com/kimlarocca/vue-sound"
      file="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3"
      class="mb-8"
    /> -->
  </main>
  <Toast />
</template>
<style scoped></style>
