export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)]" aria-busy="true" aria-label="Loading">
      {/* Nav skeleton */}
      <header className="border-b border-[var(--border)]">
        <div className="container-wide flex items-center justify-between py-4">
          <div className="h-6 w-24 animate-pulse rounded bg-[var(--surface)]" />
          <div className="flex gap-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-[var(--surface)]" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-[var(--surface)]" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-[var(--surface)]" />
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="container-wide py-12">
        <div className="space-y-6">
          <div className="h-4 w-32 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-12 w-1/2 animate-pulse rounded bg-[var(--surface)]" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full animate-pulse rounded bg-[var(--surface)]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--surface)]" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-[var(--surface)]" />
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4 rounded-xl border border-[var(--border)] p-6">
              <div className="h-40 animate-pulse rounded-lg bg-[var(--surface)]" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--surface)]" />
              <div className="h-3 w-full animate-pulse rounded bg-[var(--surface)]" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-[var(--surface)]" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
