<template>
  <UApp>
    <NuxtLayout :appid="appid">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { getSubdomain } from 'tldts'

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
