import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn, convertToValidHtmlId, resolveAtomTokens } from "../../lib";
import { asSmartSlot, createSmartSlotSpecs, pickSmartSlotSpecs, pickVariantSmartSlotSpecs, SmartSlot, smartSlotMustBeRendered, SmartSlotVariantSpecs } from "../core/SmartSlot";
import { Heading, HeadingProps, IconProps, Text, TextProps, Icon, SmartIcon, SmartText, SmartHeading } from "../atoms";
import { Atom, AtomProps } from "../core";

// =============================================================================
// Header
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Header component for sections, pages, and content blocks with title, subtitle, description
// =============================================================================

// -----------------------------------------------------------------------------
// Global Helpers
// -----------------------------------------------------------------------------

export const shouldShowHeader = (props: HeaderProps) => (
  smartSlotMustBeRendered(createSmartSlotSpecs(props.title, props.titleProps, props.Title))
  || smartSlotMustBeRendered(createSmartSlotSpecs(props.subtitle, props.subtitleProps, props.Subtitle))
  || smartSlotMustBeRendered(createSmartSlotSpecs(props.description, props.descriptionProps, props.Description))
  || smartSlotMustBeRendered(createSmartSlotSpecs(props.icon, props.iconProps, props.Icon))
  || props.Action
  || props.BackLink
)

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type HeaderVariant = "main" | "section" | "sub-section";
export type HeaderAlignVariant = "left" | "center" | "right";

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

