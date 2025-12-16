import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "DJ-PiGuy - AI Music Player",
  description: "Discover and play AI-generated music by DJ-PiGuy",
  openGraph: {
    title: "DJ-PiGuy",
    description: "Discover and play AI-generated music",
    siteName: "DJ-PiGuy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ-PiGuy",
    description: "Discover and play AI-generated music",
  },
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
