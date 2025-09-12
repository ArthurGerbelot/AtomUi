import { LayoutHeaderFooter, VStack } from "@uikit"

export const LayoutPage = ({ children }: { children: React.ReactNode }) => {

  return (
    <LayoutHeaderFooter
    // footerContent={"@TODO"}
    >
      <VStack className="max-w-4xl mx-auto pt-sm px-12 pb-12" gap="xl">
        {children}
      </VStack>
    </LayoutHeaderFooter>
  )
}