"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface Song {
  id: string
  title: string
  artist: string
  genre: string
  duration: number
  cover: string
  plays: number
}

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

const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "AI Synthwave",
    genre: "Synthwave",
    duration: 234,
    cover: "/neon-synthwave-album-art.jpg",
    plays: 12450,
  },
  {
    id: "2",
    title: "Digital Horizon",
    artist: "Neural Beat",
    genre: "Electronic",
    duration: 198,
    cover: "/digital-electronic-album-art.jpg",
    plays: 8920,
  },
  {
    id: "3",
    title: "Cyber Pulse",
    artist: "Machine Dreams",
    genre: "Cyberpunk",
    duration: 267,
    cover: "/cyberpunk-music-album-art.jpg",
    plays: 15670,
  },
  {
    id: "4",
    title: "Midnight Protocol",
    artist: "AI Synthwave",
    genre: "Synthwave",
    duration: 312,
    cover: "/midnight-synthwave-album-art.jpg",
    plays: 9340,
  },
  {
    id: "5",
    title: "Binary Sunset",
    artist: "Circuit Soul",
    genre: "Ambient",
    duration: 245,
    cover: "/ambient-sunset-album-art.jpg",
    plays: 7890,
  },
  {
    id: "6",
    title: "Electric Memories",
    artist: "Neural Beat",
    genre: "Electronic",
    duration: 189,
    cover: "/electric-memories-album-art.jpg",
    plays: 11200,
  },
  {
    id: "7",
    title: "Chrome Heart",
    artist: "Voltage",
    genre: "Industrial",
    duration: 278,
    cover: "/industrial-chrome-album-art.jpg",
    plays: 6540,
  },
  {
    id: "8",
    title: "Quantum Drift",
    artist: "AI Synthwave",
    genre: "Synthwave",
    duration: 223,
    cover: "/quantum-space-album-art.jpg",
    plays: 18900,
  },
  {
    id: "9",
    title: "Neural Network",
    artist: "Machine Dreams",
    genre: "Techno",
    duration: 256,
    cover: "/techno-neural-album-art.jpg",
    plays: 14320,
  },
  {
    id: "10",
    title: "Retro Future",
    artist: "Circuit Soul",
    genre: "Synthwave",
    duration: 201,
    cover: "/retro-future-album-art.jpg",
    plays: 10780,
  },
  {
    id: "11",
    title: "Data Stream",
    artist: "Voltage",
    genre: "Drum & Bass",
    duration: 187,
    cover: "/drum-bass-data-album-art.jpg",
    plays: 8650,
  },
  {
    id: "12",
    title: "Holographic Love",
    artist: "Neural Beat",
    genre: "Chillwave",
    duration: 298,
    cover: "/chillwave-holographic-album-art.jpg",
    plays: 13450,
  },
]

export function MusicProvider({ children }: { children: ReactNode }) {
  const [songs] = useState<Song[]>(sampleSongs)
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: "favorites", name: "Favorites", songs: [], cover: "/favorites-playlist-heart.jpg" },
  ])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRadioMode, setIsRadioMode] = useState(true)
  const [queue, setQueue] = useState<Song[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [playedInRadio, setPlayedInRadio] = useState<Set<string>>(new Set())

  const getRandomSong = useCallback(() => {
    const availableSongs = songs.filter((s) => !playedInRadio.has(s.id))
    if (availableSongs.length === 0) {
      setPlayedInRadio(new Set())
      return songs[Math.floor(Math.random() * songs.length)]
    }
    return availableSongs[Math.floor(Math.random() * availableSongs.length)]
  }, [songs, playedInRadio])

  const playNext = useCallback(() => {
    if (queue.length > 0) {
      const [nextSong, ...rest] = queue
      setCurrentSong(nextSong)
      setQueue(rest)
      setCurrentTime(0)
    } else if (isRadioMode) {
      const nextSong = getRandomSong()
      if (nextSong) {
        setPlayedInRadio((prev) => new Set(prev).add(nextSong.id))
        setCurrentSong(nextSong)
        setCurrentTime(0)
      }
    } else {
      setIsPlaying(false)
    }
  }, [queue, isRadioMode, getRandomSong])

  const playPrevious = useCallback(() => {
    setCurrentTime(0)
  }, [])

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

  // Auto-start radio mode
  useEffect(() => {
    if (!currentSong && isRadioMode) {
      const randomSong = getRandomSong()
      if (randomSong) {
        setPlayedInRadio(new Set([randomSong.id]))
        setCurrentSong(randomSong)
      }
    }
  }, [currentSong, isRadioMode, getRandomSong])

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