const headerVariants = cva("flex flex-col", {
  variants: {
    variant: {
      "main": "items-start text-left",
      "section": "items-start text-left",
      "sub-section": "items-start text-left",
    },
    align: {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    variant: 'section',
    align: 'left',
  },
})



const headerVariantsSmartSlotSpecs: SmartSlotVariantSpecs<HeaderVariant, HeaderProps> = {
  "main": {
    titleProps: { typo: "main-title" },
    subtitleProps: { typo: "main-subtitle" },
    align: "left"
  },
  section: {
    titleProps: { typo: "section-title" },
    subtitleProps: { typo: "section-subtitle" },
    align: "left"
  },
  "sub-section": {
    titleProps: { typo: "subsection-title" },
    subtitleProps: { typo: "subsection-subtitle" },
    align: "left"
  },
};


// =============================================================================
//   Public types – unified Part API
// =============================================================================

type TitlePart = SmartSlot<HeadingProps, "title">;
type SubtitlePart = SmartSlot<HeadingProps, "subtitle">;
type DescriptionPart = SmartSlot<TextProps, "description">;
type IconPart = SmartSlot<IconProps, "icon">;

export type HeaderProps = Omit<AtomProps, "title">
  & VariantProps<typeof headerVariants>
  & TitlePart       // {title, titleProps, Title}
  & SubtitlePart    // {subtitle, subtitleProps, Subtitle}
  & DescriptionPart // {description, descriptionProps, Description}
  & IconPart        // {icon, iconProps, Icon}
  & {
    // Insertable Node (not a SmartSlot, simple Component)
    Action?: React.ReactNode;
    BackLink?: React.ReactNode;

    className?: string;
  };

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

export function Header({
  variant = "section",
  align, // = "left"; (but specified after variant) composed variant {alignItems + textAlign}

  // SmartSlot
  title, titleProps, Title,
  subtitle, subtitleProps, Subtitle,
  description, descriptionProps, Description,
  icon, iconProps, Icon: IconSlot,

  // Insertable Node (not a MoleculePart, simple Component)
  Action,
  BackLink,

  gap = "md",   // exctract gap to update default value
  children,

  ...props
}: HeaderProps) {


  // Resolve the atom tokens
  const { className, ...rest } = resolveAtomTokens(props);


  // Variant Specs
  const variantSmartSlotSpecs = pickVariantSmartSlotSpecs<HeaderVariant, HeaderProps>(headerVariantsSmartSlotSpecs, variant);

  const titleVariantSpecs = pickSmartSlotSpecs<HeadingProps>(variantSmartSlotSpecs, 'title');
  const subtitleVariantSpecs = pickSmartSlotSpecs<HeadingProps>(variantSmartSlotSpecs, 'subtitle');
  const descriptionVariantSpecs = pickSmartSlotSpecs<TextProps>(variantSmartSlotSpecs, 'description');
  const iconVariantSpecs = pickSmartSlotSpecs<IconProps>(variantSmartSlotSpecs, 'icon');

  // Specs for SmartSlot
  const titleSpecs = createSmartSlotSpecs<HeadingProps>(title || children, titleProps, Title);
  const subtitleSpecs = createSmartSlotSpecs<HeadingProps>(subtitle, subtitleProps, Subtitle);
  const descriptionSpecs = createSmartSlotSpecs<TextProps>(description, descriptionProps, Description);
  const iconSpecs = createSmartSlotSpecs<IconProps>(icon, iconProps, IconSlot);



  const hasIcon = smartSlotMustBeRendered(iconSpecs);
  const currentAlign = align || variantSmartSlotSpecs.align || "left";



  const titleId = props.id || convertToValidHtmlId(title) || convertToValidHtmlId(children);

  // Pre-center SmartSlots (can be displayed at multiple places)

  const IconRendered = hasIcon && <SmartIcon
    specs={iconSpecs}
    variantSpecs={iconVariantSpecs}
  />
  const TitleRendered = <SmartHeading
    as={Heading}
    specs={titleSpecs}
    variantSpecs={titleVariantSpecs}
    id={titleId}
  />
  const SubtitleRendered = <SmartHeading
    as={Heading}
    specs={subtitleSpecs}
    variantSpecs={subtitleVariantSpecs}
  />
  const DescriptionRendered = <SmartText
    specs={descriptionSpecs}
    variantSpecs={descriptionVariantSpecs}
  />


  return (
    <Atom
      className={cn(headerVariants({
        variant,
        align: currentAlign,
      }), className)}
      data-slot="header"
      gap={gap}
      {...rest}
    >
      {/* Content Section */}
      <div className={cn(
        "relative w-full",
        currentAlign === "center" ? "flex flex-col items-center" : "flex items-start justify-between gap-4"
      )}>

        {/* -------------- [Left/Right alignment] -------------- */}

        {/* Regular layout for left/right alignment */}
        {currentAlign !== "center" && (
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              {BackLink && (
                <div className="flex-shrink-0 self-start -ml-2">
                  {BackLink}
                </div>
              )}

              {/* Icon for left alignment - before title */}
              {hasIcon && currentAlign === "left" && (
                <div className={cn("flex items-center justify-center flex-shrink-0 mr-4 mt-2 ")}>
                  {IconRendered}
                </div>
              )}

              <div className={cn("flex flex-col min-w-0 flex-1"
                , hasIcon && currentAlign === "left" && "-ml-4"
                , hasIcon && currentAlign === "right" && "-mr-4"
              )}>
                {TitleRendered}
                {SubtitleRendered}
                {DescriptionRendered}
              </div>

              {/* Icon for right alignment - after title */}
              {hasIcon && currentAlign === "right" && (
                <div className={cn("flex items-center justify-center flex-shrink-0 mt-2 ml-4",)}>
                  {IconRendered}
                </div>
              )}
            </div>

            {Action && (
              <div className="flex-shrink-0 self-start">
                {Action}
              </div>
            )}
          </div>
        )}

        {/* -------------- [Centered content] -------------- */}

        {/* Back Link and Action for center alignment - positioned absolutely */}
        {currentAlign === "center" && (BackLink || Action) && (
          <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-4 z-10 -mx-4 -mt-2">
            {BackLink && (
              <div className="flex-shrink-0 self-start">
                {BackLink}
              </div>
            )}
            <div className="flex-1" /> {/* Spacer to push action to the right */}
            {Action && (
              <div className="flex-shrink-0 self-start">
                {Action}
              </div>
            )}
          </div>
        )}

        {currentAlign === "center" && (
          <div className="flex flex-col items-center min-w-0 flex-1">
            {/* Icon for center alignment - above title */}
            {hasIcon && (
              <div className={cn("flex items-center justify-center mb-2",)}>
                {IconRendered}
              </div>
            )}

            {TitleRendered}
            {SubtitleRendered}
            {DescriptionRendered}

          </div>
        )}
      </div>

    </Atom>
  );
}



// Do NOT Provide a SmartHeader.. Header is already a Molecule and we do not want to create a SmartMolecule.
// See keep/README-SmartSlot.md for more info
export const SmartHeader = asSmartSlot(Header);