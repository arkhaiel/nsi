<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const { data: test } = await useAsyncData(() => queryCollectionNavigation('content', ['description']))

const datest = test.value.find(el => el.path == '/' + route.path.split('/')[1])
const dada = datest?.children.find(el => el.path == route.path)
</script>

<template>
  <UPage>
    <UPageBody>
      <article
        v-if="page"
        class="xl:px-16 mx-auto mb-8"
      >
        <ProseH1 v-if="!page.landing">
          {{ page.title }}
        </ProseH1>
        <ContentRenderer
          v-if="!page.landing"
          :value="page"
        />
        <div v-else>
          <div class="flex flex-row justify-between mb-8">
            <div>
              <ProseH1 class="text-5xl mb-4">
                {{ page.title }}
              </ProseH1>
              <p>{{ page.description }}</p>
            </div>
            <UIcon
              :name="page.icon"
              class="sm:m-8 m-0"
              size="90"
            />
          </div>

          <UPageList v-if="page.landing && dada?.children">
            <UPageCard
              v-for="el in dada.children"
              :key="el.id"
              variant="subtle"
              orientation="vertical"
              :to="el.path"
              :description="el.description"
              class="rounded-none"
            >
              <template #title>
                <div class="flex items-center">
                  <icon
                    name="i-lucide-notebook-text"
                    class="mr-2"
                  />
                  {{ el.title }}
                </div>
              </template>
            </UPageCard>
          </UPageList>
        </div>
      </article>
    </UPageBody>
    <template
      v-if="!page?.landing"
      #right
    >
      <UContentToc
        v-if="page?.body?.toc"
        :links="page.body.toc.links"
        title="Sommaire"
      />
    </template>
  </UPage>
</template>
