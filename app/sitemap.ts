import { MetadataRoute } from 'next'
import { songsData } from '@/lib/songs-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dj-piguy.netlify.app'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Dynamic song pages
  const songPages = songsData.map((song) => ({
    url: `${baseUrl}/song/${song.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...songPages]
}
