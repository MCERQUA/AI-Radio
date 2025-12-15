import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSongById, songsData, formatDuration } from "@/lib/songs-data"
import { SongPageClient } from "./song-page-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return songsData.map((song) => ({
    id: song.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const song = getSongById(id)

  if (!song) {
    return {
      title: "Song Not Found - SprayFoamRadio.com",
    }
  }

  const description = song.description || `Listen to "${song.title}" by ${song.artist} on SprayFoamRadio.com`
  const baseUrl = "https://sprayfoamradio.com"
  const imageUrl = song.cover && song.cover !== "/placeholder.svg"
    ? `${baseUrl}${song.cover}`
    : `${baseUrl}/og-image.png`

  return {
    title: `${song.title} - ${song.artist} | SprayFoamRadio.com`,
    description,
    openGraph: {
      title: `${song.title} - ${song.artist}`,
      description,
      type: "music.song",
      siteName: "SprayFoamRadio.com",
      url: `${baseUrl}/song/${song.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: `${song.title} album cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${song.title} - ${song.artist}`,
      description,
      images: [imageUrl],
    },
  }
}

export default async function SongPage({ params }: PageProps) {
  const { id } = await params
  const song = getSongById(id)

  if (!song) {
    notFound()
  }

  return <SongPageClient song={song} />
}
