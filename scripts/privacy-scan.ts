import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const SCAN_DIRS = ['app', 'components', 'content', 'lib', 'public'];

const PRIVACY_PATTERNS = [
  { name: 'phone number', regex: /(\+92\s*3\d{2}\s*\d{7}|\b03\d{2}\s*\d{7}\b)/g },
  { name: 'date of birth', regex: /\b(dob|date\s*of\s*birth|birth\s*date)\b/gi },
  { name: 'roll number', regex: /\b(roll\s*no|roll\s*number|enrolment|enrollment)\b/gi },
  { name: 'parent name', regex: /\b(s\/o|d\/o|son\s*of|daughter\s*of|father\s*name)\b/gi },
  { name: 'exam marks', regex: /\b(marks\s*obtained|total\s*marks|percentage)\b/gi },
];

const ALLOWED_PHONE_CONTEXTS = ['wa.me/', 'whatsapp'];
// Intentionally public contact details (shown on resume + contact pages by design).
const ALLOWED_PHONE_FILES = ['/content/profile.ts'];

let violations = 0;

function scanFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(ROOT, '').replace(/\\/g, '/');

  for (const pattern of PRIVACY_PATTERNS) {
    const matches = [...content.matchAll(pattern.regex)];
    for (const match of matches) {
      const lineStart = content.lastIndexOf('\n', match.index!) + 1;
      const lineEnd = content.indexOf('\n', match.index!);
      const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);

      const isAllowed =
        ALLOWED_PHONE_CONTEXTS.some((ctx) => line.toLowerCase().includes(ctx)) ||
        (pattern.name === 'phone number' && ALLOWED_PHONE_FILES.includes(relativePath));

      if (!isAllowed) {
        const lineNum = content.slice(0, match.index!).split('\n').length;
        console.error(
          `✗ Privacy violation: ${pattern.name} found at ${relativePath}:${lineNum}`
        );
        violations++;
      }
    }
  }
}

function scanDir(dir: string) {
  const fullDir = join(ROOT, dir);
  try {
    const entries = readdirSync(fullDir, { withFileTypes: true, recursive: true });
    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      if (entry.name.endsWith('.pdf')) continue;
      if (
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.tsx') ||
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.jsx') ||
        entry.name.endsWith('.json') ||
        entry.name.endsWith('.css') ||
        entry.name.endsWith('.html')
      ) {
        scanFile(join(entry.parentPath || fullDir, entry.name));
      }
    }
  } catch {
    // directory may not exist yet
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

if (violations > 0) {
  console.error(
    `\n✗ Privacy scan failed: ${violations} violation(s). Remove sensitive data before deploying.`
  );
  process.exit(1);
} else {
  console.log('✓ Privacy scan passed: no sensitive data found in static files.');
}
