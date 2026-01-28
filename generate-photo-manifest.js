#!/usr/bin/env node

/**
 * Photo Manifest Generator with Image Optimization
 *
 * This script scans the assets/photography folder and:
 * 1. Generates optimized thumbnails for grid display (600px width)
 * 2. Generates optimized full-size images for modal preview (1920px width)
 * 3. Creates a manifest.json with paths to both versions
 *
 * Usage: 
 *   npm install sharp
 *   node generate-photo-manifest.js
 */

const fs = require("fs");
const path = require("path");

// Try to import sharp, provide helpful error if not installed
let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  console.error("❌ Error: 'sharp' package is not installed");
  console.error("Please install it by running: npm install sharp");
  process.exit(1);
}

const PHOTO_DIR = path.join(__dirname, "assets", "photography");
const THUMBNAIL_DIR = path.join(PHOTO_DIR, "thumbnails");
const OPTIMIZED_DIR = path.join(PHOTO_DIR, "optimized");
const MANIFEST_PATH = path.join(PHOTO_DIR, "manifest.json");
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".bmp",
];

// Configuration
const THUMBNAIL_WIDTH = 800; // Width for grid display
const OPTIMIZED_WIDTH = 1920; // Width for modal preview
const QUALITY = 90; // JPEG quality (1-100)

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

async function optimizeImage(inputPath, outputPath, maxWidth) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Only resize if image is larger than maxWidth
    if (metadata.width > maxWidth) {
      await image
        .rotate() // Auto-rotate based on EXIF orientation
        .resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(outputPath);
    } else {
      // If smaller than maxWidth, just optimize quality
      await image
        .rotate() // Auto-rotate based on EXIF orientation
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(outputPath);
    }
    
    return true;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function generateManifest() {
  try {
    // Check if directory exists
    if (!fs.existsSync(PHOTO_DIR)) {
      console.error(`Error: Directory ${PHOTO_DIR} does not exist`);
      return;
    }

    // Create thumbnail and optimized directories if they don't exist
    if (!fs.existsSync(THUMBNAIL_DIR)) {
      fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
      console.log(`📁 Created thumbnails directory`);
    }
    if (!fs.existsSync(OPTIMIZED_DIR)) {
      fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
      console.log(`📁 Created optimized directory`);
    }

    // Read all files in the photography directory
    const files = fs.readdirSync(PHOTO_DIR);

    // Filter for image files only (exclude subdirectories)
    const imageFiles = files.filter((file) => {
      const filePath = path.join(PHOTO_DIR, file);
      const stats = fs.statSync(filePath);
      return stats.isFile() && isImageFile(file);
    });

    // Sort files alphabetically
    imageFiles.sort();

    console.log(`\n🔍 Found ${imageFiles.length} photos to process\n`);

    // Generate photo objects with optimized versions
    const photos = [];
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(PHOTO_DIR, file);
      const stats = fs.statSync(filePath);
      const parsedName = path.parse(file);
      
      // Generate output filenames
      const thumbnailFilename = `${parsedName.name}_thumb.jpg`;
      const optimizedFilename = `${parsedName.name}_optimized.jpg`;
      
      const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailFilename);
      const optimizedPath = path.join(OPTIMIZED_DIR, optimizedFilename);
      
      console.log(`📸 Processing ${i + 1}/${imageFiles.length}: ${file}`);
      
      // Generate thumbnail
      const thumbSuccess = await optimizeImage(filePath, thumbnailPath, THUMBNAIL_WIDTH);
      if (thumbSuccess) {
        console.log(`  ✅ Thumbnail created (${THUMBNAIL_WIDTH}px)`);
      }
      
      // Generate optimized full-size
      const optimizedSuccess = await optimizeImage(filePath, optimizedPath, OPTIMIZED_WIDTH);
      if (optimizedSuccess) {
        console.log(`  ✅ Optimized created (${OPTIMIZED_WIDTH}px)`);
      }
      
      // Get file sizes for comparison
      const thumbnailStats = fs.statSync(thumbnailPath);
      const optimizedStats = fs.statSync(optimizedPath);
      
      photos.push({
        original: `assets/photography/${file}`,
        thumbnail: `assets/photography/thumbnails/${thumbnailFilename}`,
        optimized: `assets/photography/optimized/${optimizedFilename}`,
        name: parsedName.name,
        filename: file,
        originalSize: stats.size,
        thumbnailSize: thumbnailStats.size,
        optimizedSize: optimizedStats.size,
        modified: stats.mtime.toISOString(),
        index: i,
      });
    }

    // Create manifest object
    const manifest = {
      generated: new Date().toISOString(),
      count: photos.length,
      config: {
        thumbnailWidth: THUMBNAIL_WIDTH,
        optimizedWidth: OPTIMIZED_WIDTH,
        quality: QUALITY
      },
      photos: photos,
    };

    // Write manifest to file
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

    console.log(`\n✅ Manifest generated successfully!`);
    console.log(`📸 Processed ${photos.length} photos`);
    console.log(`📄 Manifest saved to: ${MANIFEST_PATH}`);
    
    // Calculate total size savings
    const totalOriginal = photos.reduce((sum, p) => sum + p.originalSize, 0);
    const totalThumbnail = photos.reduce((sum, p) => sum + p.thumbnailSize, 0);
    const totalOptimized = photos.reduce((sum, p) => sum + p.optimizedSize, 0);
    
    console.log(`\n💾 Size Summary:`);
    console.log(`   Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Thumbnails total: ${(totalThumbnail / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Savings: ${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error("Error generating manifest:", error);
  }
}

// Run the generator
generateManifest();
