"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCampersPage() {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    const res = await fetch("/api/admin/models", { credentials: "include" });

    if (!res.ok) {
      setError("No s'han pogut carregar els models");
      setCampers([]);
      setLoading(false);
      return;
    }

    const data = await res.json();
    setCampers(data);
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      load();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  async function remove(id) {
    if (!confirm("Vols esborrar aquest model?")) return;

    const res = await fetch(`/api/admin/models/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("No s'ha pogut esborrar");
      return;
    }

    load();
  }

  if (loading) return <p className="text-slate-300">Carregant...</p>;

  return (
    <section className="space-y-5 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestio de models</h2>
          <p className="text-sm text-slate-300">Administra publicacio, preus i fitxa comercial dels campers.</p>
        </div>
        <Link href="/admin/campers/nou" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Nou model
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {campers.length === 0 ? (
        <p className="rounded-xl border border-slate-700/70 bg-slate-950/40 p-4 text-slate-300">No hi ha models creats.</p>
      ) : (
        <ul className="space-y-3">
          {campers.map((camper) => (
            <li key={camper.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-950/45 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-100">{camper.name}</p>
                <p className="truncate text-sm text-slate-400">/{camper.slug} · {camper.dailyPrice} EUR/dia</p>
              </div>

              <Link href={`/admin/campers/${camper.id}/editar`} className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">
                Editar
              </Link>

              <button
                type="button"
                onClick={() => remove(camper.id)}
                className="rounded-lg border border-red-300/40 px-3 py-1.5 text-sm text-red-200 transition hover:bg-red-500/15"
              >
                Esborrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
