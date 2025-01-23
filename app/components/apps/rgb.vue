<template>
  <UHeader />
  <UMain>
    <UContainer>
      <ClientOnly>
        <div
          v-if="isGridReady"
          class="flex flex-col-reverse md:flex-row items-start md:items-center md:h-[100vh] md:max-w-[100vw] justify-center items-center mb-8"
        >
          <div class="grow flex flex-row justify-center items-center max-w-[800px] p-8">
            <canvas
              ref="canvas"
              :width="canvasWidth+2*gutter"
              :height="canvasHeight+2*gutter"
              class="max-w-full max-h-[90vh]"
              @pointerdown.prevent="canvasMouseDown"
              @pointermove.prevent="canvasMouseMove"
              @pointerup.prevent="canvasMouseUp"
              @touchmove.prevent
            />
          </div>
          <div class="w-full md:max-h-[100vh] md:w-fit md:self-start flex flex-col gap-2 p-0 sm:p-4">
            <AppsRgbToolbar
              :can-apply="mode === 1"
              :canup="ca < (isKonamiCode ? 20 : 10) && images.length === 1"
              :candown="ca > 1 && images.length === 1"
              @reset-cases="resetCases"
              @apply-color="resetCases(data[curr])"
              @get-png="getPNG"
              @size-up="resize('up')"
              @size-down="resize('down')"
              @share="shareGrid"
            />
            <UTabs
              v-model="mode"
              :items="items"
              class="mb-2 px-4"
            >
              <template #rgb="{ item }">
                <UTooltip
                  text="Passer de RGB à hexadécimal"
                  class="flex justify-center cursor-pointer"
                >
                  <div
                    class="font-semibold text-xl"
                    @click="currCol += 1"
                  >
                    <span v-if="currCol % 2 === 0">r: {{ data[curr].r }}, g: {{ data[curr].g }}, b: {{ data[curr].b }}</span>
                    <span v-if="currCol % 2 === 1">#{{ toHex(data[curr]) }}</span>
                  </div>
                </UTooltip>
                <div>
                  <USlider
                    v-for="a in sliders"
                    :key="a.key"
                    v-model="data[curr][a.key]"
                    :color="'neutral'"
                    :step="1"
                    :min="0"
                    :max="255"
                    class="my-8"
                  />
                  <USlider
                    v-model="allColors"
                    color="neutral"
                    :step="1"
                    :min="0"
                    :max="255"
                    @update:model-value="
                      data[curr] = { r: allColors, g: allColors, b: allColors }
                    "
                  />
                </div>
              </template>
            </UTabs>
            <UCard
              class="hidden md:block grow overflow-y-scroll"
              :ui="{ body: { base: 'flex flex-col' } }"
            >
              <template #header>
                <div class="flex flex-row items-center">
                  <h3 class="grow">
                    Images
                  </h3>
                  <UInput
                    v-model="dur"
                    class="max-w-16"
                  />
                  <UTooltip
                    text="Dupliquer l'image courante"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      icon="ion:md-copy"
                      variant="ghost"
                      class="text-lg"
                      @click="addWCopyImg(currImg)"
                    />
                  </UTooltip>
                  <UTooltip
                    text="Ajouter une image vide"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      icon="ion:md-add"
                      variant="ghost"
                      class="text-lg"
                      @click="addImg"
                    />
                  </UTooltip>
                </div>
              </template>

              <div
                v-for="img in images"
                :key="img.id"
                class="flex flex-row justify-between w-52"
              >
                <div
                  class="flex items-center rounded-md p-2 gap-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-36"
                  @click="img.click"
                >
                  <UIcon
                    :name="img.icon"
                    class="w-5 h-5"
                    :class="img.id === currImg ? 'text-primary-500' : ''"
                  />
                  <span
                    class="grow"
                    :class="img.id === currImg ? 'text-primary-500' : ''"
                  >{{ img.label }}</span>
                </div>
                <div>
                  <UTooltip
                    v-if="images.length > 1 && img.id !== currImg"
                    text="Copier les pixels dans l'image actuelle"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      icon="ion:arrow-up-right-box-outline"
                      variant="ghost"
                      class="text-lg"
                      :class="img.id === 0 ? 'mr-8' : ''"
                      @click="cpImg(img.id)"
                    />
                  </UTooltip>
                  <UTooltip
                    v-if="img.id > 0"
                    text="Supprimer l'image"
                    :popper="{ arrow: true }"
                  >
                    <UButton
                      icon="ion:trash-outline"
                      variant="ghost"
                      class="text-lg"
                      @click="delImg(img.id)"
                    />
                  </UTooltip>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </ClientOnly>
    </UContainer>
  </UMain>
