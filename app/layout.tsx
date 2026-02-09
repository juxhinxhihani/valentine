import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"

import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A special Valentine's Day question just for you",
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
