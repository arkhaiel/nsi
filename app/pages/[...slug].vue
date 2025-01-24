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
        <ProseH1 v-if="!page.stem.endsWith('index')">
          {{ page.title }}
        </ProseH1>
        <ContentRenderer :value="page" />

        <UPageList v-if="page.stem.endsWith('index') && dada.children">
          <UPageCard
            v-for="el in dada.children"
            :key="el.id"
            variant="ghost"
            orientation="vertical"
            :to="el.path"
            :title="el.title"
            :description="el.description"
          />
        </UPageList>
      </article>
    </UPageBody>
    <template
      v-if="!page.stem.endsWith('index')"
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
