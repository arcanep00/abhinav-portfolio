import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-emeraldSoft">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 max-w-md text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md bg-emeraldSoft px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
        >
          Back to Home
        </Link>
      </div>
    </PageShell>
  );
}
