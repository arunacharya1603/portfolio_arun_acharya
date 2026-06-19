const fs = require('fs');
const path = require('path');

const heroDir = path.join(__dirname, 'public', 'hero');
const scrollstoryDir = path.join(__dirname, 'public', 'scrollstory');

console.log('Starting rename and merge of hero frames to scrollstory...');

let copiedCount = 0;

for (let i = 1; i <= 151; i++) {
  const heroNumStr = i.toString().padStart(3, '0');
  const sourceName = `ezgif-frame-${heroNumStr}.jpg`;
  const sourcePath = path.join(heroDir, sourceName);

  const scrollstoryIndex = i + 150;
  const targetNumStr = scrollstoryIndex.toString().padStart(3, '0');
  const targetName = `ezgif-frame-${targetNumStr}.jpg`;
  const targetPath = path.join(scrollstoryDir, targetName);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    copiedCount++;
  } else {
    console.warn(`Source file not found: ${sourceName}`);
  }
}

console.log(`Successfully renamed and merged ${copiedCount} files from public/hero to public/scrollstory.`);
