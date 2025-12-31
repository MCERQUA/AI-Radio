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
  metadataBase: new URL("https://dj-piguy.netlify.app"),
  title: {
    default: "DJ-PiGuy | Free AI-Generated Music & Hip-Hop Radio",
    template: "%s | DJ-PiGuy",
  },
  description: "Stream free AI-generated music on DJ-PiGuy. Featuring original hip-hop, electronic beats, spray foam industry anthems, and more. Listen to unique tracks created by AI, available 24/7.",
  keywords: ["AI music", "AI-generated music", "free music streaming", "hip-hop radio", "electronic music", "DJ PiGuy", "spray foam radio", "AI beats", "original music"],
  authors: [{ name: "DJ-PiGuy" }],
  creator: "DJ-PiGuy",
  publisher: "DJ-PiGuy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "DJ-PiGuy | Free AI-Generated Music Radio",
    description: "Stream free AI-generated music. Hip-hop, electronic, and unique tracks created by AI. Listen 24/7.",
    siteName: "DJ-PiGuy",
    type: "website",
    locale: "en_US",
    url: "https://dj-piguy.netlify.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DJ-PiGuy - AI Music Radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ-PiGuy | Free AI-Generated Music Radio",
    description: "Stream free AI-generated music. Hip-hop, electronic, and unique tracks. Listen 24/7.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://dj-piguy.netlify.app",
  },
  category: "music",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DJ-PiGuy",
  alternateName: "DJ PiGuy AI Radio",
  url: "https://dj-piguy.netlify.app",
  description: "Free AI-generated music streaming platform featuring hip-hop, electronic, and original tracks.",
  publisher: {
    "@type": "Organization",
    name: "DJ-PiGuy",
    logo: {
      "@type": "ImageObject",
      url: "https://dj-piguy.netlify.app/android-chrome-512x512.png",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://dj-piguy.netlify.app/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const musicGroupJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "DJ-PiGuy",
  url: "https://dj-piguy.netlify.app",
  genre: ["Hip-Hop", "Electronic", "AI-Generated Music"],
  description: "AI-powered music producer creating original hip-hop, electronic, and industry-themed tracks.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
