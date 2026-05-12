"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INITIAL = {
  slug: "",
  name: "",
  shortDescription: "",
  description: "",
  dailyPrice: 95,
  seats: 4,
  beds: 2,
  transmission: "Manual",
  fuelType: "Diesel",
  imageUrl: "",
  isPublished: true,
};

export default function NewCamperPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      dailyPrice: Number(form.dailyPrice),
      seats: Number(form.seats),
      beds: Number(form.beds),
      imageUrl: form.imageUrl || null,
    };

    const res = await fetch("/api/admin/models", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No s'ha pogut crear el model");
      setSaving(false);
      return;
    }

    router.push("/admin/campers");
    router.refresh();
  }

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
      <Link href="/admin/campers" className="inline-block text-sm text-cyan-300 hover:text-cyan-200 hover:underline">← Tornar a la llista</Link>
      <div>
        <h2 className="text-2xl font-bold text-white">Nou model camper</h2>
        <p className="text-sm text-slate-300">Defineix les caracteristiques comercials i de publicacio del nou model.</p>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-700/70 bg-slate-950/45 p-4">
        <input className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Slug" value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
        <input className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Nom" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
        <input className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Descripcio curta" value={form.shortDescription} onChange={(e) => setField("shortDescription", e.target.value)} required />
        <textarea className="min-h-28 w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Descripcio completa" value={form.description} onChange={(e) => setField("description", e.target.value)} required />
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" type="number" min={1} value={form.dailyPrice} onChange={(e) => setField("dailyPrice", e.target.value)} required />
          <input className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" type="number" min={1} value={form.seats} onChange={(e) => setField("seats", e.target.value)} required />
          <input className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" type="number" min={1} value={form.beds} onChange={(e) => setField("beds", e.target.value)} required />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Transmissio" value={form.transmission} onChange={(e) => setField("transmission", e.target.value)} required />
          <input className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="Combustible" value={form.fuelType} onChange={(e) => setField("fuelType", e.target.value)} required />
        </div>
        <input className="w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" placeholder="URL imatge (opcional)" value={form.imageUrl} onChange={(e) => setField("imageUrl", e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setField("isPublished", e.target.checked)} />
          Publicat
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={saving} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
          {saving ? "Desant..." : "Crear model"}
        </button>
      </form>
    </section>
  );
}
