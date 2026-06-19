const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, 'public', 'hero');

console.log('Checking if "sharp" is installed...');
try {
  require.resolve('sharp');
  console.log('"sharp" is already installed.');
} catch (e) {
  console.log('"sharp" not found. Installing locally...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

// Find all frame_*.png files
const files = fs.readdirSync(targetDir)
  .filter(file => file.startsWith('frame_') && file.endsWith('.png'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

console.log(`Found ${files.length} PNG frames in public/hero.`);

async function convertAll() {
  let count = 0;
  for (const file of files) {
    const pngPath = path.join(targetDir, file);
    const webpName = file.replace('.png', '.webp');
    const webpPath = path.join(targetDir, webpName);

    console.log(`[${++count}/${files.length}] Converting ${file} -> ${webpName}...`);
    
    try {
      await sharp(pngPath)
        .resize({ width: 1920, withoutEnlargement: true }) // standard 1080p width
        .webp({ quality: 80 }) // 80% quality is perfect balance
        .toFile(webpPath);
      
      // Delete original PNG to save space
      fs.unlinkSync(pngPath);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
  console.log('Conversion complete. All PNG files have been converted to WebP and removed.');
}

convertAll();
