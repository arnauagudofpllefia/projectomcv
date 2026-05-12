"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    const res = await fetch("/api/admin/users", { credentials: "include" });

    if (!res.ok) {
      setError("No tens permisos per gestionar usuaris");
      setUsers([]);
      setLoading(false);
      return;
    }

    setUsers(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      load();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  async function changeRole(userId, role) {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      alert("No s'ha pogut actualitzar el rol");
      return;
    }

    load();
  }

  if (loading) return <p className="text-slate-300">Carregant...</p>;

  return (
    <section className="space-y-5 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
      <div>
        <h2 className="text-2xl font-bold text-white">Administracio d&apos;usuaris i rols</h2>
        <p className="text-sm text-slate-300">Defineix permisos per garantir l&apos;acces correcte a cada area.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-950/45 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-100">{user.email}</p>
              <p className="text-xs text-slate-400">Rol actual: {user.role}</p>
            </div>
            <button className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100" onClick={() => changeRole(user.id, "EDITOR")}>
              Fer EDITOR
            </button>
            <button className="rounded-lg border border-cyan-300/30 bg-cyan-500/15 px-3 py-1.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/25" onClick={() => changeRole(user.id, "ADMIN")}>
              Fer ADMIN
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
