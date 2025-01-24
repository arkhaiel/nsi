<template>
  <div v-if="status === 'success'">
    {{ pages }}
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: pages, status } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).all()
})
</script>

<style scoped>

</style>
