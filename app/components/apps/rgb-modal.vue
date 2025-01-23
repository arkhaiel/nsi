<template>
  <UModal>
    <template #footer>
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
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const toast = useToast()

const props = defineProps<{
  code: string
}>()

const emit = defineEmits(['getPNG'])

function getPNG() {
  emit('getPNG')
}

const clipCode = async () => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`https://rgb.nsi.rocks/${props.code}`)
      toast.add({
        title: 'Lien copié dans le presse-papier',
      })
    }
    catch (error) {
      toast.add({
        title: 'Impossible de copier le lien',
      })
    }
  }
  else {
    toast.add({
      title: 'Le presse-papier n\'est pas pris en charge',
    })
  }
}
</script>

<style scoped>

</style>
