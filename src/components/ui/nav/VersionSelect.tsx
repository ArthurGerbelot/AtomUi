'use client'

import { Choice, SimpleSelect, Text } from "@uikit";

import { toApiVersion, toVersionString, versions } from "@/lib/versions";

import { useVersionStore } from '@/store/NavigationProvider'



export function VersionSelect() {
  const { version, setVersion } = useVersionStore()

  const choices: Choice<string>[] = [...versions.map(v => toVersionString(v))];
  choices[choices.length - 1] = { value: 'lastest', label: <>Lastest <Text typo="caption"> - {toVersionString(versions[versions.length - 2])}</Text></> }

  return (
    <SimpleSelect
      choices={choices}
      value={toVersionString(version)}
      onValueChange={(newVersion) => {
        console.log("newVersion => ", newVersion);
        console.log("toApiVersion => ", toApiVersion(newVersion));
        setVersion(toApiVersion(newVersion));

      }}
    />
  )
}