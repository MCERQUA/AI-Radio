import { MusicProvider } from "@/components/music-context"
import { Header } from "@/components/header"
import { SongLibrary } from "@/components/song-library"
import { Player } from "@/components/player"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <MusicProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-28">
            <SongLibrary />
          </main>
        </div>
        <Player />
      </div>
    </MusicProvider>
  )
}
