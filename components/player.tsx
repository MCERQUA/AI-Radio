"use client"

import { useEffect, useRef, useCallback } from "react"
import {
  Download,
  Heart,
  ListMusic,
  Pause,
  Play,
  Radio,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMusic } from "./music-context"
import { ShareButton } from "./share-button"
import { cn } from "@/lib/utils"

function downloadSong(song: { title: string; artist: string; cover: string; src?: string }) {
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
    "fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-[100] animate-in fade-in slide-in-from-top-2"
  notification.textContent = `Downloading: ${song.title}`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 2000)
}

export function Player() {
  const {
    currentSong,
    isPlaying,
    isRadioMode,
    currentTime,
    volume,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    playNext,
    playPrevious,
    playlists,
    addToPlaylist,
  } = useMusic()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playNextRef = useRef(playNext)

  // Keep playNextRef current
  useEffect(() => {
    playNextRef.current = playNext
  }, [playNext])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Initialize audio element (only once)
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      playNextRef.current()
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.pause()
      audioRef.current = null
    }
  }, [setCurrentTime])

  // Handle song change and play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (currentSong?.src) {
      // Only update src if it changed
      if (audioRef.current.src !== window.location.origin + currentSong.src) {
        audioRef.current.src = currentSong.src
        audioRef.current.load()
      }

      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [currentSong, isPlaying])

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const isFavorite =
    currentSong && playlists.find((p) => p.id === "favorites")?.songs.find((s) => s.id === currentSong.id)

  const toggleFavorite = () => {
    if (currentSong) {
      addToPlaylist("favorites", currentSong)
    }
  }

  const progress = currentSong ? (currentTime / currentSong.duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl">
      {/* Progress bar */}
      <div className="relative h-1 w-full bg-secondary">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary glow-red transition-all"
          style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-2 py-2 md:gap-4 md:px-6 md:py-3">
        {/* Song Info - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-4 min-w-0 w-1/4">
          {currentSong ? (
            <>
              <div className="relative h-14 w-14 overflow-hidden rounded-md shrink-0">
                <img
                  src={currentSong.cover || "/placeholder.svg"}
                  alt={currentSong.title}
                  className="h-full w-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-accent animate-pulse"
                          style={{
                            height: `${8 + i * 3}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{currentSong.title}</p>
                <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-11 w-11 min-h-[44px] min-w-[44px] shrink-0", isFavorite && "text-primary")}
                onClick={toggleFavorite}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 text-muted-foreground hover:text-accent"
                onClick={() => downloadSong(currentSong)}
                title="Download"
              >
                <Download className="h-5 w-5" />
              </Button>
              <ShareButton song={currentSong} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-md bg-secondary animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-secondary animate-pulse" />
                <div className="h-3 w-16 rounded bg-secondary animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Compact song info - fixed width for centering */}
        <div className="flex md:hidden items-center gap-2 w-[100px] shrink-0">
          {currentSong && (
            <>
              <div className="relative h-10 w-10 overflow-hidden rounded shrink-0">
                <img
                  src={currentSong.cover || "/placeholder.svg"}
                  alt={currentSong.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">{currentSong.title}</p>
                <p className="text-[10px] text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 md:max-w-md">
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex h-11 w-11 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-foreground active:bg-secondary">
              <Shuffle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-primary active:bg-secondary"
              onClick={playPrevious}
            >
              <SkipBack className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="icon"
              className="h-14 w-14 min-h-[56px] min-w-[56px] rounded-full bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/70 glow-red"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="h-6 w-6 fill-current ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 min-h-[44px] min-w-[44px] text-foreground hover:text-primary active:bg-secondary"
              onClick={playNext}
            >
              <SkipForward className="h-5 w-5 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex h-11 w-11 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-foreground active:bg-secondary">
              <Repeat className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="flex-1"
              onValueChange={([value]) => {
                if (currentSong && audioRef.current) {
                  const newTime = (value / 100) * currentSong.duration
                  audioRef.current.currentTime = newTime
                  setCurrentTime(newTime)
                }
              }}
            />
            <span className="text-xs text-muted-foreground w-10">
              {currentSong ? formatTime(currentSong.duration) : "0:00"}
            </span>
          </div>
        </div>

        {/* Mobile action buttons - fixed width to match left side for centering */}
        <div className="flex md:hidden items-center justify-end gap-1 w-[100px] shrink-0">
          {currentSong && (
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-10 w-10 min-h-[40px] min-w-[40px]", isFavorite && "text-primary")}
              onClick={toggleFavorite}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>
          )}
        </div>

        {/* Volume & Extras - Desktop only */}
        <div className="hidden md:flex items-center gap-4 w-1/4 justify-end">
          {isRadioMode && (
            <div className="flex items-center gap-1.5 text-primary">
              <Radio className="h-4 w-4" />
              <span className="text-xs font-medium">RADIO</span>
            </div>
          )}

          <Button variant="ghost" size="icon" className="h-11 w-11 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-foreground">
            <ListMusic className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 min-h-[44px] min-w-[44px] text-muted-foreground hover:text-foreground"
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            >
              {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={([value]) => setVolume(value / 100)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
