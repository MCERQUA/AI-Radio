"use client"

import type React from "react"

import { useState } from "react"
import { Heart, ListMusic, Plus, Radio, Trash2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusic } from "./music-context"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    playPlaylist,
    isRadioMode,
    setIsRadioMode,
    setIsPlaying,
    clearQueue,
  } = useMusic()
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim())
      setNewPlaylistName("")
      setShowInput(false)
    }
  }

  const handleRadioMode = () => {
    setIsRadioMode(true)
    clearQueue()
    setIsPlaying(true)
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border/50 bg-card/30 pb-28">
      <div className="p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-left h-12 transition-all",
            isRadioMode && "bg-primary/20 text-primary border border-primary/30 glow-red",
          )}
          onClick={handleRadioMode}
        >
          <Radio className="h-5 w-5" />
          <div>
            <p className="font-medium">Radio Mode</p>
            <p className="text-xs text-muted-foreground">Auto-play random songs</p>
          </div>
        </Button>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Playlists</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-accent hover:text-accent hover:bg-accent/20"
            onClick={() => setShowInput(!showInput)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showInput && (
          <div className="mt-2 flex gap-2">
            <Input
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="h-8 text-sm bg-secondary/50"
              onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
            />
            <Button size="sm" className="h-8 bg-primary hover:bg-primary/80" onClick={handleCreatePlaylist}>
              Add
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/80 group-hover:bg-primary/20 transition-colors">
                {playlist.id === "favorites" ? (
                  <Heart className="h-5 w-5 text-primary" />
                ) : (
                  <ListMusic className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{playlist.name}</p>
                <p className="text-xs text-muted-foreground">{playlist.songs.length} songs</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-accent hover:text-accent hover:bg-accent/20"
                  onClick={() => playPlaylist(playlist)}
                  disabled={playlist.songs.length === 0}
                >
                  <Play className="h-3.5 w-3.5" />
                </Button>
                {playlist.id !== "favorites" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/20"
                    onClick={() => deletePlaylist(playlist.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 p-4 border border-primary/20">
          <Sparkles className="h-5 w-5 text-accent mb-2" />
          <p className="text-sm font-medium">AI Generated</p>
          <p className="text-xs text-muted-foreground mt-1">All tracks created by artificial intelligence</p>
        </div>
      </div>
    </aside>
  )
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
