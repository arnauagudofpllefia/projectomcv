"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/posts", { credentials: "include" });
    if (!res.ok) {
      setError("No s'han pogut carregar els articles");
      setPosts([]);
      setLoading(false);
      return;
    }

    setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      load();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  async function remove(id) {
    if (!confirm("Vols esborrar aquest article?")) return;

    const res = await fetch(`/api/admin/posts/${id}`, {
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
        <h1 className="text-2xl font-bold">Articles del blog</h1>
        <Link href="/admin/blog/nou" className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
          Nou article
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {posts.length === 0 ? (
        <p className="text-gray-600">No hi ha articles. Crea&apos;n un de nou.</p>
      ) : (
        <ul className="divide-y rounded-lg border bg-white">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-wrap items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{post.title}</p>
                <p className="truncate text-sm text-gray-500">/{post.slug}</p>
              </div>

              <Link href={`/admin/blog/${post.id}/editar`} className="rounded border px-2 py-1 text-sm hover:bg-gray-50">
                Editar
              </Link>

              <button
                type="button"
                onClick={() => remove(post.id)}
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
