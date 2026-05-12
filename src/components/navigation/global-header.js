import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-100/20 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-wide text-cyan-200">
          CamperCat
        </Link>
        <Link href="/campers" className="text-sm text-slate-200/80 hover:text-cyan-200">
          Models
        </Link>
        <Link href="/#contacte" className="text-sm text-slate-200/80 hover:text-cyan-200">
          Contacte
        </Link>
        <Link href="/admin/campers" className="text-sm text-slate-200/80 hover:text-cyan-200">
          Admin
        </Link>
        <Link href="/register" className="text-sm text-slate-200/80 hover:text-cyan-200">
          Registre
        </Link>
        <Link
          href="/login"
          className="ml-auto rounded-md bg-cyan-500/20 px-3 py-1.5 text-sm font-medium text-cyan-200 hover:bg-cyan-500/30"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
