"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function uploadBlogImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error en pujar la imatge");

  return data.url;
}

export default function EditarArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await fetch(`/api/admin/posts/${id}`, { credentials: "include" });
      if (!res.ok) {
        setError("Article no trobat o sense permis");
        setLoading(false);
        return;
      }

      const post = await res.json();
      setSlug(post.slug);
      setTitle(post.title);
      setExcerpt(post.excerpt ?? "");
      setContent(post.content);
      setImageUrl(post.imageUrl ?? "");
      setLoading(false);
    })();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      let nextImage = imageUrl;
      if (file) nextImage = await uploadBlogImage(file);

      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          excerpt: excerpt.trim() || null,
          content,
          imageUrl: nextImage || null,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "No s'ha pogut actualitzar");
        setSaving(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err.message || "Error");
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-600">Carregant...</p>;

  return (
    <section className="space-y-4">
      <Link href="/admin/blog" className="text-sm text-blue-600 hover:underline">
        ← Tornar a la llista
      </Link>

      <h1 className="text-2xl font-bold">Editar article</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Titol</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Resum</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contingut</label>
          <textarea
            className="mt-1 min-h-40 w-full rounded border px-2 py-1 font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {imageUrl && !file && (
          <div className="relative aspect-video max-w-md overflow-hidden rounded border">
            <Image src={imageUrl} alt="Imatge actual" width={640} height={360} className="h-full w-full object-cover" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Nova imatge (opcional)</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="mt-1 w-full text-sm"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Desant..." : "Desar canvis"}
        </button>
      </form>
    </section>
  );
}
