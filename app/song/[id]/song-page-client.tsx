"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  ArrowLeft,
  Share2,
  Link as LinkIcon,
  Twitter,
  Facebook,
  Mail,
  Check,
  Phone,
  Globe,
  Building2,
  Clock,
  Radio,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import type { SongData } from "@/lib/songs-data"
import { formatDuration } from "@/lib/songs-data"

interface SongPageClientProps {
  song: SongData
}

export function SongPageClient({ song }: SongPageClientProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [copied, setCopied] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/song/${song.id}`
    : `/song/${song.id}`

  const shareText = `Check out "${song.title}" by ${song.artist} on SprayFoamRadio.com!`

  useEffect(() => {
    audioRef.current = new Audio(song.src)
    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    })
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [song.src])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * song.duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const progress = (currentTime / song.duration) * 100

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Check out this song: ${song.title}`)
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Radio</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">SprayFoamRadio</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Album Art */}
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl">
              <img
                src={song.cover || "/placeholder.svg"}
                alt={song.title}
                className="w-full h-full object-cover"
              />
              {/* Playing indicator overlay */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-2 bg-white/80 rounded-full animate-pulse"
                        style={{
                          height: `${16 + i * 8}px`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-primary font-medium mb-2">{song.genre}</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{song.title}</h1>
                <p className="text-xl text-muted-foreground">{song.artist}</p>
              </div>

              {song.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {song.description}
                </p>
              )}

              {/* Business Info */}
              {(song.phone || song.website || song.business) && (
                <div className="space-y-2 p-4 rounded-lg bg-secondary/50">
                  {song.business && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>{song.business}</span>
                    </div>
                  )}
                  {song.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${song.phone}`} className="hover:text-primary transition-colors">
                        {song.phone}
                      </a>
                    </div>
                  )}
                  {song.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      <a
                        href={`https://${song.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {song.website}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Player Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {formatDuration(currentTime)}
                  </span>
                  <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    className="flex-1"
                    onValueChange={handleSeek}
                  />
                  <span className="text-xs text-muted-foreground w-10">
                    {formatDuration(song.duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/80"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 fill-current" />
                    ) : (
                      <Play className="h-6 w-6 fill-current ml-1" />
                    )}
                  </Button>

                  {/* Share Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="lg" className="gap-2">
                        <Share2 className="h-5 w-5" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Copy Link
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
                        <Twitter className="mr-2 h-4 w-4" />
                        Share on X
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
                        <Facebook className="mr-2 h-4 w-4" />
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareByEmail} className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" />
                        Share via Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(song.duration)}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold">{song.plays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Plays</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{song.genre.split("/")[0]}</p>
                  <p className="text-xs text-muted-foreground">Genre</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 glow-yellow font-semibold">
                <Radio className="h-5 w-5" />
                Listen to More on SprayFoamRadio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
