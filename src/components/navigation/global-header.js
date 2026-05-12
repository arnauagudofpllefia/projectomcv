import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-wide text-slate-900">
          CamperCat
        </Link>
        <Link href="/campers" className="text-sm text-slate-600 hover:text-slate-900">
          Models
        </Link>
        <Link href="/#contacte" className="text-sm text-slate-600 hover:text-slate-900">
          Contacte
        </Link>
        <Link href="/admin/campers" className="text-sm text-slate-600 hover:text-slate-900">
          Admin
        </Link>
        <Link href="/register" className="text-sm text-slate-600 hover:text-slate-900">
          Registre
        </Link>
        <Link
          href="/login"
          className="ml-auto rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
