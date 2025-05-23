import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  transformTagName: tagName => tagName.replace(':', '-'),
})

export default defineEventHandler(async (event) => {
  const body = getQuery(event)
  const redirectCookie = getCookie(event, 'redirection')

  if (body.ticket) {
    // console.log(body.ticket)

    const data = parser.parse(await $fetch<any>(
      'https://enthdf.fr/cas/serviceValidate?service=https://nsi.rocks&ticket='
      + body.ticket,
    ))

    // console.log(data)

    if (Object.keys(data).includes('cas-serviceResponse')) {
      const tmp = data['cas-serviceResponse']['cas-authenticationSuccess']['cas-attributes']['cas-userAttributes']

      const user: Partial<User> = {
        id: tmp['id'],
        user: data['cas-serviceResponse']['cas-authenticationSuccess']['cas-user'],
        firstName: tmp['firstName'],
        lastName: tmp['lastName'],
        teacher: Object.keys(tmp).includes('teaches'),
        birthdate: tmp['birthDate'],
        classes: tmp['classes'],
      }

      if (user.classes) {
        try {
          const parsed = typeof user.classes === 'string'
            ? JSON.parse(user.classes)
            : user.classes

          const cleaned = parsed.map((c: string) => {
            if (!c.includes('$')) console.warn('❌ Pas de $ dans', c)
            return c.split('$')[1] ?? c // ou tu peux filtrer, ou fallback sur c
          })

          user.classes = JSON.stringify(cleaned)
        }
        catch (e) {
          console.error('💥 Erreur en traitant user.classes :', e)
        }
      }

      const res = await useDrizzle().insert(tables.users).values(user as User).onConflictDoNothing().returning()
      user.classes = res[0]?.classes || user.classes
      const log: Partial<Log> = {
        logType: res.length === 0 ? 'login' : 'first-login',
        logData: 'user : ' + user.user,
        userId: user.id,
      }

      await useDrizzle().insert(tables.logs).values(log as Log).returning()
      // const req = `INSERT OR IGNORE INTO users (${Object.keys(user).join(',')},classes) VALUES (${Object.values(user).map(() => '?').join(',')},?)`
      // db.query(req).all(...Object.values(user), tmp['classes']);

      // db.query('INSERT INTO logs (timestamp, logType, logData) VALUES (?, ?, ?)').all(Date.now(), 'login', 'login ent')

      // db.close();

      await setUserSession(event, {
        user: user,
        loggedInAt: new Date().toISOString(),
      })

      if (redirectCookie && ['rgb', 'langues'].includes(redirectCookie)) {
        setCookie(event, 'redirection', '', { maxAge: 0, domain: '.nsi.rocks' })
        await sendRedirect(event, `https://${redirectCookie}.nsi.rocks`)
      }
      else
        // await sendRedirect(event, `https://nsi.rocks?ck=${redirectCookie}`)
        await sendRedirect(event, `https://nsi.rocks`)
    }
  }
})
