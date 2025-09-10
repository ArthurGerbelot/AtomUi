'use client'

import { SimpleSelect } from "@uikit";

import { Language, languages } from "./languages";
import { useLanguageStore } from './NavigationProvider'



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