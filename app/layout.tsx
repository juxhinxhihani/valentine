import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"

import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "A Special Question... 💌",
  description: "I have something important to ask you...",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>',
  },
  openGraph: {
    title: "A Special Question... 💌",
    description: "I have something important to ask you...",
    siteName: "Valentine's Day",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Special Question... 💌",
    description: "I have something important to ask you...",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f0509",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
