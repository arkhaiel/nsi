<template>
  <div>
    <UHeader mode="slideover">
      <template #content>
        <UContentNavigation :navigation="navigation ?? []" />
      </template>
      <template #title>
        <Logo class="block w-auto h-10" />
      </template>
      <UNavigationMenu :items="links" />
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
                :navigation="navigation.filter((el) => el.path.startsWith('/' + route.path.split('/')[1]))[0]?.children"
                highlight
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
const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content', ['icon']))

const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('content'))

const links = computed(() => [
  {
    label: 'NSI',
    to: '/nsi',
    active: route.path.startsWith('/nsi'),
  },
  {
    label: 'SNT',
    to: '/snt',
    active: route.path.startsWith('/snt'),
  },
  {
    label: 'ARTICLES',
    to: '/articles',
    active: route.path.startsWith('/articles'),
  },
])
</script>

<style></style>
