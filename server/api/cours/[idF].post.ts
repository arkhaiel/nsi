import { init } from '@paralleldrive/cuid2'

interface ApiKey {
  rateLimit: number
  usage: Array<number>
  fails: Array<number>
}
const createId = init({
  length: 10,
})

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

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

  const idF = getRouterParam(event, 'idF')
  const bodyData = await readBody(event)
  const { api, ...body } = bodyData
  const apiKey: ApiKey | null = await hubKV().get(`api:cles:${api}`)

  if (apiKey && apiKey.rateLimit) {
    const data = await hubKV().keys(`api:cles:${api}`)
    if (data.length >= apiKey.rateLimit) {
      apiKey.fails.push(Date.now())
      await hubKV().set(`api:cles:${api}`, apiKey)
      throw createError({
        status: 429,
        statusMessage: 'Too Many Requests',
        message: 'Limite de requêtes pour cette clé API atteinte. Veuillez rééssayer dans quelques minutes.',
      })
    }
    apiKey.usage.push(Date.now())
    await hubKV().set(`api:cles:${api}`, apiKey)
    await hubKV().set(`api:cles:${api}:${createId()}`, Date.now(), { ttl: 1800 })
  }
  else if (!apiKey) {
    throw createError({
      status: 401,
      statusMessage: 'Unauthorized',
      message: 'Clé API absente ou invalide. Contactez contact@nsi.rocks pour obtenir une clé API.',
    })
  }

  if (await hubKV().has(`cours:${idF}`)) {
    const data = await hubKV().get(`cours:${idF}`)
    data.push(body)
    await hubKV().set(`cours:${idF}`, data)
  }
  else await hubKV().set(`cours:${idF}`, [body])

  return body
})