</template>

<script lang="ts" setup>
import { LazyAppsRgbModal } from '#components'

const modal = useModal()

defineShortcuts({
  arrowLeft: () => move('left'),
  arrowRight: () => move('right'),
  arrowUp: () => move('up'),
  arrowDown: () => move('down'),
  a: () => logSequence('a'),
  b: () => logSequence('b'),
  d: () => addImg(),
  c: () => addWCopyImg(currImg.value),
})

const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']
const isKonamiCode = ref(false)
const toast = useToast()

const invertColors = () => {
  data.value = data.value.map(d => ({
    r: 255 - d.r,
    g: 255 - d.g,
    b: 255 - d.b,
  }))
}

const logSequence = (key: string) => {
  if (konamiCode[0] === key) {
    konamiCode.shift()
    if (konamiCode.length === 0) {
      toast.add({
        title: 'Konami Code activé, vous pouvez désormais utiliser 20 cases maximum',
      })
      isKonamiCode.value = true
      const interval = setInterval(() => {
        invertColors()
        drawCanvas()
      }, 200)
      setTimeout(() => {
        clearInterval(interval)
        initGrid()
      }, 2000)
      konamiCode.push('up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a')
    }
  }
  else {
    konamiCode.push('up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a')
  }
}

const currCol = ref(0)
const toHex = (obj: RGB) => obj.r.toString(16).padStart(2, '0') + obj.g.toString(16).padStart(2, '0') + obj.b.toString(16).padStart(2, '0')
const slug = useRoute().params.slug

const ctx = ref()
const canvas = ref<HTMLCanvasElement | null>(null)
const gutter = ref(15)

const canvasWidth = ref(1000)
const canvasHeight = ref(1000)

let clonedElement: HTMLElement | null = null

// const ca = parseInt(useRoute().query.cases as string || '3')
const ca = ref(3)
const cases = computed(() => ca.value * ca.value)
const data = ref<RGB[]>([])
const isGridReady = computed(() => {
  return data.value.length === cases.value
})
const base = { r: 0, g: 0, b: 0 }
const allColors = ref(0)
const curr = ref(1)
const mode = ref('0')
const isOpen = ref(false)
const code = ref('')

const dur = ref(1000)
const currImg = ref(0)

function open() {
  modal.open(LazyAppsRgbModal, {
    description: 'And you can even provide a description!',
    code: code.value,
    onGetPNG: getPNG,
  })
}

const items = [
  {
    key: 'bw',
    slot: 'bw',
    label: 'Noir et blanc',
  },
  {
    key: 'rgb',
    slot: 'rgb',
    label: 'Couleurs',
  },
]
const sliders = [
  {
    label: 'Rouge',
    color: 'red',
    key: 'r',
  },
  {
    label: 'Vert',
    color: 'green',
    key: 'g',
  },
  {
    label: 'Bleu',
    color: 'blue',
    key: 'b',
  },
]

watchEffect(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawCanvas()
  }
})

