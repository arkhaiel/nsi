<template>
  <UApp>
    <UBanner
      v-if="isFirefox"
      title="Ce site n'est pour l'instant pas complètement optimisé pour le navigateur Firefox, veuillez utiliser Google Chrome."
      close
    />
    <NuxtLayout :appid="appid">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { getSubdomain } from 'tldts'
import { LazyModalCompat } from '#components'

const overlay = useOverlay()

const isFirefox = ref(false)

function getBrowserInfo() {
  const ua = navigator.userAgent
  if (ua.includes('Chrome')) {
    const version = parseInt(ua.match(/Chrome\/(\d+)/)?.[1], 10)
    return { name: 'Chrome', version }
  }
  if (ua.includes('Firefox')) {
    const version = parseInt(ua.match(/Firefox\/(\d+)/)?.[1], 10)
    return { name: 'Firefox', version }
  }
  if (ua.includes('Safari') && !ua.includes('Chrome')) {
    const version = parseInt(ua.match(/Version\/(\d+)/)?.[1], 10)
    return { name: 'Safari', version }
  }
  return { name: 'Unknown', version: 0 }
}

onMounted(() => {
  const browser = getBrowserInfo()
  console.log(`Browser: ${browser.name}, Version: ${browser.version}`)

  // Vérification pour Tailwind v4 (Chrome 111+, Safari 16.4+, Firefox 128+)
  if (
    (browser.name === 'Chrome' && browser.version < 111)
    || (browser.name === 'Firefox' && browser.version < 128)
    || (browser.name === 'Safari' && browser.version < 16.4)
  ) {
    console.warn('Votre navigateur n\'est pas totalement compatible avec Tailwind CSS v4 !')
    const modal = overlay.create(LazyModalCompat, {
      props: {
        nav: browser.name,
        version: browser.version.toString(),
      },
    })
    modal.open()
  }
})

const ticket = useRoute().query.ticket

const appid = getSubdomain(useRequestURL().hostname) || ''

if (ticket) {
  await navigateTo('/api/auth/ticket?ticket=' + ticket)
}

useHead({
  title: 'NSI Rocks !',
  meta: [
    { name: 'description', content: 'NSI Rocks !' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>
