export interface SongData {
  id: string
  title: string
  artist: string
  genre: string
  duration: number
  cover: string
  plays: number
  src: string
  description?: string
  phone?: string
  website?: string
  business?: string
}

// Empty songs array - add your AI-generated music here
export const songsData: SongData[] = []

export function getSongById(id: string): SongData | undefined {
  return songsData.find(song => song.id === id)
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
