"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setOk(false);
    setSaving(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No s'ha pogut enviar la sollicitud");
      setSaving(false);
      return;
    }

    setOk(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
      <div>
        <label className="block text-sm font-medium text-slate-200">Nom</label>
        <input className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200">Email</label>
        <input className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200">Telefon (opcional)</label>
        <input className="mt-1 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200">Missatge</label>
        <textarea className="mt-1 min-h-28 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-cyan-400/30 focus:ring" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-emerald-300">Sollicitud enviada correctament.</p>}
      <button type="submit" disabled={saving} className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50">
        {saving ? "Enviant..." : "Enviar sollicitud"}
      </button>
    </form>
  );
}
