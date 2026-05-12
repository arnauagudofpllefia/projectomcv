"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditCamperPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await fetch(`/api/admin/models/${id}`, { credentials: "include" });
      if (!res.ok) {
        setError("Model no trobat o sense permis");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setForm({
        ...data,
        imageUrl: data.imageUrl || "",
      });
      setLoading(false);
    })();
  }, [id]);

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

    const res = await fetch(`/api/admin/models/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No s'ha pogut actualitzar");
      setSaving(false);
      return;
    }

    router.push("/admin/campers");
    router.refresh();
  }

  if (loading) return <p className="text-slate-600">Carregant...</p>;
  if (!form) return <p className="text-red-600">{error || "No disponible"}</p>;

  return (
    <section className="space-y-4">
      <Link href="/admin/campers" className="text-sm text-blue-600 hover:underline">← Tornar a la llista</Link>
      <h1 className="text-2xl font-bold">Editar model camper</h1>

      <form onSubmit={submit} className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
        <input className="w-full rounded border px-3 py-2" value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
        <input className="w-full rounded border px-3 py-2" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
        <input className="w-full rounded border px-3 py-2" value={form.shortDescription} onChange={(e) => setField("shortDescription", e.target.value)} required />
        <textarea className="min-h-28 w-full rounded border px-3 py-2" value={form.description} onChange={(e) => setField("description", e.target.value)} required />
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="rounded border px-3 py-2" type="number" min={1} value={form.dailyPrice} onChange={(e) => setField("dailyPrice", e.target.value)} required />
          <input className="rounded border px-3 py-2" type="number" min={1} value={form.seats} onChange={(e) => setField("seats", e.target.value)} required />
          <input className="rounded border px-3 py-2" type="number" min={1} value={form.beds} onChange={(e) => setField("beds", e.target.value)} required />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded border px-3 py-2" value={form.transmission} onChange={(e) => setField("transmission", e.target.value)} required />
          <input className="rounded border px-3 py-2" value={form.fuelType} onChange={(e) => setField("fuelType", e.target.value)} required />
        </div>
        <input className="w-full rounded border px-3 py-2" value={form.imageUrl} onChange={(e) => setField("imageUrl", e.target.value)} placeholder="URL imatge" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={Boolean(form.isPublished)} onChange={(e) => setField("isPublished", e.target.checked)} />
          Publicat
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
          {saving ? "Desant..." : "Desar canvis"}
        </button>
      </form>
    </section>
  );
}
