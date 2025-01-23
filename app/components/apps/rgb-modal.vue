<template>
  <UModal>
    <UCard>
      <div class="flex flex-col items-center">
        <p>Votre image est désormais disponible à l'adresse suivante :</p>
        <div class="flex justify-between items-center gap-2">
          <span>https://rgb.nsi.rocks/{{ code }}</span>
          <UButton
            icon="ion:md-clipboard"
            class="text-lg my-4"
            variant="ghost"
            @click="clipCode"
          />
        </div>

        <figure>
          <img
            :src="`/api/rgb/${code}?img`"
            alt="Image"
          >
          <figcaption class="flex justify-center my-4">
            <UButton
              variant="ghost"
              @click="getPNG"
            >
              Télécharger
            </UButton>
          </figcaption>
        </figure>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const modal = useModal()

defineProps<{
  code: string
}>()

const emit = defineEmits(['success'])

function onSuccess() {
  emit('success')
}
</script>

<style scoped>

</style>
