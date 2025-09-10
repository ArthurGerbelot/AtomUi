'use client'

import { create } from 'zustand'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ApiVersion, versions } from './versions'
import { Language, languages } from './languages'

// Combined store for both language and version
interface NavigationStore {
  language: Language
  version: ApiVersion
  isInitialized: boolean
  setLanguage: (language: Language) => void
  setVersion: (version: ApiVersion) => void
  setInitialized: (initialized: boolean) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  language: languages[0],
  version: versions[versions.length - 1],
  isInitialized: false,
  setLanguage: (language) => set({ language }),
  setVersion: (version) => set({ version }),
  setInitialized: (initialized) => set({ isInitialized: initialized }),
}))

// Convenience hooks for backward compatibility
export const useLanguageStore = () => {
  const { language, setLanguage } = useNavigationStore()
  return { language, setLanguage }
}

export const useVersionStore = () => {
  const { version, setVersion } = useNavigationStore()
  return { version, setVersion }
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { language, version, isInitialized, setLanguage, setVersion, setInitialized } = useNavigationStore()

  // Initialize store from URL on mount
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const urlLanguage = pathSegments[0]
    const urlVersion = pathSegments[1]

    // Handle special redirects first
    if (urlLanguage === 'latest-lang') {
      const defaultLanguage = languages[0] // 'en'
      const newPathSegments = [defaultLanguage, ...pathSegments.slice(1)]
      const newPath = '/' + newPathSegments.join('/')
      router.replace(newPath)
      return
    }

    // If only language is specified (/en), redirect to latest version
    if (pathSegments.length === 1 && languages.includes(urlLanguage as Language)) {
      const latestVersion = versions[versions.length - 1] // 'lastest'
      router.replace(`/${urlLanguage}/${latestVersion}`)
      return
    }

    // Initialize store with URL values
    if (urlLanguage && languages.includes(urlLanguage as Language)) {
      setLanguage(urlLanguage as Language)
    }

    if (urlVersion && versions.includes(urlVersion as ApiVersion)) {
      setVersion(urlVersion as ApiVersion)
    }

    // Mark as initialized after first sync
    setInitialized(true)
  }, [pathname, setLanguage, setVersion, setInitialized, router])

  // Sync URL when store changes (only after initialization and when user interacts)
  useEffect(() => {
    // Don't sync URL until store is initialized from URL
    if (!isInitialized) return

    const pathSegments = pathname.split('/').filter(Boolean)
    const currentUrlLanguage = pathSegments[0]
    const currentUrlVersion = pathSegments[1]

    // Only update URL if store values are different from current URL
    if (currentUrlLanguage !== language || currentUrlVersion !== version) {
      const newPathSegments = [...pathSegments]
      newPathSegments[0] = language
      newPathSegments[1] = version
      const newPath = '/' + newPathSegments.join('/')

      router.push(newPath)
    }
  }, [language, version, isInitialized, pathname, router])

  return <>{children}</>
}