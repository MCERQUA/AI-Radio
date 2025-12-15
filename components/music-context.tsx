"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
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
