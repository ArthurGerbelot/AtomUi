'use client'

import * as React from "react"
import { Card, ChoiceBadge, ChoiceObject, HStack, VStack, Icon, IconCheckboxChecked, IconError, IconInfo, sizes, Text, Header, iconVariants, Code, IconBitcoin, IconSuccess } from "@uikit"



const colorChoices: ChoiceObject[] = [
  { value: "error", label: "Error", Icon: IconError, colorTheme: "error" },
  { value: "success", label: "Success", Icon: IconCheckboxChecked, colorTheme: "success" },
  { value: "info", label: "Info", Icon: IconInfo, colorTheme: "info" },
]

export default function TestPage() {

  return (
    <VStack stretch className="container mx-auto max-w-4xl">
      <Header>🧪 Icon Component - Tests exhaustifs</Header>

      {/* Basic Usage Tests */}
      <Card title="1. Basic Usage Patterns">
        <VStack>
          <Text ellipsis>Direct use (Icon Library components)</Text>
          <HStack wrap>
            <VStack align="center">
              <Code>{`<IconError />`}</Code>
              <IconError />
              <Text size="xs" color="muted">IconError, default size (24px), default colors</Text>
            </VStack>
            <VStack align="center">
              <Code>{`<IconInfo size="lg" />`}</Code>
              <IconInfo size="lg" />
              <Text size="xs" color="muted">IconInfo, size=lg (28px), default colors</Text>
            </VStack>
            <VStack align="center">
              <Code>{`<IconCheckboxChecked bgColor="success" textColor="white" />`}</Code>
              <IconCheckboxChecked bgColor="success" textColor="white" />
              <Text size="xs" color="muted">IconCheckboxChecked, default size, bg=success, text=white</Text>
            </VStack>
          </HStack>
        </VStack>
      </Card>

      {/* Variant Tests */}
      <Card title="2. Variant Tests (Size Presets)">
        <VStack>
          <Text ellipsis>All variants with same icon</Text>
          <HStack wrap align="center">
            {iconVariants.map(variant => {
              const sizeMap = {
                default: "24px",
                mini: "32px",
                chip: "56px",
                medium: "80px",
                hero: "112px",
                jumbo: "144px"
              };
              return (
                <VStack key={variant} align="center">
                  <Code>{`variant="${variant}"`}</Code>
                  <IconError variant={variant} bgColor="error" textColor="white" />
                  <Text size="xs" color="muted">{variant} ({sizeMap[variant as keyof typeof sizeMap]})</Text>
                </VStack>
              );
            })}
          </HStack>

          <HStack wrap align="center">
            {sizes.map(size => {
              return (
                <VStack key={size} align="center">
                  <Code>{`size="${size}"`}</Code>
                  <IconError size={size} bgColor="error" textColor="white" />
                  <Text size="xs" color="muted">{size}</Text>
                </VStack>
              );
            })}
          </HStack>

        </VStack>
      </Card>

      {/* Wrapper Patterns */}
      <Card title="3. Smart Passthrough Tests">
        <VStack>
          <Text ellipsis>Testing wrapper detection and prop merging</Text>

          <VStack>
            <Text ellipsis weight="semibold">Case A: Wrapper with icon prop</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon icon={IconError} variant="hero" bgColor="bitcoin" textColor="white" />`}</Code>
                <Icon icon={IconError} variant="hero" bgColor="bitcoin" textColor="white" />
                <Text size="xs" color="muted">Should be: IconError, variant=hero (112px), bg=bitcoin, text=white</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Case B: Wrapper with function children</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="hero" bgColor="bitcoin" textColor="white">{IconError}</Icon>`}</Code>
                <Icon variant="hero" bgColor="bitcoin" textColor="white">{IconError}</Icon>
                <Text size="xs" color="muted">Should be: IconError, variant=hero (112px), bg=bitcoin, text=white</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Case C: Wrapper with JSX children (SMART PASSTHROUGH)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="hero" bgColor="bitcoin" textColor="white"><IconError /></Icon>`}</Code>
                <Icon variant="hero" bgColor="bitcoin" textColor="white"><IconError /></Icon>
                <Text size="xs" color="muted">Should be: IconError, variant=hero (112px), bg=bitcoin, text=white (passthrough)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Case D: Wrapper with spaces (SMART PASSTHROUGH)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="hero" bgColor="bitcoin" textColor="white"> <IconError /> </Icon>`}</Code>
                <Icon variant="hero" bgColor="bitcoin" textColor="white"> <IconError /> </Icon>
                <Text size="xs" color="muted">Should be: IconError, variant=hero (112px), bg=bitcoin, text=white (passthrough)</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Card>

      {/* Props Priority Tests */}
      <Card title="4. Props Priority Tests">
        <VStack>
          <Text ellipsis>Child props should have higher priority than wrapper props</Text>

          <VStack>
            <Text ellipsis weight="semibold">Conflicting variants (child wins)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="jumbo" bgColor="error"><IconError variant="chip" bgColor="success" /></Icon>`}</Code>
                <Icon variant="jumbo" bgColor="error"><IconError variant="chip" bgColor="success" /></Icon>
                <Text size="xs" color="muted">Should be: IconError, variant=chip (56px), bg=success, text=default (child wins)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Conflicting colors (child wins)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon bgColor="bitcoin" textColor="white"><IconInfo bgColor="info" textColor="purple" /></Icon>`}</Code>
                <Icon bgColor="bitcoin" textColor="white"><IconInfo bgColor="info" textColor="purple" /></Icon>
                <Text size="xs" color="muted">Should be: IconInfo, variant=default (24px), bg=info, text=purple (child wins)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Icon wrapper component (passthrough)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon bgColor="bitcoin" textColor="white"><Icon icon={IconInfo} bgColor="info" textColor="purple" /></Icon>`}</Code>
                <Icon bgColor="bitcoin" textColor="white"><Icon icon={IconInfo} bgColor="info" textColor="purple" /></Icon>
                <Text size="xs" color="muted">Should be: IconInfo, variant=default (24px), bg=info, text=purple (child wins)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Conflicting Icon type (child wins)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<IconBitcoin bgColor="bitcoin" textColor="white"><IconError icon={IconInfo}><IconSuccess /></IconError></IconBitcoin>`}</Code>
                <IconBitcoin bgColor="bitcoin" textColor="white"><IconError icon={IconInfo}><IconSuccess /></IconError></IconBitcoin>
                <Text size="sm">Should be success</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Conflicting Icon type (child wins)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<IconBitcoin bgColor="bitcoin" textColor="white"><IconError icon={IconInfo}><IconInfo icon={IconSuccess} /></IconError></IconBitcoin>`}</Code>
                <IconBitcoin bgColor="bitcoin" textColor="white"><IconError icon={IconInfo}><IconInfo icon={IconSuccess} /></IconError></IconBitcoin>
                <Text size="xs" color="muted">Should be: IconSuccess, variant=default (24px), bg=bitcoin, text=white (deepest child wins)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Partial override (merge)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="mini" bgColor="bitcoin" textColor="white"><IconCheckboxChecked bgColor="success" /></Icon>`}</Code>
                <Icon variant="mini" bgColor="bitcoin" textColor="white"><IconCheckboxChecked bgColor="success" /></Icon>
                <Text size="xs" color="muted">Should be: IconCheckboxChecked, variant=mini (32px), bg=success, text=white (merged)</Text>
              </VStack>
            </HStack>
          </VStack>


          <VStack>
            <Text ellipsis weight="semibold">Child size overrides parent variant</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="mini" ><IconCheckboxChecked size={72}/></Icon>`}</Code>
                <Icon variant="mini" ><IconCheckboxChecked size={72} /></Icon>
                <Text size="xs" color="muted">Should be: IconCheckboxChecked, size=72 (child size wins over parent variant)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Child variant overrides parent size</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon size={72} ><IconCheckboxChecked variant="mini"/></Icon>`}</Code>
                <Icon size={72} ><IconCheckboxChecked variant="mini" /></Icon>
                <Text size="xs" color="muted">Should be: IconCheckboxChecked, variant=mini (32px) (child variant wins over parent size)</Text>
              </VStack>
            </HStack>
          </VStack>


          <VStack>
            <Text ellipsis weight="semibold">ClassName overrides</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon size={72} className="border border-2 border-blue-500"><IconCheckboxChecked className="border-green-500"/></Icon>`}</Code>
                <Icon size={72} className="border border-2 border-blue-500"><IconCheckboxChecked className="border-green-500" /></Icon>
                <Text size="xs" color="muted">Should be: IconCheckboxChecked, size=72, merged classes (border-blue-500 + border-green-500)</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Card>

      {/* Size vs Variant Tests */}
      <Card title="5. Size vs Variant Tests">
        <VStack>
          <Text ellipsis>Variant size should override size prop</Text>

          <HStack wrap align="center">
            <VStack align="center">
              <Code>{`<IconError size="xl" />`}</Code>
              <IconError size="xl" />
              <Text size="xs" color="muted">Should be: IconError, variant=default, size=xl (32px), bg=default, text=default</Text>
            </VStack>
            <VStack align="center">
              <Code>{`<IconError variant="mini" size="xl" />`}</Code>
              <IconError variant="mini" size="xl" />
              <Text size="xs" color="muted">Should be: IconError, variant=mini (32px), bg=primary, text=default (variant wins)</Text>
            </VStack>
            <VStack align="center">
              <Code>{`<IconError variant="hero" size="xs" />`}</Code>
              <IconError variant="hero" size="xs" />
              <Text size="xs" color="muted">Should be: IconError, variant=hero (112px), bg=primary, text=default (variant wins)</Text>
            </VStack>
          </HStack>
        </VStack>
      </Card>

      {/* Multiple Nesting Tests */}
      <Card title="6. Multiple Nesting Tests">
        <VStack>
          <Text ellipsis>Deep nesting should work correctly</Text>

          <VStack>
            <Text ellipsis weight="semibold">Double wrapper (should flatten)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="hero" bgColor="bitcoin"><Icon variant="chip" bgColor="error"><IconError /></Icon></Icon>`}</Code>
                <Icon variant="hero" bgColor="bitcoin"><Icon variant="chip" bgColor="error"><IconError /></Icon></Icon>
                <Text size="xs" color="muted">Should be: IconError, variant=chip (56px), bg=error, text=default (innermost wins)</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Triple wrapper (should flatten)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="jumbo" bgColor="yellow" textColor="purple">
  <Icon variant="hero" bgColor="blue" textColor="white">
    <Icon bgColor="purple" variant="mini">
      <IconInfo />
    </Icon>
  </Icon>
