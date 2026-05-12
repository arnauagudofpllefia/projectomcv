"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les contrasenyes no coincideixen");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No s'ha pogut crear el compte");
      setSaving(false);
      return;
    }

    router.push("/login");
  }

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-2xl border border-cyan-100/20 bg-slate-900/60 p-8 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Nou usuari</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Crea el teu compte</h1>
        <p className="mt-4 text-slate-300">
          Registra&apos;t per publicar comentaris, guardar preferencies i accedir a les funcionalitats del teu perfil.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-200">
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Procés de registre rapid i segur</li>
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Credencials protegides amb hash</li>
          <li className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">Acces instantani al portal de clients</li>
        </ul>
      </article>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-6 shadow-[0_14px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-xl font-semibold text-white">Alta de compte</h2>
        <div>
          <label className="block text-sm font-medium text-slate-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">Contrasenya</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">Repeteix contrasenya</label>
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
        >
          {saving ? "Creant..." : "Registrar"}
        </button>
        <p className="text-sm text-slate-300">
          Ja tens compte? <Link href="/login" className="text-cyan-300 underline">Inicia sessio</Link>
        </p>
      </form>
    </section>
  );
}
