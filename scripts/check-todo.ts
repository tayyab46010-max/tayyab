import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const SCAN_DIRS = ['app', 'components', 'content', 'lib'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css'];

const TODO_PATTERN = /TODO\(owner\)/g;
let found = false;

function scanFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(TODO_PATTERN);
    if (match) {
      console.error(
        `✗ TODO(owner) found at ${filePath}:${i + 1} — "${lines[i].trim()}"`
      );
      found = true;
    }
  }
}

function scanDir(dir: string) {
  const fullDir = join(ROOT, dir);
  try {
    const entries = readdirSync(fullDir, { withFileTypes: true, recursive: true });
    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      const ext = EXTENSIONS.find((e) => entry.name.endsWith(e));
      if (!ext) continue;
      scanFile(join(entry.parentPath || fullDir, entry.name));
    }
  } catch {
    // directory may not exist yet
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

if (found) {
  console.error('\n✗ Build blocked: resolve all TODO(owner) markers before deploying.');
  process.exit(1);
} else {
  console.log('✓ No TODO(owner) markers found.');
}
