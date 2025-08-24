"use client"

import * as React from "react"

import { Badge, ButtonProps, Card, Code, CodeProps, Header, HeaderProps, IconButton, IconChevronLeft, IconChevronRight, Input, pickSmartSlotSpecs, pickVariantSmartSlotSpecs, Separator, SmartButton, SmartCode, SmartSlot, SmartSlotVariantSpecs, Text, VStack } from "@uikit"

import { CardExample } from "../../components/CardExample"

export default function AdvancedSmartSlotPage() {


  const OverridePriorityAfterSmartSlot = () => (<><Badge>Original Atom</Badge> <br /><IconChevronLeft /> <Badge>SmartSlot.tokens</Badge> <IconChevronLeft /> <Badge>SmartSlot.className</Badge></>)
  const OverridePriorityAfterBaseSpecs = () => (<><OverridePriorityAfterSmartSlot /> <br /><IconChevronLeft /> <Badge>baseSpecs.tokens</Badge> <IconChevronLeft /> <Badge>baseSpecs.className</Badge></>)
  const OverridePriorityAfterVariantSpecs = () => (<><OverridePriorityAfterBaseSpecs /> <br /><IconChevronLeft /> <Badge>variantSpecs.tokens</Badge> <IconChevronLeft /> <Badge>variantSpecs.className</Badge></>)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <Header
        title="Advanced SmartSlot"
        description={<>
          <Text>This page demonstrates how to build an advanced Molecule using a SmartSlot, and the order in which properties override each other across all spec override mechanisms. It is organized by override priority</Text>
          <Text typo="hint" className="mt-2">Final override priority</Text>
          <OverridePriorityAfterVariantSpecs />
          <br /> <IconChevronLeft /> <Badge>Component.props</Badge> <IconChevronLeft /> <Badge>Component.className</Badge>
          <br /> <IconChevronLeft /> <Badge>componentProps.props</Badge> <IconChevronLeft /> <Badge>componentProps.className</Badge>
        </>}
      />



      <CardExample
        title="1/ A SmartSlot behaves like the base component by default"
        description="Let's use SmartCode (created with `const SmartCode = asSmartSlot(Code)`) and SmartButton to start a Molecule example component."
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <Badge>Original Atom</Badge>
        </>}
      >
        <MoleculeExampleStep1 />
      </CardExample>

      <Header
        variant="section"
        title="SmartSlot"
        subtitle="Props applied directly to the SmartSlot on the Molecule"
      >
      </Header>

      <CardExample
        title="2/ Atom tokens on the Molecule's SmartSlot"
        description="We can use props on the SmartSlot the same way as on the base component. Here we use the `textColor` prop to update the text color."
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <Badge>Original Atom</Badge> <IconChevronLeft /> <Badge>SmartSlot.tokens</Badge>
        </>}
      >
        <MoleculeExampleStep2 />
      </CardExample>


      <CardExample
        title="3/ className on the Molecule's SmartSlot"
        description="As always, className overrides Atom tokens. First, we use the `className` prop to override a token. On Button, we also use the `surface` prop to override the variant token, then finally override with className."
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterSmartSlot />
        </>}
      >
        <MoleculeExampleStep3 />
      </CardExample>

      <Header
        variant="section"
        title="baseSpecs"
        subtitle="Set up SmartSlot props using the Specs object"
        description={
          <>
            <Code includeTag textSize={'xs'}>SmartSlot</Code> also provides <Code>baseSpecs</Code> to let you do the same thing (set up default props of the SmartSlot on the Molecule), but using the Specs object (in this case {"`{code, codeProps, Code}`"} for SmartCode).
            <br />
            <Code>baseSpecs</Code> should <strong>rarely be used</strong>. Prefer atomic tokens and className directly on the SmartSlot (Examples 2 and 3). Use this only for specific reasons (specs format, etc.).
          </>
        }
      />

      <CardExample
        title="4/ baseSpecs - Atomic token"
        description={<>`baseSpecs` acts at a higher level, so <Code>baseSpecs.tokens</Code> will override <Code>SmartSlot.className</Code>.</>}
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterSmartSlot /> <br /> <IconChevronLeft /> <Badge>baseSpecs.tokens</Badge>
        </>}
      >
        <MoleculeExampleStep4 />
      </CardExample>


      <Card
        title="Hint! Tools to handle Specs"
        titleProps={{
          className: "text-yellow-700 dark:text-yellow-200"
        }}
        description={<>To handle the Specs object more easily, we provide a few utilities.</>}
        className="mx-24 border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200"
      >
        <VStack>
          <Text>To create the types of <Code>{'{code, codeProps, Code}'}</Code> and <Code>{'{button, buttonProps, Button}'}</Code> with the valid types for each field use:</Text>
          <Code display="block">
            {`type CodeSpecsProps = SmartSlot<CodeProps, "code">;
 type ButtonSpecsProps = SmartSlot<ButtonProps, "button">;`}
          </Code>
          <Separator className="bg-yellow-500" />
          <Text>And use it to create the Molecule props type:</Text>
          <Code display="block">
            {`type MoleculeProps = { /* own props */ }
   & CodeSpecsProps
   & ButtonSpecsProps;`}
          </Code>

          <Separator className="bg-yellow-500" />

          <Text>And use <Code>pickSmartSlotSpecs</Code> to extract the triad props from another object (e.g., Molecule props):</Text>
          <Code display="block">
            {`const Molecule = (props:MoleculeProps) {
   const specs = pickSmartSlotSpecs<CodeProps>(props, "code");
   const specs = pickSmartSlotSpecs<ButtonProps>(props, "button");
 }`}
          </Code>

          <Text>Or use <Code>createSmartSlotSpecs</Code> if props are already decomposed.</Text>
        </VStack>
      </Card>

      <CardExample
        title="4-alt/ Same but using pickSmartSlotSpecs"
        code={null}
      >
        <MoleculeExampleStep4alt />
      </CardExample>


      <CardExample
        title="5/ baseSpecs - className"
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterBaseSpecs />
        </>}
      >
        <MoleculeExampleStep5 />
      </CardExample>


      <Header
        variant="section"
        title="variantSpecs"
        subtitle="Spec override level for Molecule variants"
        description={
          <>
            <Code includeTag textSize={'xs'}>SmartSlot</Code> also provides <Code>variantSpecs</Code> props and utilities to set up specs for each variant of the Molecule. Use this only for specific reasons (specs format, etc.).
            <br />
            The <Code>variantSpecs</Code> override level is higher than <Code>baseSpecs</Code>.
          </>
        }
      ></Header>


      <Card
        title="Hint! Tools to handle Specs"
        titleProps={{
          className: "text-yellow-700 dark:text-yellow-200"
        }}
        description={<>To set up variant specs more easily, we provide a few utilities.</>}
        className="mx-24 border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200"
      >
        <VStack>
          <Text>To create the Object of props per variants use:</Text>
          <Code display="block">
            {`type CodeSpecsProps = SmartSlot<CodeProps, "code">;
 type ButtonSpecsProps = SmartSlot<ButtonProps, "button">;`}
          </Code>
          <Separator className="bg-yellow-500" />
          <Text>And use it to create the Molecule props type:</Text>
          <Code display="block">
            {`type MoleculeProps = { /* own props */ }
   & CodeSpecsProps
   & ButtonSpecsProps;`}
          </Code>

          <Separator className="bg-yellow-500" />

          <Text>And use <Code>pickSmartSlotSpecs</Code> to extract the triad props from another object (e.g., Molecule props):</Text>
          <Code display="block">
            {`const Molecule = (props:MoleculeProps) {
   const specs = pickSmartSlotSpecs<CodeProps>(props, "code");
   const specs = pickSmartSlotSpecs<ButtonProps>(props, "button");
 }`}
          </Code>

          <Text>Or use <Code>createSmartSlotSpecs</Code> if props are already decomposed.</Text>
        </VStack>
      </Card>


      <CardExample
        title="6/ variantSpecs - tokens"
        description={<>Use <Code>variantSpecs</Code> to set up the specs for each variant of the Molecule.</>}
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterBaseSpecs /> <br /><IconChevronLeft /> <Badge>variantSpecs.tokens</Badge>
        </>}
      >
        <MoleculeExampleStep6 variant="hot" />
        <MoleculeExampleStep6 variant="cold" />
      </CardExample>

      <CardExample
        title="7/ variantSpecs - className"
        description={<>As with other override levels, <Code>variantSpecs.tokens</Code> will override <Code>variantSpecs.className</Code>.</>}
        code={null}
        note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterVariantSpecs />
        </>}
      >
        <MoleculeExampleStep7 variant="hot" />
        <MoleculeExampleStep7 variant="cold" />
      </CardExample>



      <Header
        variant="section"
        title="Consumer specs"
        subtitle="Last override level; allows overriding everything via Molecule props"
        description={
          <>
            Using the utilities (<Code>SmartSlot</Code>, <Code>pickSmartSlotSpecs</Code>), extract specs from Molecule props and apply them to SmartSlot components.
          </>
        }
      ></Header>

      <CardExample
        title="8/ Final component updatable by the consumer"
        code={null}
      >
        <MoleculeExample variant="cold" codeProps={{ textColor: "black" }} buttonProps={{ textColor: "black" }} />

        <MoleculeExample
          variant="cold"

          // We need to cast it to `any` ... See TypeScript Limitations at the end of Slot & SmartSlot for more
          codeProps={{ textColor: "red", placeholder: "Nani" } as CodeProps}
          Code={Input}

          buttonProps={{ textColor: "black" }}
          Button={<IconButton icon={IconChevronRight} />}
        />

      </CardExample>


      <CardExample
        title="9/ Replacement Component can also accept props"
        description="Props set on the new replacement Component override all the Molecule props, but props are the strongest."
        code={null} note={<>
          <Text typo="hint" className="mt-2">Override priority</Text>
          <OverridePriorityAfterVariantSpecs />
          <br /> <IconChevronLeft /> <Badge>Component.props</Badge> <IconChevronLeft /> <Badge>Component.className</Badge>
          <br /> <IconChevronLeft /> <Badge>componentProps.props</Badge> <IconChevronLeft /> <Badge>componentProps.className</Badge>
        </>}
      >

        <MoleculeExample
          code={null}
          Button={<IconButton Icon={<IconChevronRight textColor="warning" />} />}
        />

        <MoleculeExample
          code={null}
          buttonProps={{ iconProps: { textColor: "success" } }}
          Button={<IconButton Icon={<IconChevronRight textColor="warning" />} />}
        />

        <MoleculeExample
          code={null}
          button="New Button as Header"
          buttonProps={{ titleProps: { textColor: "success" } } as ButtonProps}
          Button={(props) => <Header {...props as HeaderProps} variant="main" />}
        />

      </CardExample>



    </div>
  )
}

