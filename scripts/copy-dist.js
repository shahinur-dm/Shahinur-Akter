import fs from 'fs';
import path from 'path';

const src = path.resolve('client/dist');
const dest = path.resolve('dist');

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('✅ Successfully synced client/dist -> dist/');
} else {
  console.warn('⚠️ Warning: client/dist does not exist.');
}
