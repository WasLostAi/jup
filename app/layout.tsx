import type React from "react"
import "./globals.css"
import { Inter, Syne, JetBrains_Mono, Dosis } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DataSourceProvider } from "@/contexts/data-source-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })
const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis" })

export const metadata = {
  title: "Jupiter Trading Dashboard",
  description: "Advanced trading dashboard for Jupiter Exchange",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.cdnfonts.com/css/led-digital-7" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} ${dosis.variable} dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <DataSourceProvider>{children}</DataSourceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
