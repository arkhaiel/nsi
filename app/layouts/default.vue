<template>
  <div>
    <UHeader>
      <template #content>
        <UContentNavigation :links="navigation ?? []" />
      </template>
      <template #title>
        <Logo class="block w-auto h-10" />
      </template>

      <template #right>
        <UContentSearchButton label="" />
        <ClientOnly>
          <UColorModeSwitch />
          <UserButton />
        </ClientOnly>
      </template>
    </UHeader>
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton label="Recherche..." />
              </template>
              <UContentNavigation
                :navigation="navigation"
              />
            </UPageAside>
          </template>
          <slot />
        </UPage>
      </UContainer>
    </UMain>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))

const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('content'))

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
