import type { PrimeVuePTOptions } from 'primevue/config'

export const primeVuePassThrough: PrimeVuePTOptions = {
  button: {
    root: {
      class: 'rounded-lg transition-all duration-200 font-medium',
    },
  },
  inputtext: {
    root: {
      class: 'rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
    },
  },
  card: {
    root: {
      class: 'rounded-xl shadow-lg',
    },
    body: {
      class: 'p-6',
    },
  },
  // Adicione mais componentes conforme necessário
}
