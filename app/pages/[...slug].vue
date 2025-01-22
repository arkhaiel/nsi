<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <UPage>
    <UPageBody>
      <article
        v-if="page"
        class="xl:px-16 mx-auto mb-8"
      >
        <ProseH1>{{ page.title }}</ProseH1>
        <ContentRenderer :value="page" />
      </article>
    </UPageBody>
    <template #right>
      <UContentToc
        v-if="page?.body?.toc"
        :links="page.body.toc.links"
        title="Sommaire"
      />
    </template>
  </UPage>
</template>
