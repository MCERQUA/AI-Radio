"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Download, Heart, ListPlus, MoreHorizontal, Play, TrendingUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMusic, type Song } from "./music-context"
import { ShareButton } from "./share-button"
import { cn } from "@/lib/utils"

const genres = [
  "All",
  "Hip-Hop",
  "Commercial/Jingle",
  "Country",
  "Electronic",
  "Latin/Pop",
  "Parody/Pop",
  "Blues",
  "Novelty",
  "Indie Rock",
]

export function SongLibrary() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const { songs, playlists, addToPlaylist, addToQueue, currentSong, setCurrentSong, setIsPlaying, setIsRadioMode } =
    useMusic()

  const filteredSongs = selectedGenre === "All" ? songs : songs.filter((song) => song.genre === selectedGenre)

  const trendingSongs = [...songs].sort((a, b) => b.plays - a.plays).slice(0, 6)

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    setIsRadioMode(false)
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="bg-secondary/50 border border-border/50 mb-6">
          <TabsTrigger
            value="browse"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Browse
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="queue"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Queue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full border-border/50 transition-all",
                  selectedGenre === genre
                    ? "bg-primary text-primary-foreground border-primary glow-red"
                    : "hover:border-primary/50 hover:text-primary",
                )}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>

          <div className="grid gap-3">
            {filteredSongs.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index + 1}
                isActive={currentSong?.id === song.id}
                onPlay={() => handlePlaySong(song)}
                onAddToQueue={() => addToQueue(song)}
                onAddToPlaylist={(playlistId) => addToPlaylist(playlistId, song)}
                playlists={playlists}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Top Tracks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingSongs.map((song, index) => (
              <TrendingSongCard
                key={song.id}
                song={song}
                rank={index + 1}
                isActive={currentSong?.id === song.id}
                onPlay={() => handlePlaySong(song)}
                onAddToQueue={() => addToQueue(song)}
                onAddToPlaylist={(playlistId) => addToPlaylist(playlistId, song)}
                playlists={playlists}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue">
          <QueueView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function downloadSong(song: Song) {
  if (song.src) {
    const link = document.createElement("a")
    link.href = song.src
    link.download = `${song.artist} - ${song.title}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const notification = document.createElement("div")
  notification.className =
    "fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2"
  notification.textContent = `Downloading: ${song.title}`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 2000)
}

interface SongRowProps {
  song: Song
  index: number
  isActive: boolean
  onPlay: () => void
  onAddToQueue: () => void
  onAddToPlaylist: (playlistId: string) => void
  playlists: { id: string; name: string }[]
}

function SongRow({ song, index, isActive, onPlay, onAddToQueue, onAddToPlaylist, playlists }: SongRowProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-lg p-3 transition-all hover:bg-secondary/50",
        isActive && "bg-primary/10 border border-primary/30",
      )}
    >
      <div className="w-8 text-center">
        <span className="text-sm text-muted-foreground group-hover:hidden">{index}</span>
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-8 w-8 group-hover:flex items-center justify-center text-primary hover:text-primary hover:bg-primary/20"
          onClick={onPlay}
        >
          <Play className="h-4 w-4 fill-current" />
        </Button>
      </div>

      <div className="relative h-12 w-12 overflow-hidden rounded-md">
        <img src={song.cover || "/placeholder.svg"} alt={song.title} className="h-full w-full object-cover" />
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-primary animate-pulse"
                  style={{
                    height: `${12 + i * 4}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", isActive && "text-primary")}>{song.title}</p>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
      </div>

      <span className="hidden sm:block text-xs rounded-full bg-secondary px-2 py-1 text-muted-foreground">
        {song.genre}
      </span>

      <div className="flex items-center gap-1 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">{formatDuration(song.duration)}</span>
      </div>

      <ShareButton song={song} />

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-accent"
        onClick={() => downloadSong(song)}
        title="Download"
      >
        <Download className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/song/${song.id}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Song Page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAddToQueue} className="cursor-pointer">
            <ListPlus className="mr-2 h-4 w-4" />
            Add to Queue
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadSong(song)} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4" />
              Add to Playlist
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-popover border-border">
              {playlists.map((playlist) => (
                <DropdownMenuItem
                  key={playlist.id}
                  onClick={() => onAddToPlaylist(playlist.id)}
                  className="cursor-pointer"
                >
                  {playlist.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

interface TrendingSongCardProps {
  song: Song
  rank: number
  isActive: boolean
  onPlay: () => void
  onAddToQueue: () => void
  onAddToPlaylist: (playlistId: string) => void
  playlists: { id: string; name: string }[]
}

function TrendingSongCard({
  song,
  rank,
  isActive,
  onPlay,
  onAddToQueue,
  onAddToPlaylist,
  playlists,
}: TrendingSongCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card border border-border/50 transition-all hover:border-primary/50",
        isActive && "border-primary glow-red",
      )}
    >
      <div className="relative aspect-square">
        <img src={song.cover || "/placeholder.svg"} alt={song.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-3 top-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm glow-yellow">
            #{rank}
          </span>
        </div>

        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-accent"
            onClick={() => downloadSong(song)}
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-semibold text-white truncate">{song.title}</p>
          <p className="text-sm text-white/70 truncate">{song.artist}</p>
          <p className="text-xs text-accent mt-1">{song.plays.toLocaleString()} plays</p>
        </div>

        <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 glow-red"
            onClick={onPlay}
          >
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function QueueView() {
  const { queue, removeFromQueue, currentSong } = useMusic()

  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ListPlus className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Your queue is empty</h3>
        <p className="text-sm text-muted-foreground mt-1">Add songs to play them next</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentSong && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Now Playing</h3>
          <div className="flex items-center gap-4 rounded-lg bg-primary/10 border border-primary/30 p-4">
            <img
              src={currentSong.cover || "/placeholder.svg"}
              alt={currentSong.title}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold text-primary">{currentSong.title}</p>
              <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Up Next</h3>
      <div className="space-y-2">
        {queue.map((song, index) => (
          <div key={`${song.id}-${index}`} className="flex items-center gap-4 rounded-lg bg-secondary/30 p-3">
            <span className="w-6 text-center text-sm text-muted-foreground">{index + 1}</span>
            <img src={song.cover || "/placeholder.svg"} alt={song.title} className="h-10 w-10 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeFromQueue(song.id)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
