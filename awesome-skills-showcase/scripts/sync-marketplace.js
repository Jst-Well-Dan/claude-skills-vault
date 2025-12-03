import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFile = join(__dirname, '../../.claude-plugin/marketplace.json');
const targetFile = join(__dirname, '../src/marketplace.json');

try {
  mkdirSync(dirname(targetFile), { recursive: true });
  copyFileSync(sourceFile, targetFile);
  console.log('✅ marketplace.json synced successfully');
} catch (error) {
  console.error('❌ Failed to sync marketplace.json:', error.message);
  process.exit(1);
}
