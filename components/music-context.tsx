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
  src: string
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
    title: "Call Me Mrs. Sprayfoam",
    artist: "DJ FoamBot Productions",
    genre: "Jingle/Commercial",
    duration: 170,
    cover: "/placeholder.svg",
    plays: 12450,
    src: "/music/Call-Me-Mrs.Sprayfoam.mp3",
  },
  {
    id: "2",
    title: "Let It Foam",
    artist: "DJ FoamBot Productions feat. Mrs. SprayFoam",
    genre: "Parody/Pop",
    duration: 200,
    cover: "/placeholder.svg",
    plays: 15670,
    src: "/music/Mrs. SprayFoam Let It Foam.mp3",
  },
  {
    id: "3",
    title: "Espuma y Calidez 2",
    artist: "DJ FoamBot Productions",
    genre: "Latin/Pop",
    duration: 245,
    cover: "/placeholder.svg",
    plays: 8920,
    src: "/music/Espuma-Calidez-2.mp3",
  },
  {
    id: "4",
    title: "Foam Everything",
    artist: "DJ FoamBot Productions",
    genre: "Anthem/Rock",
    duration: 100,
    cover: "/placeholder.svg",
    plays: 9340,
    src: "/music/Foam-Everything.mp3",
  },
  {
    id: "5",
    title: "Foam It - We Insulate You Right",
    artist: "DJ FoamBot Productions",
    genre: "Commercial/Jingle",
    duration: 100,
    cover: "/placeholder.svg",
    plays: 7890,
    src: "/music/Foam-It-we-insulate-you-right.mp3",
  },
  {
    id: "6",
    title: "Hey Diddle Diddle",
    artist: "DJ FoamBot Productions",
    genre: "Novelty/Fun",
    duration: 164,
    cover: "/placeholder.svg",
    plays: 11200,
    src: "/music/Hey-Diddle-Diddle.mp3",
  },
  {
    id: "7",
    title: "OG Polyurethane Gang",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 68,
    cover: "/placeholder.svg",
    plays: 6540,
    src: "/music/OG-Polyurthane-gang.mp3",
  },
  {
    id: "8",
    title: "Polyurethane Gang",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 67,
    cover: "/placeholder.svg",
    plays: 18900,
    src: "/music/Polyurethane-Gang.mp3",
  },
  {
    id: "9",
    title: "Comfy Life (Spanish Version)",
    artist: "DJ FoamBot Productions",
    genre: "Latin/Pop",
    duration: 245,
    cover: "/placeholder.svg",
    plays: 14320,
    src: "/music/Spanish-ComfyLife.mp3",
  },
  {
    id: "10",
    title: "Spray Foam Party (Snoop Style)",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop/G-Funk",
    duration: 167,
    cover: "/placeholder.svg",
    plays: 10780,
    src: "/music/sprayfoam-party-with-Snoop-Dogg.mp3",
  },
  {
    id: "11",
    title: "Spray Foam Tip Blues",
    artist: "DJ FoamBot Productions",
    genre: "Blues",
    duration: 96,
    cover: "/placeholder.svg",
    plays: 8650,
    src: "/music/Spray-Foam_tip_blues.mp3",
  },
  {
    id: "12",
    title: "Spray Foam Warmth",
    artist: "DJ FoamBot Productions",
    genre: "Novelty",
    duration: 116,
    cover: "/placeholder.svg",
    plays: 13450,
    src: "/music/Spray-Foam-Warmth.mp3",
  },
  {
    id: "13",
    title: "Spray Foam Radio Anthem",
    artist: "DJ FoamBot Productions",
    genre: "Electronic",
    duration: 40,
    cover: "/placeholder.svg",
    plays: 9200,
    src: "/music/SprayFoamRadio Intro.mp3",
  },
  {
    id: "14",
    title: "Spray Foam Radio: Broadcast From the Shadows",
    artist: "DJ FoamBot Productions",
    genre: "Experimental Electronic",
    duration: 39,
    cover: "/placeholder.svg",
    plays: 7500,
    src: "/music/SprayFoamRadio-Intro-1.mp3",
  },
  {
    id: "15",
    title: "Foambot's Master Plan",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 154,
    cover: "/placeholder.svg",
    plays: 11800,
    src: "/music/SprayFoam Radio Ad foambot master plan.mp3",
  },
  {
    id: "16",
    title: "DJ Phombod's Hip Hop Radio Anthem",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 38,
    cover: "/placeholder.svg",
    plays: 6300,
    src: "/music/SprayFoam-Radio-Ad-2.mp3",
  },
  {
    id: "17",
    title: "Break Phone Radio: DJ Fonbob's Hip Hop Anthem",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 41,
    cover: "/placeholder.svg",
    plays: 5800,
    src: "/music/SprayFoam Radio Ad.mp3",
  },
  {
    id: "18",
    title: "Spray Foam Radio: DJ Foam Bot's Hottest Hits",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 33,
    cover: "/placeholder.svg",
    plays: 7100,
    src: "/music/SprayFoam Radio Ad with DJ Foam Bot.mp3",
  },
  {
    id: "19",
    title: "Spray Foam Radio: DJ Foambot's Anthem",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 24,
    cover: "/placeholder.svg",
    plays: 4500,
    src: "/music/SprayFoam Radio Ad_ DJ Foam Bot.mp3",
  },
  {
    id: "20",
    title: "Ink Flow Empire",
    artist: "DJ FoamBot Productions feat. Foam Swag",
    genre: "Hip-Hop",
    duration: 83,
    cover: "/placeholder.svg",
    plays: 8900,
    src: "/music/Foam Guns for Hire.mp3",
  },
  {
    id: "21",
    title: "Sprayfoam Supreme",
    artist: "DJ FoamBot",
    genre: "Electronic/DJ Skit",
    duration: 152,
    cover: "/placeholder.svg",
    plays: 12300,
    src: "/music/Sprayfoam Supreme.mp3",
  },
  {
    id: "22",
    title: "Spray Foam Cowboy v1",
    artist: "DJ FoamBot Productions",
    genre: "Country",
    duration: 180,
    cover: "/placeholder.svg",
    plays: 16500,
    src: "/music/sprayfoam-cowboy-v1.mp3",
  },
  {
    id: "23",
    title: "Spray Foam Cowboy v2",
    artist: "DJ FoamBot Productions",
    genre: "Country",
    duration: 165,
    cover: "/placeholder.svg",
    plays: 14200,
    src: "/music/sprayfoam-cowboy-v2.mp3",
  },
  {
    id: "24",
    title: "Seal It Up",
    artist: "DJ FoamBot Productions",
    genre: "Electronic",
    duration: 154,
    cover: "/placeholder.svg",
    plays: 9800,
    src: "/music/Seal it up.mp3",
  },
  {
    id: "25",
    title: "The Spray Foam Marksman",
    artist: "DJ FoamBot Productions feat. On the Mark Spray Foam",
    genre: "Indie Rock",
    duration: 122,
    cover: "/placeholder.svg",
    plays: 11500,
    src: "/music/The Spray Foam Marksman.mp3",
  },
  {
    id: "26",
    title: "Iso Stains (ALLSTATE Anthem)",
    artist: "DJ FoamBot Productions feat. Allstate Spray Foam",
    genre: "Commercial/Jingle",
    duration: 115,
    cover: "/placeholder.svg",
    plays: 10200,
    src: "/music/Iso-Stains-ALLSTATE.mp3",
  },
  {
    id: "27",
    title: "Cali Foam Dreams (Allstate Sprayfoam)",
    artist: "DJ FoamBot Productions feat. Allstate Spray Foam",
    genre: "Commercial/Jingle",
    duration: 120,
    cover: "/placeholder.svg",
    plays: 9600,
    src: "/music/Cali-Foam-Dreams-Allstate-Sprayfoam.mp3",
  },
  {
    id: "28",
    title: "Foam is my fav F-word",
    artist: "DJ FoamBot Productions",
    genre: "Hip-Hop",
    duration: 92,
    cover: "/placeholder.svg",
    plays: 8400,
    src: "/music/Foam-is-my-fav-F-word.mp3",
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
