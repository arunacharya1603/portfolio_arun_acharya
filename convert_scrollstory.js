const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, 'public', 'scrollstory');

console.log('Checking if "sharp" is installed...');
try {
  require.resolve('sharp');
  console.log('"sharp" is already installed.');
} catch (e) {
  console.log('"sharp" not found. Installing locally...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

// Find all ezgif-frame-*.jpg files
const files = fs.readdirSync(targetDir)
  .filter(file => file.startsWith('ezgif-frame-') && file.endsWith('.jpg'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

console.log(`Found ${files.length} JPEG frames in public/scrollstory.`);

async function convertAll() {
  let count = 0;
  for (const file of files) {
    const jpgPath = path.join(targetDir, file);
    const webpName = file.replace('.jpg', '.webp');
    const webpPath = path.join(targetDir, webpName);

    console.log(`[${++count}/${files.length}] Converting ${file} -> ${webpName}...`);
    
    try {
      await sharp(jpgPath)
        .resize({ width: 1920, withoutEnlargement: true }) // standard 1080p width
        .webp({ quality: 50 }) // 80% quality is perfect balance
        .toFile(webpPath);
      
      // Delete original JPG to save space
      fs.unlinkSync(jpgPath);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }
  console.log('Conversion complete. All JPEG files in public/scrollstory have been converted to WebP.');
}

convertAll();
