const sharp = require('sharp');
const path = require('path');

async function processPortrait() {
  const input = path.resolve('client/public/assets/images/shahinur-cinematic-hero.jpg');
  const output = path.resolve('client/public/assets/images/shahinur-portrait-feathered.png');

  const width = 460;
  const height = 750;

  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="grad" cx="50%" cy="46%" r="48%">
          <stop offset="55%" stop-color="#fff" stop-opacity="1" />
          <stop offset="78%" stop-color="#fff" stop-opacity="0.8" />
          <stop offset="92%" stop-color="#fff" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
    </svg>
  `);

  await sharp(input)
    .extract({ left: 282, top: 115, width: 460, height: 750 })
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toFile(output);

  console.log('Feathered portrait created successfully!');
}

processPortrait().catch(console.error);