// Example 1 - Nothing
// -----------------------------------------------------------------------------

const MoleculeExampleStep1 = () => {
  return (
    <div>
      <SmartCode>Code</SmartCode>
      <SmartButton
        onClick={() => console.log("Step 1")}
      >
        Button
      </SmartButton>
    </div>
  )
}

// Example 2 - SmartSlot.tokens
// -----------------------------------------------------------------------------

const MoleculeExampleStep2 = () => {
  return (
    <div>
      <SmartCode textColor="info">Code</SmartCode>
      <SmartButton
        variant="outline"
        textColor="info"
        onClick={() => console.log("Step 1")}
      >
        Button
      </SmartButton>
    </div>
  )
}

// Example 3 - SmartSlot.className
// -----------------------------------------------------------------------------

const smartCodeProps = {
  textColor: "info",
  className: "text-blue-500"
}
const smartButtonProps = {
  variant: "outline",
  surface: "subtle",
  className: "text-blue-500",
  onClick: () => console.log("Step 1")
}

const MoleculeExampleStep3 = () => {
  return (
    <div>
      <SmartCode {...smartCodeProps}>Code</SmartCode>
      <SmartButton {...smartButtonProps}>Button</SmartButton>
    </div>
  )
}


// Example 4 - baseSpecs.tokens
// -----------------------------------------------------------------------------



