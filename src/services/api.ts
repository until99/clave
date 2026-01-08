import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export interface Track {
  id: number
  title: string
  artist: string
  album: string | null
  length: number | null
  release_date: string | null
  file_path: string | null
  createdAt?: string
  updatedAt?: string
}

export interface UploadTrackData {
  title: string
  artist: string
  album?: string
  length?: number
  release_date?: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const trackService = {
  // Listar todas as tracks
  async getAllTracks(): Promise<Track[]> {
    const response = await api.get<Track[]>('/tracks')
    return response.data
  },

  // Buscar track por ID
  async getTrackById(id: number): Promise<Track> {
    const response = await api.get<Track>(`/tracks/${id}`)
    return response.data
  },

  // Obter URL de stream da track
  getStreamUrl(id: number): string {
    return `${API_BASE_URL}/tracks/${id}/stream`
  },

  // Criar nova track
  async createTrack(trackData: UploadTrackData): Promise<Track> {
    const response = await api.post<Track>('/tracks', trackData)
    return response.data
  },

  // Upload de arquivo com metadados
  async uploadTrack(
    file: File,
    trackData: UploadTrackData,
  ): Promise<{ message: string; track?: Track }> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', trackData.title)
    formData.append('artist', trackData.artist)
    if (trackData.album) formData.append('album', trackData.album)
    if (trackData.length) formData.append('length', trackData.length.toString())
    if (trackData.release_date) formData.append('release_date', trackData.release_date)

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Atualizar track
  async updateTrack(id: number, trackData: Partial<UploadTrackData>): Promise<Track> {
    const response = await api.put<Track>(`/tracks/${id}`, trackData)
    return response.data
  },

  // Deletar track
  async deleteTrack(id: number): Promise<void> {
    await api.delete(`/tracks/${id}`)
  },
}
