import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { jetbrainsMono, golosText, bebasNeue } from "@uikit/nextjs";

export const metadata: Metadata = {
  title: "API Docs",
  description: "Bull Bitcoin Api Documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${golosText.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
