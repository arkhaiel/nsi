<template>
  <UPageBody>
    <ContentRenderer
      v-if="page"
      :value="page"
    />

    <div class="flex flex-row flex-wrap w-2/3 mx-auto my-16 gap-2">
      <div
        v-for="i in sum"
        :key="i"
        class="w-8 h-8"
        :class="[periodesAccumulated.findIndex(el => el >= i) % 2 == 0 ? 'bg-blue-400' : 'bg-slate-700', i === semaine ? 'ring-2 ring-offset-2' : '']"
      />
    </div>

    <UPageGrid>
      <UPageCard
        title="SNT"
        description="Sciences Numériques et Technologie. Cette matière est enseignée en classe de seconde."
        icon="i-simple-icons-tailwindcss"
        orientation="horizontal"
      >
        <UPageAnchors :links="linkssnt" />
      </UPageCard>
      <UPageCard
        title="NSI"
        description="Numérique et Sciences Informatiques. Cette matière est enseignée en classe de première et de terminale."
        icon="i-simple-icons-tailwindcss"
        orientation="horizontal"
      >
        <UPageAnchors :links="linksnsi" />
      </UPageCard>
    </UPageGrid>
  </UPageBody>
</template>

<script lang="ts" setup>
const dateRentree = new Date('2024-09-02')
const semaine = weeksElapsedSince(dateRentree.getTime())

const periodes = [7, 2, 7, 2, 5, 2, 6, 2, 11]

function weeksElapsedSince(startDate: number) {
  const now = Date.now()
  const diffInMilliseconds = now - startDate
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000
  return Math.floor(diffInMilliseconds / millisecondsPerWeek) + 1
}

const periodesAccumulated = periodes.reduce((acc, el) => {
  acc.push(acc[acc.length - 1]! + el)
  return acc
}, [0]).slice(1)
const sum = ref(0)
periodes.map(el => sum.value += el)

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const linksnsi = ref([
  {
    label: 'Architecture',
    icon: 'i-lucide-cpu',
    to: '/nsi/architecture',
  },
  {
    label: 'Python',
    icon: 'i-vscode-icons-file-type-python',
    to: '/nsi/python',
  },
  {
    label: 'IHM',
    icon: 'i-lucide-clipboard-list',
    to: '/nsi/ihm',
  },
  {
    label: 'Capytale',
    icon: 'i-custom-capytale',
    to: 'https://capytale2.ac-paris.fr',
    target: '_blank',
  },
  {
    label: 'Excalidraw',
    icon: 'vscode-icons-file-type-excalidraw',
    to: 'https://excalidraw.com',
    target: '_blank',
  },
])

const linkssnt = ref([
  {
    label: 'Web',
    icon: 'i-vscode-icons-file-type-html',
    to: '/snt/web',
  },
  {
    label: 'Images numériques',
    icon: 'i-vscode-icons-file-type-image',
    to: '/nsi/photo',
  },
  {
    label: 'Capytale',
    icon: 'i-custom-capytale',
    to: 'https://capytale2.ac-paris.fr',
    target: '_blank',
  },
  {
    label: 'Excalidraw',
    icon: 'vscode-icons-file-type-excalidraw',
    to: 'https://excalidraw.com',
    target: '_blank',
  },
])
</script>

<style></style>
