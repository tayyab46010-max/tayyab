import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section container-narrow text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-[var(--foreground)]/80">
        Page not found
      </p>
      <p className="mt-2 text-[var(--foreground)]/60">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Go home
      </Link>
    </section>
  );
}
