<template>
  <div class="m-auto w-fit my-4 flex flex-col items-end">
    <ClientOnly>
      <div class="flex flex-row items-center gap-4">
        <UColorModeSwitch />
        <UserButton redirect-app="rgb" />
      </div>
    </ClientOnly>
    <div class="flex flex-row gap-4">
      <UTooltip
        text="Télécharger l'image"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="material-symbols:cloud-download"
          :ui="{ rounded: 'rounded-full' }"
          @click="$emit('getPng')"
        />
      </UTooltip>

      <UTooltip
        text="Réinitialiser l'image"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="material-symbols:format-color-reset"
          :ui="{ rounded: 'rounded-full' }"
          @click="$emit('resetCases')"
        />
      </UTooltip>

      <UTooltip
        text="Appliquer la couleur à toutes les cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="ion:ios-color-fill"
          :ui="{ rounded: 'rounded-full' }"
          :disabled="!canApply"
          @click="$emit('applyColor')"
        />
      </UTooltip>

      <UTooltip
        text="Réduire le nombre de cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="ion:ios-remove-circle"
          :ui="{ rounded: 'rounded-full' }"
          :disabled="!candown"
          @click="$emit('sizeDown')"
        />
      </UTooltip>

      <UTooltip
        text="Augmenter le nombre de cases"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="ion:ios-add-circle"
          :ui="{ rounded: 'rounded-full' }"
          :disabled="!canup"
          @click="$emit('sizeUp')"
        />
      </UTooltip>

      <UTooltip
        text="Partager"
        :popper="{ arrow: true }"
      >
        <UButton
          size="xl"
          variant="ghost"
          icon="ion:ios-share"
          :ui="{ rounded: 'rounded-full' }"
          @click="$emit('share')"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['resetCases', 'applyColor', 'getPng', 'sizeUp', 'sizeDown', 'share'])
defineProps<{ canApply: boolean, canup: boolean, candown: boolean }>()
</script>

<style>

</style>
