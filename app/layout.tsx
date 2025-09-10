import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ZaikaRoots - Discover Amazing Recipes",
  description:
    "Explore delicious recipes from around the world with ZaikaRoots. Find your next favorite dish with our comprehensive recipe collection.",
  generator: "v0.app",
  keywords: ["recipes", "cooking", "food", "cuisine", "indian food", "global recipes"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased preload`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem suppressHydrationWarning>
          <Suspense fallback={null}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Suspense>
        </ThemeProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                  document.body.classList.remove('preload');
                }, 100);
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