const MoleculeExampleStep4 = () => {
  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={{ props: { textColor: "lightning" } }}
      >
        Code
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={{
          props: {
            textColor: "lightning",
            onClick: () => console.log("Step 4")
          }
        }}
      >
        Button
      </SmartButton>
    </div>

  )
}


type MoleculeExampleCodeProps = SmartSlot<CodeProps, "code">;
type MoleculeExampleButtonProps = SmartSlot<ButtonProps, "button">;
type MoleculeExampleProps = { variant?: "hot" | "cold" } & MoleculeExampleCodeProps & MoleculeExampleButtonProps;

const MoleculeExampleStep4baseSpecs: MoleculeExampleProps = {
  codeProps: { textColor: "lightning" },
  buttonProps: {
    textColor: "lightning",
    onClick: () => console.log("Step 4")
  }
}

const MoleculeExampleStep4alt = () => {
  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={pickSmartSlotSpecs<CodeProps>(MoleculeExampleStep4baseSpecs, "code")}
      >
        Code
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={pickSmartSlotSpecs<ButtonProps>(MoleculeExampleStep4baseSpecs, "button")}
      >
        Button
      </SmartButton>
    </div>

  )
}

// Example 5 - baseSpecs.className
// -----------------------------------------------------------------------------



const MoleculeExampleStep5baseSpecs: MoleculeExampleProps = {
  codeProps: {
    textColor: "lightning",
    className: "text-fuchsia-500"
  },
  buttonProps: {
    textColor: "lightning",
    className: "text-fuchsia-500",
    onClick: () => console.log("Step 4")
  }
}
const codeBaseSpecs = pickSmartSlotSpecs<CodeProps>(MoleculeExampleStep5baseSpecs, "code")
const buttonBaseSpecs = pickSmartSlotSpecs<ButtonProps>(MoleculeExampleStep5baseSpecs, "button")

