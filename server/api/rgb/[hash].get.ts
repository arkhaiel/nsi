export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash')
  const query = getQuery(event)

  const didHandleCors = handleCors(event, {
    origin: '*',
    preflight: {
      statusCode: 204,
    },
    methods: '*',
  })
  if (didHandleCors) {
    return
  }

  type RGBData = {
    nbCases: number
    pixels: number[]
    duration: number
  }

  if (hash) {
    const data = await hubKV().get(`rgb:${hash}`) as RGBData | null
    if (data) {
      if (query && Object.keys(query).includes('img')) {
        setResponseHeader(event, 'Content-Type', 'image/png')
        const { nbCases, pixels, duration } = data

        let blob = null
        try {
          blob = await hubBlob().get(`rgb/${hash}.png`)
        }
        catch (error) {
          console.error('Erreur lors de la récupération du blob :', error)
        }

        return blob || genPNG({
          nbCases: nbCases,
          pixels: pixels,
          duration: duration,
        })
      }
      else return data
    }
    else {
      return new Response('Not found', { status: 404 })
    }
  }
  else {
    return new Response('Bad request', { status: 400 })
  }
})

// , {
//   maxAge: 60 * 60 * 24 * 7,
//   getKey: event => `rgb:data:${getRouterParam(event, 'hash')}`,
// }
