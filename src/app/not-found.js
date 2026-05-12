import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">No trobat</h1>
      <p className="text-slate-600">La pagina o l&apos;article que busques no existeix.</p>
      <Link href="/blog" className="inline-flex rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
        Tornar al blog
      </Link>
    </section>
  );
}