const drawCanvas = () => {
  if (!ctx.value) return
  ctx.value.clearRect(0, 0, canvasWidth.value + 2 * gutter.value, canvasHeight.value + 2 * gutter.value)

  const cellWidth = (canvasWidth.value - (ca.value - 1) * gutter.value) / ca.value
  const cellHeight = (canvasHeight.value - (ca.value - 1) * gutter.value) / ca.value

  data.value.forEach((d, i) => {
    const x = i % ca.value
    const y = Math.floor(i / ca.value)

    ctx.value.fillStyle = `rgb(${d.r},${d.g},${d.b})`
    ctx.value.fillRect(
      x * (cellWidth + gutter.value) + gutter.value, // Ajoute le gutter dans la position x
      y * (cellHeight + gutter.value) + gutter.value, // Ajoute le gutter dans la position y
      cellWidth,
      cellHeight,
    )

    if (curr.value === i && mode.value === 1) {
      const lw = 4
      ctx.value.strokeStyle = 'blue'
      ctx.value.lineWidth = lw
      ctx.value.strokeRect(
        x * (cellWidth + gutter.value) - lw + gutter.value, // Ajoute le gutter
        y * (cellHeight + gutter.value) - lw + gutter.value, // Ajoute le gutter
        cellWidth + 2 * lw,
        cellHeight + 2 * lw,
      )
    }
  })
}

const getEventCoods = (event: PointerEvent) => {
  const coords = { x: event.clientX, y: event.clientY }
  return coords
}

const canvasClick = (e) => {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const cellWidthWithGutter = (rect.width - (ca.value - 1) * gutter.value) / ca.value + gutter.value
  const cellHeightWithGutter = (rect.height - (ca.value - 1) * gutter.value) / ca.value + gutter.value

  const coords = getEventCoods(e)
  if (!coords) return // Sécurité en cas de problème

  const x = Math.floor((coords.x - rect.left) / cellWidthWithGutter)
  const y = Math.floor((coords.y - rect.top) / cellHeightWithGutter)

  // Calculer les limites de la cellule (incluant le gutter)
  const cellStartX = x * cellWidthWithGutter
  const cellStartY = y * cellHeightWithGutter

  // Calculer les limites internes de la cellule (sans le gutter)
  const gutterOffsetX = (coords.x - rect.left) - cellStartX
  const gutterOffsetY = (coords.y - rect.top) - cellStartY
  const cellInnerWidth = cellWidthWithGutter - gutter.value
  const cellInnerHeight = cellHeightWithGutter - gutter.value

  if (gutterOffsetX > cellInnerWidth || gutterOffsetY > cellInnerHeight) {
  }
  else {
    if (mode.value === 1) {
      curr.value = y * ca.value + x
      allColors.value = 0
    }
    else {
      const cellData = data.value[y * ca.value + x]
      if (cellData) {
        const sum = cellData.r + cellData.g + cellData.b
        if (sum < 382) data.value[y * ca.value + x] = { r: 255, g: 255, b: 255 }
        else data.value[y * ca.value + x] = { r: 0, g: 0, b: 0 }
      }
      drawCanvas()
    }
  }
}

const getCellFromCoordinates = (x: number, y: number) => {
  const rect = canvas.value!.getBoundingClientRect()
  const cellWidthWithGutter = (rect.width - (ca.value - 1) * gutter.value) / ca.value + gutter.value
  const cellHeightWithGutter = (rect.height - (ca.value - 1) * gutter.value) / ca.value + gutter.value

  const cellX = Math.floor((x - rect.left) / cellWidthWithGutter)
  const cellY = Math.floor((y - rect.top) / cellHeightWithGutter)

  if (cellX >= 0 && cellX < ca.value && cellY >= 0 && cellY < ca.value) {
    return { x: cellX, y: cellY }
  }
  return null
}

const dragging = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })
const dragThreshold = 5
const cellSelected = ref({ x: -1, y: -1 })

const canvasMouseDown = (e) => {
  dragging.value = true
  const coords = getEventCoods(e)
  if (!coords) return // Sécurité en cas de problème

  dragStartPos.value = coords
}

const canvasMouseMove = (e) => {
  if (!dragging.value) return

  const coords = getEventCoods(e)
  if (!coords) return // Sécurité en cas de problème

  const distanceMoved = getDistance(dragStartPos.value, coords)

  if (distanceMoved > dragThreshold) {
    // C'est un glisser-déposer
    const cell = getCellFromCoordinates(coords.x, coords.y) || { x: 0, y: 0 }

    dragging.value = true
    if (!clonedElement)
      clonedElement = createElement(data.value[cell.y * ca.value + cell.x] as RGB)
    if (dragging.value) {
      clonedElement.style.left = `${coords.x}px`
      clonedElement.style.top = `${coords.y}px`
    }

    if (cell && cellSelected.value.x === -1 && dragging.value) {
      cellSelected.value = cell
    }
  }
}

