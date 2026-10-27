# tayyab.co

Personal portfolio website of Tayyab Ali — software engineering student, business development.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, three.js, and Motion.

## Quick start

```bash
# Install pnpm (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Approve esbuild build scripts (first time only)
pnpm approve-builds esbuild

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | For contact form | Resend API key for sending emails |
| `TURNSTILE_SECRET_KEY` | For contact form | Cloudflare Turnstile secret key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | For contact form | Cloudflare Turnstile site key |
| `NEXT_PUBLIC_SITE_URL` | No (defaults to https://tayyab.co) | Site URL for canonical and OG |

## Adding a certificate

1. Open `content/certificates.ts`
2. Add a new entry to the `certificates` array:
   ```ts
   {
     title: 'Certificate Name',
     issuer: 'Issuing Organization',
     date: '2026-01-15',
     id: 'CERT-ID-HERE',           // optional
     domain: 'software',            // software | data | design | marketing | office | communication
     verifyUrl: 'https://...',      // optional — only if printed on the certificate
   }
   ```
3. (Optional) Add a WebP thumbnail (< 80 KB) to `public/certificates/` and reference it as `thumbnail: '/certificates/filename.webp'`
4. Run `pnpm build` — the certificate count updates automatically

## Adding a project

1. Open `content/projects.ts`
2. Add a new entry:
   ```ts
   {
     slug: 'project-name',          // lowercase, hyphens only
     title: 'Project Name',
     tagline: 'One-line description.',
     status: 'in-development',      // shipped | in-development | planned | archived
     problem: 'What problem does this solve?',
     role: 'Your role.',
     stack: ['TypeScript', 'React'],
     whatShipped: ['Feature 1', 'Feature 2'],
     whatLearned: ['Lesson 1'],
     demoUrl: 'https://...',        // optional
     repoUrl: 'https://...',        // optional
     featured: false,               // set true to show on home page
   }
   ```
3. A page is auto-generated at `/projects/project-name`

## Build and deploy

```bash
# Production build (runs content validation, TODO check, privacy scan)
pnpm build

# Start production server
pnpm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Custom domain

1. Add domain in Vercel dashboard → Settings → Domains
2. Set `NEXT_PUBLIC_SITE_URL` env var to your domain
3. Update `metadataBase` in `app/layout.tsx`

## Testing

```bash
# E2E tests (requires dev server running)
pnpm test

# Accessibility tests only
pnpm test:a11y

# Lighthouse CI
pnpm test:lighthouse
```

## Build-time guards

The production build fails if:
- Any `TODO(owner)` marker remains in the codebase
- Content fails Zod validation
- Privacy scan finds sensitive data (phone in static HTML, DOB, roll numbers, parent names)

## Project structure

```
app/                    Next.js App Router pages
  layout.tsx            Root layout (fonts, theme, nav, footer)
  page.tsx              Home page
  sitemap.ts            Auto-generated sitemap
  robots.ts             Robots.txt
  manifest.ts           Web manifest
  [route]/page.tsx      Route pages
components/             React components
content/                Typed content files (source of truth)
  schemas/              Zod schemas
  profile.ts            Profile data
  certificates.ts       All 22 certificates
  projects.ts           Projects
  experiences.ts        Work experience
  education.ts          Education
lib/                    Utilities
scripts/                Build-time validation scripts
tests/                  Playwright E2E tests
```

## Content integrity

- Every number and claim on the site traces to `content/` data
- No fabricated metrics, testimonials, or endorsements
- Certificate verification links only where printed on the certificate
- No company or university logos (text names only)
- Phone number shown only as WhatsApp button + click-to-reveal
