# DJ-PiGuy Radio

A modern, customizable music radio web app built with Next.js. Clone it and create your own internet radio station with your tracks!

> **Sponsored by [Contractors Choice Agency](https://contractorschoiceagency.com)** - This creative project was funded to give contractors access to custom songs for their businesses. Because every hard-working contractor deserves a better day with custom music to listen to on the job site.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-DJ--PiGuy-ff6b35?style=for-the-badge)](https://ai-radio-mcerquas-projects.vercel.app/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Features

- **Radio Mode** - Continuous playback with shuffle, queue management, and auto-play
- **Song Library** - Browse, search, and filter tracks by genre
- **Individual Song Pages** - Shareable pages for each track with SEO metadata
- **Responsive Design** - Works great on desktop, tablet, and mobile
- **Optimized Images** - WebP thumbnails and hero images for fast loading
- **Share Functionality** - Share songs via Twitter, Facebook, Email, or copy link
- **Dark Theme** - Modern dark UI with customizable accent colors

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/MCERQUA/AI-Radio.git
cd AI-Radio
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your radio station.

### 3. Build for Production

```bash
npm run build
npm start
```

## Adding Your Own Tracks

### Step 1: Add Your Music Files

Place your MP3 files in the `public/music/` directory:

```
public/
└── music/
    ├── your-song-1.mp3
    ├── your-song-2.mp3
    └── ...
```

### Step 2: Update Song Data

Edit `lib/songs-data.ts` to add your tracks:

```typescript
export const songsData: SongData[] = [
  {
    id: "1",
    title: "Your Song Title",
    artist: "Your Artist Name",
    genre: "Hip-Hop",  // or any genre
    duration: 180,     // duration in seconds
    cover: "/covers/your-song.png",
    plays: 0,
    src: "/music/your-song.mp3",
    description: "A description of your track.",
  },
  // Add more songs...
]
```

### Step 3: Add Album Covers

#### Option A: Manual Covers

Add your album art to `public/covers/` then run the optimization script:

```bash
node scripts/optimize-covers.mjs
```

This creates optimized WebP versions:
- `public/covers/thumb/` - 300x300 thumbnails (~17KB each)
- `public/covers/hero/` - 800x800 hero images (~90KB each)

#### Option B: Generate with AI

If you have access to an AI image generator, create covers with this prompt style:

```
Hip-hop album cover with vinyl record peeking out from the right side.
Square album sleeve on light gray background at slight angle.
The album art features [YOUR THEME HERE].
Bold graffiti-style text "[SONG TITLE]" at the top and "[ARTIST NAME]"
as artist name at bottom. [COLOR SCHEME]. Professional product
photography style showing the album cover as a physical vinyl record
package with the brown/amber colored record visible on the right side.
```

## Customization

### Branding

Update the site name and branding in:
- `app/layout.tsx` - Site metadata and title
- `components/player.tsx` - Logo and brand name
- `components/song-library.tsx` - Header branding

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: /* your primary color */;
  --accent: /* your accent color */;
  /* ... */
}
```

### Genres

Update the genre list in `components/song-library.tsx`:

```typescript
const genres = [
  "All",
  "Hip-Hop",
  "Rock",
  "Pop",
  // Add your genres...
]
```

## Project Structure

```
AI-Radio/
├── app/                    # Next.js app directory
│   ├── song/[id]/         # Individual song pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── music-context.tsx  # Music player state
│   ├── player.tsx         # Audio player
│   └── song-library.tsx   # Song list/grid
├── lib/
│   └── songs-data.ts      # Song database
├── public/
│   ├── covers/            # Album artwork
│   │   ├── hero/          # 800x800 WebP
│   │   └── thumb/         # 300x300 WebP
│   └── music/             # MP3 files
└── scripts/
    └── optimize-covers.mjs # Image optimization
```

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MCERQUA/AI-Radio)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Docker
- Self-hosted

## Performance

Image optimization reduces cover art from ~6MB to:
- **Thumbnails**: ~17KB each (300x300 WebP)
- **Hero images**: ~90KB each (800x800 WebP)

Total reduction: **98%** smaller file sizes for fast loading.

## License

MIT License - Feel free to use this for your own radio station!

## Sponsor

This project is proudly sponsored by **[Contractors Choice Agency](https://contractorschoiceagency.com)**.

Their mission: Give contractors access to custom songs for their businesses, making every work day a little better with music made just for them.

## Credits

- Sponsored by [Contractors Choice Agency](https://contractorschoiceagency.com)
- Built with [Claude Code](https://claude.ai)
- Album covers generated with AI image generation
- Original design inspired by modern music streaming apps

---

**Made with beats and code for the hardworking contractors out there**