const canvasMouseUp = (e) => {
  const coords = getEventCoods(e)
  if (!coords) return // Sécurité en cas de problème

  if (clonedElement) {
    document.body.removeChild(clonedElement)
    clonedElement = null
  }

  const distanceMoved = getDistance(dragStartPos.value, coords)

  if (distanceMoved <= dragThreshold) {
    canvasClick(e) // Appeler la fonction de gestion de clic
  }
  else {
    // C'est un glisser-déposer
    const cell = getCellFromCoordinates(coords.x, coords.y)
    if (cell && cellSelected.value.x !== -1) {
      data.value[cell.y * ca.value + cell.x] = { ...data.value[cellSelected.value.y * ca.value + cellSelected.value.x] }
      cellSelected.value = { x: -1, y: -1 }
      drawCanvas()
    }
  }

  dragging.value = false
  cellSelected.value = { x: -1, y: -1 }
}

type RGB = { r: number, g: number, b: number }

type ImageData = {
  id: number
  label: string
  icon: string
  data: RGB[]
  click: () => void
}

const images = ref<ImageData[]>([
  {
    id: 0,
    label: 'Image 0',
    icon: 'ion:md-image',
    data: [], // Tu pourrais initialiser avec des valeurs si nécessaire
    click: () => {
      changeImg(0)
    },
  },
])

const logImg = () => {
  images.value.find(el => el.id === currImg.value).data = [...data.value]
}

const addImg = () => {
  logImg()
  const imgId = images.value.at(-1).id + 1
  images.value.push({
    id: imgId,
    label: `Image ${imgId}`,
    icon: 'ion:md-image',
    data: [],
    click: () => {
      changeImg(imgId)
    },
  })
  initGrid()
  currImg.value = imgId
}

const changeImg = (imgId) => {
  logImg()
  currImg.value = imgId
  const newImg = images.value.find(el => el.id === imgId).data
  data.value = [...newImg]
}

const delImg = (imgId) => {
  if (images.value.length === 1) return
  const index = images.value.findIndex(img => img.id === imgId)
  images.value.splice(index, 1)
  if (currImg.value === imgId) {
    currImg.value = 0
    data.value = images.value[currImg.value].data
  }
}

const cpImg = (imgId) => {
  const datapx = toRaw(images.value.find(el => el.id === imgId).data)
  data.value = datapx.map(el => ({ ...el }))
}

const addWCopyImg = (imgId) => {
  addImg()
  cpImg(imgId)
}

const resize = (updown: string) => {
  if (updown === 'up' && ca.value < (isKonamiCode.value ? 20 : 10)) {
    const backup = toRaw(data.value)
    ca.value += 1
    initGrid()
    data.value.forEach((d, i) => {
      if (i < (ca.value - 1) * ca.value && i % ca.value < ca.value - 1)
        data.value[i] = { ...backup[i - ~~(i / ca.value)] }
    })
  }
  else if (updown === 'down' && ca.value > 1) {
    curr.value = curr.value >= (ca.value - 1) ** 2 ? (ca.value - 1) ** 2 - 1 : curr.value
    const backup = toRaw(data.value).filter((_, i) => (i + 1) % ca.value !== 0)
    ca.value -= 1
    initGrid()
    data.value.forEach((d, i) => (data.value[i] = { ...backup[i] }))
  }
  // initGrid()
}

const refreshAllColors = () => {
  allColors.value = Object.values(data.value[curr.value]).reduce((a, b) => a + b) / 3
}

const move = (direction: string) => {
  logSequence(direction)
  if (direction === 'left') toLeft()
  else if (direction === 'right') toRight()
  else if (direction === 'up') toUp()
  else if (direction === 'down') toDown()
  refreshAllColors()
}

const toLeft = () => {
  const backup = toRaw(data.value).map((d, i) => (i % ca.value === 0 ? { ...base } : d))
  initGrid()
  data.value.forEach((d, i) => {
    if (i < cases.value - 1) data.value[i] = { ...backup[i + 1] }
  })
}

