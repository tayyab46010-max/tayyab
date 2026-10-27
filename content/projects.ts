import type { Project } from './schemas/project.schema';

export const projects: Project[] = [
  {
    slug: 'tayyabgpt',
    title: 'TayyabGPT',
    tagline: 'A multi-provider AI chat workspace.',
    status: 'in-development',
    problem:
      'Switching between AI providers (OpenAI, Anthropic, Gemini, local Ollama) means juggling separate interfaces, losing conversation context, and having no unified view of outputs.',
    role: 'Solo developer — designing and building the full stack.',
    stack: ['TypeScript', 'React', 'Next.js'],
    whatShipped: [
      'Planned architecture for multi-provider model switching',
      'Conversation branching design',
      'Artifacts side-panel concept',
      'File attachment workflow',
    ],
    whatLearned: [
      'Evaluating trade-offs between provider APIs and local model latency',
      'Designing a UI that stays calm when the underlying model changes',
    ],
    featured: true,
  },
  {
    slug: 'shagaf-gents-saloon',
    title: 'Shagaf Gents Saloon',
    tagline: 'A modern brand website and booking experience for a premium gents salon.',
    status: 'shipped',
    problem:
      'A local gents salon had no digital presence — customers could not browse services, see the space, or book an appointment without calling. The goal was a fast, polished site that turns interest into bookings and gives the brand a premium first impression.',
    role: 'Solo developer & designer — visual direction, responsive build, and deployment.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    whatShipped: [
      'Responsive, animated marketing site with a premium first impression',
      'Service showcase and clear appointment call-to-action flow',
      'Mobile-first layouts tuned for fast loading on local networks',
      'Production deployment with a custom live domain on Vercel',
    ],
    whatLearned: [
      'Designing for a real local business rather than a portfolio-only audience',
      'Balancing rich motion with fast, accessible mobile performance',
    ],
    demoUrl: 'https://shagaf-gents-saloon.vercel.app/',
    featured: false,
  },
  {
    slug: 'point-of-sale',
    title: 'Point of Sale System',
    tagline: 'A lightweight POS system for small retail businesses.',
    status: 'in-development',
    problem:
      'Small retail shops needed a simple, fast point-of-sale system to track sales, manage inventory, and generate receipts without complex setup or expensive software licenses.',
    role: 'Solo developer — full-stack implementation and UI design.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
    whatShipped: [
      'Product catalog with barcode scanning support',
      'Real-time cart management and checkout flow',
      'Sales history and daily revenue reports',
      'Inventory tracking with low-stock alerts',
      'Print-ready receipt generation',
    ],
    whatLearned: [
      'Building responsive UIs with vanilla HTML/CSS/JS',
      'Server-side logic with PHP and MySQL on XAMPP',
      'Designing for speed and simplicity in retail environments',
    ],
    featured: false,
  },
  {
    slug: 'erp-system',
    title: 'ERP System',
    tagline: 'An integrated enterprise resource planning system for business management.',
    status: 'in-development',
    problem:
      'Small to medium businesses needed a unified system to manage multiple departments — sales, inventory, HR, and finance — without juggling separate tools or spreadsheets.',
    role: 'Solo developer — architecture, database design, and full-stack implementation.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
    whatShipped: [
      'Multi-module dashboard with role-based access control',
      'Inventory management with stock tracking and reorder points',
      'Sales and purchase order management',
      'Employee records and attendance tracking',
      'Financial reports and expense tracking',
      'Data export to CSV and PDF',
    ],
    whatLearned: [
      'Designing relational database schemas for complex business logic',
      'Building modular PHP applications with clean separation of concerns',
      'Creating intuitive interfaces for non-technical users',
    ],
    featured: false,
  },
  {
    slug: 'portfolio-website',
    title: 'tayyab.co — Personal Portfolio',
    tagline: 'A glassmorphic portfolio with an interactive, verifiable certificate vault.',
    status: 'shipped',
    problem:
      'Static PDF resumes make claims hard to verify and give recruiters no sense of how a candidate actually works. The goal was a single place where every skill is backed by a checkable certificate and the site itself demonstrates front-end craft.',
    role: 'Solo developer — design, content architecture, and implementation.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    whatShipped: [
      'Interactive certificate vault with filtering and third-party verification links',
      'Dual light/dark themes with animated transitions and switchable accent colors',
      'Scroll-driven motion system (reveals, marquees, animated counters)',
      'SEO primitives: JSON-LD, sitemap, Open Graph, semantic landmarks',
    ],
    whatLearned: [
      'Designing motion that guides attention without hurting accessibility',
      'Structuring content as validated data (Zod schemas) instead of hardcoded JSX',
    ],
    featured: false,
  },
];
