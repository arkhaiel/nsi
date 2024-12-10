import { init } from '@paralleldrive/cuid2'

const createId = init({
  length: 4,
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

  await hubKV().set(`api:get:${createId()}`, Date.now(), { ttl: 1800 })
  const apiCalls = await hubKV().keys('api:get')
  if (apiCalls.length >= 10000) {
    return createError({ status: 429, message: 'Limite de requêtes pour cette API atteinte. Veuillez rééssayer dans quelques minutes.' })
  }

  const fullD = getRouterParam(event, 'idF')
  if (fullD && !fullD.includes(':')) {
    const keyz = await hubKV().keys(`cours:${fullD}`)
    console.log(keyz.length)
    if (keyz.length > 0) {
      return 'Cette clé existe déjà. Veuillez en choisir une autre, ou ajouter votre clé secrète à la fin de la clé publique. Exemple : /api/cours/formu-toto:F6D8'
    }
    else {
      const secret = createId()
      const session = await getUserSession(event)
      await hubKV().set(`cours:${fullD}:${secret}`, session?.user?.id || 'Anonyme')
      await hubKV().set(`cours:${fullD}`, [])
      return `Clé publique : ${fullD}\nClé secrète : ${secret}`
    }
  }
  if (!fullD || !fullD.includes(':'))
    return createError({ status: 400, message: 'Format invalide.' })
  const [idF, sKey] = fullD.split(':')

  if (await hubKV().has(`cours:${idF}:${sKey}`)) {
    setResponseHeader(event, 'content-type', 'application/json; charset=utf-8')
    const data = await hubKV().get(`cours:${idF}`)
    return data
  }
  else {
    return createError({ status: 404, message: 'Données introuvables ou mauvaise clé secrète.' })
  }
})
