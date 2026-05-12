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

  if (loading) return <p className="text-gray-600">Carregant...</p>;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Gestio de models</h1>
        <Link href="/admin/campers/nou" className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
          Nou model
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {campers.length === 0 ? (
        <p className="text-gray-600">No hi ha models creats.</p>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {campers.map((camper) => (
            <li key={camper.id} className="flex flex-wrap items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{camper.name}</p>
                <p className="truncate text-sm text-gray-500">/{camper.slug} · {camper.dailyPrice} EUR/dia</p>
              </div>

              <Link href={`/admin/campers/${camper.id}/editar`} className="rounded border px-2 py-1 text-sm hover:bg-gray-50">
                Editar
              </Link>

              <button
                type="button"
                onClick={() => remove(camper.id)}
                className="rounded border border-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-50"
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
