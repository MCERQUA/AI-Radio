"use client"

import { useState } from "react"
import { Share2, Link, Twitter, Facebook, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Song } from "./music-context"

interface ShareButtonProps {
  song: Song
  variant?: "ghost" | "outline" | "default"
  size?: "icon" | "sm" | "default"
}

export function ShareButton({ song, variant = "ghost", size = "icon" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/song/${song.id}`
    : `/song/${song.id}`

  const shareText = `Check out "${song.title}" by ${song.artist} on SprayFoamRadio.com!`

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

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err)
        }
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Link className="mr-2 h-4 w-4" />
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
        {typeof navigator !== "undefined" && navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            More Options...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