const toRight = () => {
  const backup = toRaw(data.value).map((d, i) =>
    i % ca.value === ca.value - 1 ? { ...base } : d,
  )
  initGrid()
  data.value.forEach((d, i) => {
    if (i > 0) data.value[i] = { ...backup[i - 1] }
  })
}

const toUp = () => {
  const backup = toRaw(data.value).map((d, i) => (i < ca.value ? { ...base } : d))
  initGrid()
  data.value.forEach((d, i) => {
    if (i < cases.value - ca.value) data.value[i] = { ...backup[i + ca.value] }
  })
}

const toDown = () => {
  const backup = toRaw(data.value).map((d, i) =>
    i >= cases.value - ca.value ? { ...base } : d,
  )
  initGrid()
  data.value.forEach((d, i) => {
    if (i >= ca.value) data.value[i] = { ...backup[i - ca.value] }
  })
}

const shareGrid = async () => {
  logImg()

  const toSend
    = images.value.length > 1
      ? images.value.map(el => el.data.map(({ r, g, b }) => [r, g, b]).flat())
      : data.value.map(({ r, g, b }) => [r, g, b]).flat()

  const stringData = JSON.stringify({
    nbCases: ca.value,
    pixels: toSend,
    duration: dur.value,
  })

  const hash = mmh3(stringData).toString(16)
  const res = await $fetch('/api/rgb', {
    method: 'post',
    body: {
      hash,
      data: JSON.parse(stringData),
    },
  })
  code.value = res
  open()
}

const getPNG = () => {
  logImg()

  const toSend
    = images.value.length > 1
      ? images.value.map(el => el.data.map(({ r, g, b }) => [r, g, b]).flat())
      : data.value.map(({ r, g, b }) => [r, g, b]).flat()

  $fetch<Blob>('/api/topng', {
    method: 'post',
    responseType: 'blob',
    body: {
      nbCases: ca.value,
      pixels: toSend,
      duration: dur.value,
    },
  }).then((canvas: Blob) => {
    const link = document.createElement('a')
    link.download = 'pixel-image.png'
    const url = URL.createObjectURL(canvas)
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  })
}
const initGrid = () => {
  data.value = Array.from({ length: cases.value }, () => ({ ...base }))
}

const isOneFrame = (pixels) => {
  if (Array.isArray(pixels) && pixels.every(Number.isInteger)) {
    return true
  }
  else if (Array.isArray(pixels) && pixels.every(Array.isArray)) {
    // on a un tableau de tableaux de pixels
    return false
  }
  throw new Error(
    'pixels should be an array of integers or an array of arrays of integers',
  )
}

const unflattenRgb = (flatArray) => {
  const result = []
  for (let i = 0; i < flatArray.length; i += 3) {
    result.push({ r: flatArray[i], g: flatArray[i + 1], b: flatArray[i + 2] })
  }
  return result
}

const genImages = (pixels) => {
  if (isOneFrame(pixels)) {
    data.value = unflattenRgb(pixels)
  }
  else {
    data.value = unflattenRgb(pixels[0])
    images.value = pixels.map((frame, i) => ({
      id: i,
      label: `Image ${i}`,
      icon: 'ion:md-image',
      data: unflattenRgb(frame),
      click: () => {
        changeImg(i)
      },
    }))
  }
}

const createElement = (color: RGB) => {
  const el = document.createElement('div')
  el.style.width = '50px'
  el.style.height = '50px'
  el.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
  el.style.position = 'fixed'
  el.style.zIndex = '1000'
  el.style.pointerEvents = 'none'
  el.style.opacity = '0.6'
  el.style.transform = 'translate(-50%, -50%)'
  document.body.appendChild(el)
  return el
}

const resetCases = (color?) => {
  data.value = Array.from({ length: cases.value }, () => ({ ...base, ...color }))
}

if (slug) {
  $fetch(`/api/rgb/${slug}`)
    .then((res) => {
      ca.value = res.nbCases
      genImages(res.pixels)
      dur.value = res.duration
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error)
      initGrid()
    })
}
else initGrid()
</script>

<style>
.dragover {
  border: 4px dashed gray;
}
</style>
