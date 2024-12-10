<template>
  <div>
    <UHeader>
      <template #panel>
        <UContentNavigation :links="navigation ?? []" />
      </template>
      <template #logo>
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
      <div class="px-8">
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
      </div>
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
const path = computed(() => useRoute().path)
const route = useRoute()
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))
const localNav = computed(() => (navigation.value ?? []).filter(el => el._path == '/' + path.value.split('/')[1]) || [])
const { data: page } = await useAsyncData('page', () => queryCollection('content').route.path.findOne() || undefined, { watch: [route.path] })

// const breadcrumb = computed(() => page.value === undefined ? [] : mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)))

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
