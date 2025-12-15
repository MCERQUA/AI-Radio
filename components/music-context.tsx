"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import { songsData, type SongData } from "@/lib/songs-data"

export interface Song extends SongData {}

export interface Playlist {
  id: string
  name: string
  songs: Song[]
  cover: string
}

interface MusicContextType {
  songs: Song[]
  playlists: Playlist[]
  currentSong: Song | null
  isPlaying: boolean
  isRadioMode: boolean
  queue: Song[]
  currentTime: number
  volume: number
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (playing: boolean) => void
  setIsRadioMode: (radio: boolean) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (songId: string) => void
  clearQueue: () => void
  playNext: () => void
  playPrevious: () => void
  createPlaylist: (name: string) => void
  addToPlaylist: (playlistId: string, song: Song) => void
  removeFromPlaylist: (playlistId: string, songId: string) => void
  deletePlaylist: (playlistId: string) => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  playPlaylist: (playlist: Playlist) => void
}

const MusicContext = createContext<MusicContextType | null>(null)

// Radio ad/intro song IDs - these play every ~3 songs
const RADIO_AD_IDS = ["13", "14", "15", "16", "17", "18", "19", "21"]

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Build a radio queue: shuffled regular songs with ads every ~3 songs
function buildRadioQueue(allSongs: Song[]): Song[] {
  const regularSongs = allSongs.filter(s => !RADIO_AD_IDS.includes(s.id))
  const adSongs = allSongs.filter(s => RADIO_AD_IDS.includes(s.id))

  const shuffledRegular = shuffleArray(regularSongs)
  const shuffledAds = shuffleArray(adSongs)

  const result: Song[] = []
  let adIndex = 0

  shuffledRegular.forEach((song, index) => {
    result.push(song)
    // Insert an ad after every 3rd song (positions 2, 5, 8, etc.)
    if ((index + 1) % 3 === 0 && adIndex < shuffledAds.length) {
      result.push(shuffledAds[adIndex])
      adIndex++
    }
  })

  // Add any remaining ads at the end
  while (adIndex < shuffledAds.length) {
    result.push(shuffledAds[adIndex])
    adIndex++
  }

  return result
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [songs] = useState<Song[]>(songsData)
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: "favorites", name: "Favorites", songs: [], cover: "/favorites-playlist-heart.jpg" },
  ])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRadioMode, setIsRadioMode] = useState(true)
  const [queue, setQueue] = useState<Song[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const radioQueueRef = useRef<Song[]>([])
  const radioIndexRef = useRef(0)
  const isInitializedRef = useRef(false)

  // Initialize or rebuild radio queue
  const initRadioQueue = useCallback(() => {
    radioQueueRef.current = buildRadioQueue(songs)
    radioIndexRef.current = 0
  }, [songs])

  // Get next song from radio queue
  const getNextRadioSong = useCallback(() => {
    if (radioQueueRef.current.length === 0) {
      initRadioQueue()
    }

    const song = radioQueueRef.current[radioIndexRef.current]
    radioIndexRef.current++

    // If we've played all songs, reshuffle and start over
    if (radioIndexRef.current >= radioQueueRef.current.length) {
      initRadioQueue()
    }

    return song
  }, [initRadioQueue])

  const playNext = useCallback(() => {
    if (queue.length > 0) {
      // User has manually queued songs - play those first
      const [nextSong, ...rest] = queue
      setCurrentSong(nextSong)
      setQueue(rest)
      setCurrentTime(0)
    } else if (isRadioMode) {
      // Radio mode - get next from shuffled radio queue
      const nextSong = getNextRadioSong()
      if (nextSong) {
        setCurrentSong(nextSong)
        setCurrentTime(0)
      }
    } else {
      setIsPlaying(false)
    }
  }, [queue, isRadioMode, getNextRadioSong])

  const playPrevious = useCallback(() => {
    // Go back in radio queue if possible
    if (isRadioMode && radioIndexRef.current > 1) {
      radioIndexRef.current -= 2 // Go back 2 because playNext will increment
      const prevSong = radioQueueRef.current[radioIndexRef.current]
      if (prevSong) {
        radioIndexRef.current++
        setCurrentSong(prevSong)
        setCurrentTime(0)
        return
      }
    }
    setCurrentTime(0)
  }, [isRadioMode])

  const addToQueue = useCallback((song: Song) => {
    setQueue((prev) => [...prev, song])
  }, [])

  const removeFromQueue = useCallback((songId: string) => {
    setQueue((prev) => prev.filter((s) => s.id !== songId))
  }, [])

  const clearQueue = useCallback(() => {
    setQueue([])
  }, [])

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: [],
      cover: "/playlist-cover-music.jpg",
    }
    setPlaylists((prev) => [...prev, newPlaylist])
  }, [])

  const addToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.songs.find((s) => s.id === song.id) ? { ...p, songs: [...p.songs, song] } : p,
      ),
    )
  }, [])

  const removeFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, songs: p.songs.filter((s) => s.id !== songId) } : p)),
    )
  }, [])

  const deletePlaylist = useCallback((playlistId: string) => {
    if (playlistId === "favorites") return
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
  }, [])

  const playPlaylist = useCallback((playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0])
      setQueue(playlist.songs.slice(1))
      setIsPlaying(true)
      setIsRadioMode(false)
      setCurrentTime(0)
    }
  }, [])

  // Initialize radio queue and first song on mount
  useEffect(() => {
    if (!isInitializedRef.current && isRadioMode) {
      isInitializedRef.current = true
      initRadioQueue()
      const firstSong = getNextRadioSong()
      if (firstSong) {
        setCurrentSong(firstSong)
      }
    }
  }, [isRadioMode, initRadioQueue, getNextRadioSong])

  return (
    <MusicContext.Provider
      value={{
        songs,
        playlists,
        currentSong,
        isPlaying,
        isRadioMode,
        queue,
        currentTime,
        volume,
        setCurrentSong,
        setIsPlaying,
        setIsRadioMode,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playNext,
        playPrevious,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist,
        setCurrentTime,
        setVolume,
        playPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
