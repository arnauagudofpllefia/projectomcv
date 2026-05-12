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

  if (loading) return <p className="text-gray-600">Carregant...</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Administracio d'usuaris i rols</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <ul className="divide-y rounded-lg border bg-white">
        {users.map((user) => (
          <li key={user.id} className="flex flex-wrap items-center gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{user.email}</p>
              <p className="text-xs text-slate-500">Rol actual: {user.role}</p>
            </div>
            <button className="rounded border px-2 py-1 text-sm hover:bg-slate-50" onClick={() => changeRole(user.id, "EDITOR")}>
              Fer EDITOR
            </button>
            <button className="rounded border px-2 py-1 text-sm hover:bg-slate-50" onClick={() => changeRole(user.id, "ADMIN")}>
              Fer ADMIN
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
