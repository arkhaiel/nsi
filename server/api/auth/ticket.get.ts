import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  transformTagName: tagName => tagName.replace(':', '-'),
})

export default defineEventHandler(async (event) => {
  const body = getQuery(event)

  if (body.ticket) {
    console.log(body.ticket)

    const data = parser.parse(await $fetch(
      'https://enthdf.fr/cas/serviceValidate?service=https://nsi.rocks&ticket='
      + body.ticket,
    ))

    console.log(data)

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

      const res = await useDrizzle().insert(tables.users).values(user as User).onConflictDoNothing().returning()

      const log: Partial<Log> = {
        logType: res.length === 0 ? 'login' : 'first-login',
        logData: 'user : ' + user.user,
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

      await sendRedirect(event, '/')
    }
  }
})