const MoleculeExampleStep5 = () => {

  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={codeBaseSpecs}
      >
        Default
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={buttonBaseSpecs}
      >
        Button
      </SmartButton>
    </div>
  )
}

// Example 6 - variantSpecs.tokens
// -----------------------------------------------------------------------------

type MoleculeExampleVariant = "hot" | "cold"
const moleculeVariantsSmartSlotSpecs: SmartSlotVariantSpecs<MoleculeExampleVariant, MoleculeExampleProps> = {
  "hot": {
    codeProps: { bgColor: "bitcoin", textColor: "brand" },
    buttonProps: { bgColor: "bitcoin", textColor: "brand" },
  },
  "cold": {
    codeProps: { bgColor: "bitcoin", textColor: "liquid" },
    buttonProps: { bgColor: "bitcoin", textColor: "liquid" },
  },
}

const MoleculeExampleStep6 = ({ variant }: MoleculeExampleProps) => {

  const variantSpecs = pickVariantSmartSlotSpecs<MoleculeExampleVariant, MoleculeExampleProps>(moleculeVariantsSmartSlotSpecs, variant);

  const codeVariantSpecs = pickSmartSlotSpecs<CodeProps>(variantSpecs, "code")
  const buttonVariantSpecs = pickSmartSlotSpecs<ButtonProps>(variantSpecs, "button")

  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={codeBaseSpecs}
        variantSpecs={codeVariantSpecs}
      >
        Default
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={buttonBaseSpecs}
        variantSpecs={buttonVariantSpecs}
      >
        Button
      </SmartButton>
    </div>
  )
}



// Example 7 - variantSpecs.className
// -----------------------------------------------------------------------------

const molecule7VariantsSmartSlotSpecs: SmartSlotVariantSpecs<MoleculeExampleVariant, MoleculeExampleProps> = {
  "hot": {
    codeProps: { bgColor: "bitcoin", textColor: "brand", className: "bg-brand text-white" },
    buttonProps: { bgColor: "bitcoin", textColor: "brand", className: "bg-brand text-white" },
  },
  "cold": {
    codeProps: { bgColor: "bitcoin", textColor: "liquid", className: "bg-liquid text-white" },
    buttonProps: { bgColor: "bitcoin", textColor: "liquid", className: "bg-liquid text-white" },
  },
}

const MoleculeExampleStep7 = ({ variant }: MoleculeExampleProps) => {

  const variantSpecs = pickVariantSmartSlotSpecs<MoleculeExampleVariant, MoleculeExampleProps>(molecule7VariantsSmartSlotSpecs, variant);

  const codeVariantSpecs = pickSmartSlotSpecs<CodeProps>(variantSpecs, "code")
  const buttonVariantSpecs = pickSmartSlotSpecs<ButtonProps>(variantSpecs, "button")

  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={codeBaseSpecs}
        variantSpecs={codeVariantSpecs}
      >
        Default
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={buttonBaseSpecs}
        variantSpecs={buttonVariantSpecs}
      >
        Button
      </SmartButton>
    </div>
  )
}

// Example 8 - Final Component
// -----------------------------------------------------------------------------

const MoleculeExample = ({ variant, ...props }: MoleculeExampleProps) => {

  const variantSpecs = pickVariantSmartSlotSpecs<MoleculeExampleVariant, MoleculeExampleProps>(molecule7VariantsSmartSlotSpecs, variant);

  const codeVariantSpecs = pickSmartSlotSpecs<CodeProps>(variantSpecs, "code")
  const buttonVariantSpecs = pickSmartSlotSpecs<ButtonProps>(variantSpecs, "button")

  const codeSpecs = pickSmartSlotSpecs<CodeProps>(props, "code")
  const buttonSpecs = pickSmartSlotSpecs<ButtonProps>(props, "button")

  return (
    <div>
      <SmartCode
        {...smartCodeProps}
        baseSpecs={codeBaseSpecs}
        variantSpecs={codeVariantSpecs}
        specs={codeSpecs}
      >
        Default
      </SmartCode>
      <SmartButton
        {...smartButtonProps}
        baseSpecs={buttonBaseSpecs}
        variantSpecs={buttonVariantSpecs}
        specs={buttonSpecs}
      >
        Button
      </SmartButton>
    </div>
  )
}