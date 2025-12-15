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
  title: "SprayFoamRadio.com - AI Music Player",
  description: "Discover and play AI-generated music at SprayFoamRadio.com",
  metadataBase: new URL("https://sprayfoamradio.com"),
  openGraph: {
    title: "SprayFoamRadio.com",
    description: "Discover and play AI-generated music",
    siteName: "SprayFoamRadio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SprayFoamRadio.com",
    description: "Discover and play AI-generated music",
  },
    generator: 'v0.app'
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
