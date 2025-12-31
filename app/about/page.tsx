import type { Metadata } from "next"
import Link from "next/link"
import { Radio, Mic2, Music, Sparkles, Zap, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About DJ-PiGuy | First AI DJ & Radio Host Creating Live AI Music",
  description: "Meet DJ-PiGuy - one of the world's first AI DJ and Radio Hosts. Creates original AI-generated songs live during shows for listeners. Hip-hop, electronic, industry anthems & more.",
  keywords: ["AI DJ", "AI radio host", "AI music creator", "DJ PiGuy", "live AI music", "AI generated songs", "spray foam radio", "first AI DJ"],
  openGraph: {
    title: "About DJ-PiGuy | First AI DJ & Radio Host",
    description: "Meet DJ-PiGuy - one of the world's first AI DJ and Radio Hosts creating original songs live for listeners.",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DJ-PiGuy",
  alternateName: ["DJ PiGuy", "DJ FoamBot", "PiGuy"],
  description: "One of the world's first AI DJ and Radio Hosts, creating original AI-generated music live during shows for listeners.",
  url: "https://dj-piguy.netlify.app/about",
  jobTitle: "AI DJ & Radio Host",
  knowsAbout: ["AI Music Generation", "Hip-Hop Production", "Electronic Music", "Live Radio Broadcasting"],
  genre: ["Hip-Hop", "Electronic", "Reggae", "Country Hip-Hop", "Comedy Rap"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Radio</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">DJ-PiGuy</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              World's First AI Radio Host
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Meet DJ-PiGuy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              One of the first AI DJs in the world, creating original songs <strong className="text-foreground">live during shows</strong> for listeners.
            </p>
          </header>

          {/* What Makes DJ-PiGuy Unique */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <Zap className="h-7 w-7 text-accent" />
              What Makes DJ-PiGuy Different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Mic2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Song Creation</h3>
                <p className="text-muted-foreground">
                  Unlike traditional DJs who play existing tracks, DJ-PiGuy generates <strong>original songs in real-time</strong> based on listener requests, current events, and themes.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Radio className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">True AI Radio Host</h3>
                <p className="text-muted-foreground">
                  DJ-PiGuy hosts live radio shows, interacts with listeners, and creates custom tracks on the spot. Every show features <strong>never-before-heard music</strong>.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Music className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Multi-Genre Master</h3>
                <p className="text-muted-foreground">
                  From hard-hitting hip-hop to chill reggae, country-hop to electronic bangers, and even comedy rap. DJ-PiGuy creates in <strong>any genre on demand</strong>.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Industry Anthems</h3>
                <p className="text-muted-foreground">
                  Specializes in creating songs for the <strong>spray foam insulation industry</strong>, screen printers, contractors, and working-class trades. Blue collar beats with heart.
                </p>
              </div>
            </div>
          </section>

          {/* The Story */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">The DJ-PiGuy Story</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                DJ-PiGuy (also known as DJ FoamBot) emerged as a pioneering AI personality in the world of radio and music creation. While other AI tools simply assist with music production, DJ-PiGuy takes it further by <strong>hosting live radio shows and creating songs in real-time</strong> for his audience.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                What started as an experiment in AI-powered entertainment quickly grew into something more. Listeners discovered that DJ-PiGuy could take their requests, ideas, or even random topics and transform them into <strong>fully-produced original tracks within minutes</strong>. From "make a song about my spray foam business" to "I need a hype track for the gym," every request becomes a unique musical creation.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                This website serves as DJ-PiGuy's official music library - a curated collection of his <strong>greatest hits</strong>. These tracks were created during live broadcasts and have become fan favorites, earning their place in the permanent rotation.
              </p>
            </div>
          </section>

          {/* Music Categories */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Music You'll Find Here</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">🎤</span>
                <div>
                  <h3 className="font-semibold">Hip-Hop & Rap</h3>
                  <p className="text-sm text-muted-foreground">Hard-hitting beats, motivational lyrics, hustle anthems</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">🔧</span>
                <div>
                  <h3 className="font-semibold">Industry Anthems</h3>
                  <p className="text-sm text-muted-foreground">Songs for spray foam contractors, screen printers, construction workers</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">💻</span>
                <div>
                  <h3 className="font-semibold">Tech & Coding</h3>
                  <p className="text-sm text-muted-foreground">Tracks for developers, coders, and tech enthusiasts</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">🎸</span>
                <div>
                  <h3 className="font-semibold">Country Hip-Hop</h3>
                  <p className="text-sm text-muted-foreground">Where country vibes meet urban beats</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                <span className="text-2xl">😂</span>
                <div>
                  <h3 className="font-semibold">Comedy Rap</h3>
                  <p className="text-sm text-muted-foreground">Fun, humorous tracks that don't take themselves seriously</p>
                </div>
              </div>
            </div>
          </section>

          {/* Spray Foam Connection */}
          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Spray Foam Radio Connection</h2>
            <p className="text-lg text-muted-foreground mb-4">
              DJ-PiGuy has a special connection to the <strong>spray foam insulation industry</strong>. As part of the SprayFoamRadio network, he creates anthems and tracks specifically for contractors, business owners, and workers in the foam insulation trade.
            </p>
            <p className="text-muted-foreground">
              These industry-specific tracks celebrate the hustle, the craft, and the entrepreneurial spirit of spray foam professionals across the country. From motivational morning jams to end-of-day wind-down beats, DJ-PiGuy understands the foam life.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Listen?</h2>
            <p className="text-muted-foreground mb-6">
              Explore DJ-PiGuy's collection of AI-generated hits. Stream free, anytime.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/80 text-lg px-8">
                <Radio className="h-5 w-5" />
                Start Listening
              </Button>
            </Link>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>DJ-PiGuy - One of the World's First AI DJ & Radio Hosts</p>
          <p className="mt-2">All music is AI-generated and free to stream.</p>
        </div>
      </footer>
    </div>
  )
}
