<script setup lang="ts">
defineProps<{
  icon?: string
  language?: string
  hideHeader?: boolean
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const config = {
  wrapper: '[&>pre]:!rounded-t-none [&>pre]:!my-0 my-5',
  header: 'flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 border-b-0 relative rounded-t-md px-4 py-3 not-prose',
  icon: {
    base: '',
  },
  button: {
    base: 'absolute top-2.5 right-2.5',
  },
  filename: 'text-gray-700 dark:text-gray-200 text-sm/6',
}

const { ui } = useUI('content.prose.code', undefined, config, undefined, true)
</script>

<template>
  <div
    class="relative"
    :class="!!filename && ui.wrapper"
  >
    <div
      v-if="filename && !hideHeader"
      :class="ui.header"
    >
      <ProseCodeIcon
        :icon="icon"
        :filename="filename"
        :class="ui.icon.base"
      />

      <span :class="ui.filename">{{ filename }}</span>
    </div>

    <pre class="rounded-none my-0"><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
