'use client'

import { Choice, SimpleSelect, Text } from "@uikit";

import { ApiVersion, versions } from "./versions";
import { useVersionStore } from './NavigationProvider'



export function VersionSelect() {
  const { version, setVersion } = useVersionStore()

  const choices: Choice<ApiVersion>[] = [...versions];
  choices[choices.length - 1] = { value: 'lastest', label: <>Lastest <Text typo="caption"> - {versions[versions.length - 2]}</Text></> }

  return (
    <SimpleSelect
      choices={choices}
      value={version}
      onValueChange={(newVersion) => setVersion(newVersion as ApiVersion)}
    />
  )
}