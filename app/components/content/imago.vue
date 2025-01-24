<template>
  <ClientOnly>
    <figure>
      <img
        :src="`/images/${ld_src}`"
        style="margin: auto;"
        :width="iwidth"
      >
      <figcaption style="text-align: center;">
        <slot />
      </figcaption>
    </figure>
  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: String,
  nodark: {
    type: Boolean,
    default: false,
  },
  iwidth: {
    type: Number,
    default: 500,
  },
})

const c = useColorMode()
const ld_src = computed(() => c.value === 'dark' ? props.src?.replace('.png', '-d.png') : props.src)
</script>

<style>

</style>
