<template>
  <div class="h-screen w-screen">
    <AppsRgb v-if="appid === 'rgb'" />
    <AppsMd v-else-if="appid === 'md'" />
    <AppsExif v-else-if="appid === 'exif'" />
  </div>
</template>

<script lang="ts" setup>
const appid = useAttrs().appid || 'default'

onMounted(() => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    useHead({
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ],
    })
  }
})

const links = [
  {
    label: 'ENT Hauts-de-France',
    icon: 'i-heroicons-user-group',
    to: 'https://enthdf.fr',
  },
  {
    label: 'Excalidraw',
    icon: 'i-heroicons-pencil',
    to: 'https://excalidraw.com',
  },
  {
    label: 'Capytale',
    icon: 'i-heroicons-code-bracket-square',
    to: 'https://capytale2.ac-paris.fr',
  },
]
</script>

<style></style>
