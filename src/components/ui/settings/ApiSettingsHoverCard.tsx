import { Fieldset, Header, HoverCard, HoverCardProps, IconButton, IconButtonProps, IconSettings, Label, StackProps, VStack } from "@uikit"
import { ApiAuthTypeInput } from "./ApiAuthTypeInput"
import { ApiEnvInput } from "./ApiEnvInput"


export const ApiSettingsHoverCard = ({ stackProps = {}, iconButtonProps = {}, ...props }: { stackProps?: StackProps, iconButtonProps?: IconButtonProps } & Omit<HoverCardProps, 'content' | 'children'>) => {

  const content = (
    <VStack {...stackProps}>
      <Header
        variant="sub-section"
        title="API Settings"
        description="Prefered settings to display information on the docs"
      />

      <Fieldset>
        <Label>Authentication Type</Label>
        <ApiAuthTypeInput />
      </Fieldset>
      <Fieldset>
        <Label>Environment</Label>
        <ApiEnvInput />
      </Fieldset>
    </VStack>
  )

  return (
    <HoverCard content={content} {...props} >
      <IconButton icon={IconSettings} {...iconButtonProps} />
    </HoverCard>
  )
}