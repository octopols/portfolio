#!/usr/bin/env node

/**
 * Photo Manifest Generator
 *
 * This script scans the assets/photography folder and generates a manifest.json
 * file containing all the photos found. This allows the photography page to
 * automatically display all photos without manual configuration.
 *
 * Usage: node generate-photo-manifest.js
 */

const fs = require("fs");
const path = require("path");

const PHOTO_DIR = path.join(__dirname, "assets", "photography");
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

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getImageDimensions(filePath) {
  // This is a placeholder - you could use a library like 'image-size' for actual dimensions
  return { width: 0, height: 0 };
}

function generateManifest() {
  try {
    // Check if directory exists
    if (!fs.existsSync(PHOTO_DIR)) {
      console.error(`Error: Directory ${PHOTO_DIR} does not exist`);
      return;
    }

    // Read all files in the photography directory
    const files = fs.readdirSync(PHOTO_DIR);

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const filePath = path.join(PHOTO_DIR, file);
      const stats = fs.statSync(filePath);
      return stats.isFile() && isImageFile(file);
    });

    // Sort files alphabetically
    imageFiles.sort();

    // Generate photo objects
    const photos = imageFiles.map((file, index) => {
      const filePath = path.join(PHOTO_DIR, file);
      const stats = fs.statSync(filePath);

      return {
        path: `assets/photography/${file}`,
        name: path.parse(file).name,
        filename: file,
        size: stats.size,
        modified: stats.mtime.toISOString(),
        index: index,
      };
    });

    // Create manifest object
    const manifest = {
      generated: new Date().toISOString(),
      count: photos.length,
      photos: photos,
    };

    // Write manifest to file
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

    console.log(`✅ Manifest generated successfully!`);
    console.log(`📸 Found ${photos.length} photos`);
    console.log(`📄 Manifest saved to: ${MANIFEST_PATH}`);

    if (photos.length > 0) {
      console.log(`\nPhotos found:`);
      photos.forEach((photo, i) => {
        console.log(`  ${i + 1}. ${photo.filename}`);
      });
    } else {
      console.log(`\n⚠️  No photos found in ${PHOTO_DIR}`);
      console.log(
        `   Add some images to the folder and run this script again.`
      );
    }
  } catch (error) {
    console.error("Error generating manifest:", error);
  }
}

// Run the generator
generateManifest();
