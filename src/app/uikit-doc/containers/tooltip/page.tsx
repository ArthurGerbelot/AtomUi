'use client'

import { Badge, Button, Card, HStack, Header, Code, VStack, Text, Tooltip, Popover, TextWithIcon, IconUser, HoverCard, List, IconCross, IconSettings } from "@uikit"
import * as React from "react"

const TeamMemberPopover = ({ children }: { children?: React.ReactNode }) => (
  <VStack gap="sm" className="w-56">
    <HStack gap="sm" align="center">
      <div className="h-8 w-8 bg-green-500 text-white flex items-center justify-center text-xs font-medium rounded-full">
        SK
      </div>
      <VStack gap="xs" className="flex-1">
        <Text weight="medium" textSize="sm">Sarah Kim</Text>
        <Text textSize="xs" textColor="muted">Lead Designer</Text>
      </VStack>
      <Badge colorTheme="success">Online</Badge>
    </HStack>
    <Text textSize="sm" textColor="muted">
      Currently working on the new design system. Available for quick chats.
    </Text>
    {children}
  </VStack>
)

export default function TooltipDocsPage() {
  return (
    <div className="px-6 py-12 space-y-12">
      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Tooltip</Code>, <Code includeTag textSize="4xl">Popover</Code> & <Code includeTag textSize="4xl">HoverCard</Code></>}
        subtitle="Complete guide for displaying content on hover"
        description="Learn when to use Tooltip for simple hints, Popover for rich content, and HoverCard for an optimized native solution."
      />

      <VStack gap="md">
        <HStack gap="lg" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="✅ Use Tooltip When">
            <List>
              <List.Item>Simple text labels</List.Item>
              <List.Item>Keyboard shortcuts (Ctrl+S)</List.Item>
              <List.Item>Brief help text</List.Item>
              <List.Item>Icon explanations</List.Item>
              <List.Item>Status information</List.Item>
            </List>
          </Card>

          <Card title="🎯 Use HoverCard When">
            <List>
              <List.Item>Pure hover interactions</List.Item>
              <List.Item>Performance is critical</List.Item>
              <List.Item>Radix native optimizations</List.Item>
              <List.Item>Semantic correctness</List.Item>
              <List.Item>Best accessibility</List.Item>
            </List>
          </Card>

          <Card title="💡 Use Popover When">
            <List>
              <List.Item>Same as HoverCard</List.Item>
              <List.Item>Basicly used for click trigger</List.Item>
              <List.Item>Custom solution to be used as a tooltip</List.Item>
              <List.CustomItem bullet={<IconCross />} textColor="error">Probably better to use HoverCard</List.CustomItem>
            </List>
          </Card>

        </HStack>
      </VStack>


      <VStack gap="lg">

        {/* Tooltip Basics */}
        <Card
          title="Simple Tooltip"
          subtitle="Basic tooltip with text content"
          description="Use Tooltip for simple text hints and labels"
        >
          <VStack gap="md">
            <HStack gap="md" wrap>
              <Tooltip tooltip="John Doe" tooltipProps={{ side: "top" }}>
                <Badge colorTheme="light">@johndoe</Badge>
              </Tooltip>

              <Tooltip tooltip="Settings panel" tooltipProps={{ side: "bottom" }}>
                <Button size="sm">
                  <IconSettings className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip tooltip="Premium user since 2020" tooltipProps={{ side: "right" }}>
                <Badge colorTheme="success">Pro</Badge>
              </Tooltip>
            </HStack>

            <Code>
              {`<Tooltip tooltip="John Doe">
  <Badge>@johndoe</Badge>
</Tooltip>

<Tooltip tooltip="Settings panel" tooltipProps={{ side: "bottom" }}>
  <Button size="sm">
    <Settings className="h-4 w-4" />
  </Button>
</Tooltip>`}
            </Code>
          </VStack>
        </Card>

        {/* Popover as Rich Tooltip */}
        <Card
          title="Popover as Rich Tooltip"
          subtitle="Hover popover with detailed content"
          description="Use Popover for rich interactive content"
        >
          <VStack gap="md">
            <HStack gap="md" wrap>
              {/* User Profile Popover */}
              <Popover
                trigger="hover"
                openDelay={200}
                closeDelay={300}
                content={
                  <VStack gap="sm" className="w-64">
                    <HStack gap="sm" align="center">
                      <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center text-sm font-medium rounded-full">
                        JD
                      </div>
                      <VStack gap="xs" className="flex-1">
                        <Text weight="medium">John Doe</Text>
                        <Text textSize="sm" textColor="muted">@johndoe</Text>
                      </VStack>
                    </HStack>
                    <div className="h-px bg-border"></div>
                    <VStack gap="xs">
                      <Text textSize="sm">john.doe@example.com</Text>
                      <Text textSize="sm">San Francisco, CA</Text>
                      <Text textSize="sm">Joined March 2020</Text>
                    </VStack>
                  </VStack>
                }
              >
                <Badge colorTheme="light">
                  @johndoe (Popover 200ms)
                </Badge>
              </Popover>

              {/* Team Member Popover */}
              <Popover
                trigger="hover"
                content={<TeamMemberPopover />}
              >
                <Badge colorTheme="light">
                  <TextWithIcon icon={IconUser}>Sarah Kim (Popover)</TextWithIcon>
                </Badge>
              </Popover>

              {/* Nested Popover Test */}
              <Popover
                trigger="hover"
                content={<TeamMemberPopover>
                  <Popover
                    trigger="hover"
                    content={<TeamMemberPopover />}
                  >
                    <TextWithIcon icon={IconUser}>Another Popover</TextWithIcon>
                  </Popover>
                </TeamMemberPopover>}
              >
                <Badge colorTheme="warning">
                  <TextWithIcon icon={IconUser}>Nested Popover</TextWithIcon>
                </Badge>
              </Popover>
            </HStack>

            <Code>
              {`<Popover
  trigger="hover"
  content={<TeamMemberPopover />}
>
  <Badge colorTheme="light">
    <TextWithIcon icon={IconUser}>Sarah Kim (Popover)</TextWithIcon>
  </Badge>
</Popover>`}
            </Code>

          </VStack>
        </Card>

        {/* HoverCard (Native) */}
        <Card
          title="HoverCard (Radix Native)"
          subtitle="Built-in hover card component"
          description="Use the native HoverCard component for optimal hover interactions"
        >
          <VStack gap="md">
            <HStack gap="md" wrap>
              {/* User Profile HoverCard */}
              <HoverCard
                openDelay={50}
                closeDelay={200}
                content={
                  <VStack gap="sm" className="w-64">
                    <HStack gap="sm" align="center">
                      <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center text-sm font-medium rounded-full">
                        JD
                      </div>
                      <VStack gap="xs" className="flex-1">
                        <Text weight="medium">John Doe</Text>
                        <Text textSize="sm" textColor="muted">@johndoe</Text>
                      </VStack>
                    </HStack>
                    <div className="h-px bg-border"></div>
                    <VStack gap="xs">
                      <Text textSize="sm">john.doe@example.com</Text>
                      <Text textSize="sm">San Francisco, CA</Text>
                      <Text textSize="sm">Joined March 2020</Text>
                    </VStack>
                  </VStack>
                }
              >
                <Badge colorTheme="success">
                  @johndoe (HoverCard 50ms)
                </Badge>
              </HoverCard>

              {/* Team Member HoverCard */}
              <HoverCard
                openDelay={100}
                closeDelay={300}
                content={<TeamMemberPopover />}
              >
                <Badge colorTheme="success">
                  <TextWithIcon icon={IconUser}>Sarah Kim (HoverCard 100ms)</TextWithIcon>
                </Badge>
              </HoverCard>

              {/* Nested HoverCard Test */}
              <HoverCard
                content={
                  <TeamMemberPopover>
                    <HoverCard
                      content={<TeamMemberPopover />}
                    >
                      <TextWithIcon icon={IconUser}>Another HoverCard</TextWithIcon>
                    </HoverCard>
                  </TeamMemberPopover>
                }
              >
                <Badge colorTheme="info">
                  <TextWithIcon icon={IconUser}>Nested HoverCard</TextWithIcon>
                </Badge>
              </HoverCard>
            </HStack>

            <Code>{`<HoverCard
  content={<TeamMemberPopover />}
>
  <Badge colorTheme="success">
    <TextWithIcon icon={IconUser}>Sarah Kim (HoverCard 100ms)</TextWithIcon>
  </Badge>
</HoverCard>`}</Code>

          </VStack>
        </Card>



      </VStack>
    </div>
  )
}
