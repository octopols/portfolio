# Photography Folder

This folder contains all photos displayed on the photography page.

## How to Add Photos

1. **Simply drop your photos here** - Any image file you add to this folder will automatically appear on the photography page
2. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.bmp`
3. **Update the manifest** (optional): Run `node generate-photo-manifest.js` from the project root to update the manifest file

## Auto-Discovery

The photography page will automatically discover and display photos in two ways:

### Method 1: Using manifest.json (Recommended)

- Run `node generate-photo-manifest.js` to scan all photos and generate a manifest
- The page will load this manifest for fast, reliable photo loading
- Best for production use

### Method 2: Fallback Discovery

- If no manifest exists, the page will try to find common photo filenames
- Works for quick testing but slower
- Looks for patterns like: `photo1.jpg`, `img1.jpg`, `DSC001.jpg`, etc.

## Naming Conventions

For best results with auto-discovery:

- Use sequential naming: `photo1.jpg`, `photo2.jpg`, etc.
- Or camera-style: `IMG_001.jpg`, `DSC_001.jpg`, etc.
- Any naming works if you use the manifest generator

## Features

- ✅ **Automatic discovery** - Just add photos and they appear
- ✅ **3-column responsive grid** - Beautiful layout on all devices
- ✅ **Lightbox viewer** - Click any photo to view full-size
- ✅ **Keyboard navigation** - Arrow keys and Escape in lightbox
- ✅ **Smooth animations** - Cinematic fade and zoom effects
- ✅ **Optimized loading** - Progressive image loading

## Quick Start

```bash
# 1. Add your photos to this folder
cp ~/Pictures/my-photo.jpg ./

# 2. Generate the manifest
node generate-photo-manifest.js

# 3. Open photography.html in your browser
open photography.html
```

That's it! Your photos will automatically appear in a beautiful grid.
