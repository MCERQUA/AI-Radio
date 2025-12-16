import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

const COVERS_DIR = './public/covers';
const THUMB_DIR = './public/covers/thumb';
const HERO_DIR = './public/covers/hero';

const THUMB_SIZE = 300;
const HERO_SIZE = 800;
const WEBP_QUALITY = 82;

async function optimizeCovers() {
  // Create output directories
  await mkdir(THUMB_DIR, { recursive: true });
  await mkdir(HERO_DIR, { recursive: true });

  // Get all PNG files
  const files = await readdir(COVERS_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`Found ${pngFiles.length} covers to optimize...\n`);

  for (const file of pngFiles) {
    const inputPath = join(COVERS_DIR, file);
    const baseName = file.replace('.png', '');

    // Create thumbnail (300x300 WebP)
    const thumbPath = join(THUMB_DIR, `${baseName}.webp`);
    await sharp(inputPath)
      .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(thumbPath);

    // Create hero image (800x800 WebP)
    const heroPath = join(HERO_DIR, `${baseName}.webp`);
    await sharp(inputPath)
      .resize(HERO_SIZE, HERO_SIZE, { fit: 'cover' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(heroPath);

    const thumbStats = await sharp(thumbPath).metadata();
    const heroStats = await sharp(heroPath).metadata();

    console.log(`✓ ${baseName}`);
  }

  console.log('\nDone! Checking sizes...\n');

  // Show size comparison
  const { execSync } = await import('child_process');
  console.log('Original PNGs:');
  console.log(execSync(`du -sh ${COVERS_DIR}/*.png`).toString().split('\n').slice(0, 3).join('\n') + '\n...\n');

  console.log('Thumbnails (300x300):');
  console.log(execSync(`du -sh ${THUMB_DIR}`).toString());

  console.log('Hero images (800x800):');
  console.log(execSync(`du -sh ${HERO_DIR}`).toString());
}

optimizeCovers().catch(console.error);
