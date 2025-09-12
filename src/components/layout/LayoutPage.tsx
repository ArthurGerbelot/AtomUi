import { LayoutHeaderFooter, VStack } from "@uikit"

export const LayoutPage = ({ children }: { children: React.ReactNode }) => {

  return (
    <LayoutHeaderFooter
    // footerContent={"@TODO"}
    >
      <VStack className="max-w-4xl mx-auto pt-xl px-2 md:px-6 lg:px-12 pb-12" gap="xl">
        {children}
      </VStack>
    </LayoutHeaderFooter>
  )
}