import { getSubdomain } from 'tldts'

export default defineNuxtRouteMiddleware((to, from) => {
  const apps = ['rgb', 'md', 'exif']
  const subdomain = getSubdomain(useRequestURL().hostname) || ''
  console.log(subdomain)

  setPageLayout(apps.includes(subdomain) ? 'app-layout' : to.fullPath === '/' ? 'landing' : 'default')
})
