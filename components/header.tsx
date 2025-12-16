"use client"

import { useState } from "react"
import { Radio, Search, Sparkles, Menu, X, Heart, ListMusic, Plus, Play, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusic } from "./music-context"
import { cn } from "@/lib/utils"

export function Header() {
  const {
    isRadioMode,
    setIsRadioMode,
    setIsPlaying,
    clearQueue,
    playlists,
    createPlaylist,
    deletePlaylist,
    playPlaylist,
  } = useMusic()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleRadioMode = () => {
    setIsRadioMode(true)
    clearQueue()
    setIsPlaying(true)
    setMobileMenuOpen(false)
  }

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim())
      setNewPlaylistName("")
      setShowInput(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-11 w-11 min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Radio className="h-7 w-7 md:h-8 md:w-8 text-primary glow-red-text" />
              <Sparkles className="absolute -right-1 -top-1 h-3 w-3 md:h-4 md:w-4 text-accent glow-yellow-text" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">
                <span className="text-primary glow-red-text">DJ</span>
                <span className="text-foreground">-</span>
                <span className="text-accent glow-yellow-text">PiGuy</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI-Generated Music</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative w-32 sm:w-48 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 h-10 md:h-9 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/30"
              />
            </div>

            {isRadioMode && (
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-primary/20 px-3 md:px-4 py-1.5 border border-primary/30 glow-red">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs md:text-sm font-medium text-primary">LIVE</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border/50 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 min-h-[44px] min-w-[44px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-left h-14 min-h-[56px] transition-all",
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
                  className="h-11 w-11 min-h-[44px] min-w-[44px] text-accent hover:text-accent hover:bg-accent/20"
                  onClick={() => setShowInput(!showInput)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {showInput && (
                <div className="mt-2 flex gap-2">
                  <Input
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Playlist name"
                    className="h-11 text-sm bg-secondary/50"
                    onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
                  />
                  <Button size="sm" className="h-11 px-4 bg-primary hover:bg-primary/80" onClick={handleCreatePlaylist}>
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
                    className="group flex items-center gap-3 rounded-lg p-3 hover:bg-secondary/50 active:bg-secondary/70 transition-colors cursor-pointer min-h-[56px]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/80 group-hover:bg-primary/20 transition-colors">
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
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 min-h-[44px] min-w-[44px] text-accent hover:text-accent hover:bg-accent/20"
                        onClick={() => {
                          playPlaylist(playlist)
                          setMobileMenuOpen(false)
                        }}
                        disabled={playlist.songs.length === 0}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                      {playlist.id !== "favorites" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 min-h-[44px] min-w-[44px] text-destructive hover:text-destructive hover:bg-destructive/20"
                          onClick={() => deletePlaylist(playlist.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </aside>
        </div>
      )}
    </>
  )
}
