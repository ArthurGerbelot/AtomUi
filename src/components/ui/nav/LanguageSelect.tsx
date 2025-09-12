'use client'

import { SimpleSelect } from "@uikit";

import { Language, languages } from "@/lib/languages";
import { useLanguageStore } from '@/store/NavigationProvider'



export function LanguageSelect() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <SimpleSelect
      choices={[...languages]}
      value={language}
      onValueChange={(newLanguage) => setLanguage(newLanguage as Language)}
    />
  )
}