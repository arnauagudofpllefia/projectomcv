"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  function itemClass(href) {
    const isActive = pathname?.startsWith(href);
    if (isActive) {
      return "rounded-lg border border-cyan-300/40 bg-cyan-400/20 px-3 py-2 text-sm font-semibold text-cyan-100";
    }

    return "rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100";
  }

  async function logout() {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="mx-auto mt-5 w-full max-w-6xl rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-4 shadow-[0_22px_55px_rgba(0,0,0,0.4)] backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Backoffice</p>
            <h1 className="mt-2 text-2xl font-bold text-white">Panell d&apos;administracio</h1>
            <p className="mt-1 text-sm text-slate-300">Gestiona models, contingut i permisos des d&apos;un sol espai.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-red-300/40 bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/30"
          >
            Tancar sessio
          </button>
        </div>

        <nav className="mt-4 flex flex-wrap gap-2">
          <Link href="/campers" className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100">
            Veure cataleg public
          </Link>
          <Link href="/admin/campers" className={itemClass("/admin/campers")}>Models</Link>
          <Link href="/admin/users" className={itemClass("/admin/users")}>Usuaris</Link>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-1 py-5 sm:px-0">{children}</div>
    </div>
  );
}
