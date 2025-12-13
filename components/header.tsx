"use client"

import { Radio, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMusic } from "./music-context"

export function Header() {
  const { isRadioMode } = useMusic()

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="h-8 w-8 text-primary glow-red-text" />
            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-accent glow-yellow-text" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-primary glow-red-text">Spray</span>
              <span className="text-foreground">Foam</span>
              <span className="text-accent glow-yellow-text">Radio</span>
            </h1>
            <p className="text-xs text-muted-foreground">AI-Generated Music</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search songs, artists..."
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/30"
            />
          </div>

          {isRadioMode && (
            <div className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 border border-primary/30 glow-red">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">LIVE RADIO</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