</Icon>`}</Code>
                <Icon variant="jumbo" bgColor="yellow" textColor="purple"><Icon variant="hero" bgColor="blue" textColor="white"><Icon bgColor="purple" variant="mini"><IconInfo /></Icon></Icon></Icon>
                <Text size="xs" color="muted">Should be: IconInfo, variant=mini (32px), bg=purple, text=white (innermost wins)</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Card>

      {/* Mixed Content Tests */}
      <Card title="7. Mixed Content Tests">
        <VStack>
          <Text ellipsis>Icons with different content types</Text>

          <HStack wrap align="center">
            <VStack align="center">
              <Code>{`<Icon variant="medium" bgColor="purple">Non-Icon Content</Icon>`}</Code>
              <Icon variant="medium" bgColor="purple">Non-Icon Content</Icon>
            </VStack>
            <VStack align="center">
              <Code>{`<Icon variant="medium" bgColor="purple"><div>HTML</div></Icon>`}</Code>
              <Icon variant="medium" bgColor="purple"><div>HTML Element</div></Icon>
            </VStack>
          </HStack>
        </VStack>
      </Card>

      {/* Choice */}
      <Card title="8. Choice">
        <VStack>
          <Text ellipsis>Choice</Text>

          <VStack >
            {colorChoices.map(choice => (
              <HStack key={choice.value as string} align="center">
                <ChoiceBadge choice={choice} />
                <ChoiceBadge surface="solid" choice={choice} />
                <ChoiceBadge surface="outline" choice={choice} />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Card>


      {/* Edge Cases */}
      <Card title="9. Edge Cases">
        <VStack>
          <Text ellipsis>Unusual scenarios</Text>

          <VStack>
            <Text ellipsis weight="semibold">Empty props</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon><IconError /></Icon>`}</Code>
                <Icon><IconError /></Icon>
                <Text size="sm">No wrapper props</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Undefined values</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant={undefined} size={undefined}><IconInfo /></Icon>`}</Code>
                <Icon variant={undefined} size={undefined}><IconInfo /></Icon>
                <Text size="sm">Undefined props</Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Text ellipsis weight="semibold">Multiple children (only first icon detected)</Text>
            <HStack wrap align="center">
              <VStack align="center">
                <Code>{`<Icon variant="hero">Text <IconError /> More text</Icon>`}</Code>
                <Icon variant="hero">Text <IconError /> More text</Icon>
                <Text size="sm">Mixed children</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Card>

    </VStack>
  )
}
