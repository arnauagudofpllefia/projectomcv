"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credencials incorrectes");
      return;
    }

    let next = searchParams.get("callbackUrl") || "/admin/campers";
    if (!next.startsWith("/")) next = "/admin/campers";
    router.push(next);
    router.refresh();
  }

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-2xl border border-cyan-100/20 bg-slate-900/60 p-8 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Benvingut de nou</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Inicia sessio</h1>
        <p className="mt-4 text-slate-300">
          Accedeix al teu espai per gestionar reserves, comentaris i contingut del cataleg.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-200">
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Gestio centralitzada del backoffice</li>
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Control d&apos;acces per rols EDITOR i ADMIN</li>
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Sessio segura amb Auth.js</li>
        </ul>
      </article>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-6 shadow-[0_14px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-xl font-semibold text-white">Acces al compte</h2>
        <div>
          <label className="block text-sm font-medium text-slate-200">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">Contrasenya</label>
          <input
            className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400">
          Entrar
        </button>
        <p className="text-sm text-slate-300">
          Encara no tens compte? <Link href="/register" className="text-cyan-300 underline">Crea&apos;n un ara</Link>
        </p>
      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="p-4 text-gray-600">Carregant...</p>}>
      <LoginForm />
    </Suspense>
  );
}
