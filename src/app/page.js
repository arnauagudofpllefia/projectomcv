import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Serveis Informatics
      </p>
      <h1 className="text-4xl font-bold text-slate-900">Web corporativa amb blog i backoffice</h1>
      <p className="max-w-2xl text-slate-600">
        Projecte Next.js 16 amb Prisma, PostgreSQL, autenticacio Auth.js, rols i CRUD d&apos;articles.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/blog" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Veure blog public
        </Link>
        <Link href="/admin/blog" className="rounded border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:bg-slate-50">
          Obrir panell admin
        </Link>
      </div>
    </main>
  );
}
