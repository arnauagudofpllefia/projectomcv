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
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Nom</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input className="mt-1 w-full rounded border px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Telefon (opcional)</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium">Missatge</label>
        <textarea className="mt-1 min-h-28 w-full rounded border px-3 py-2" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-emerald-700">Sollicitud enviada correctament.</p>}
      <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {saving ? "Enviant..." : "Enviar sollicitud"}
      </button>
    </form>
  );
}
