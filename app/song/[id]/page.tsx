import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSongById, songsData, formatDuration, getCoverHero } from "@/lib/songs-data"
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
      title: "Song Not Found - DJ-PiGuy",
    }
  }

  const description = song.description || `Listen to "${song.title}" by ${song.artist} on DJ-PiGuy`
  // Use hero WebP (800x800) for social sharing - exists for all songs
  const imageUrl = song.cover && song.cover !== "/placeholder.svg"
    ? getCoverHero(song.cover)
    : "/og-image.png"

  return {
    title: `${song.title} - ${song.artist} | DJ-PiGuy`,
    description,
    openGraph: {
      title: `${song.title} - ${song.artist}`,
      description,
      type: "music.song",
      siteName: "DJ-PiGuy",
      url: `/song/${song.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
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
