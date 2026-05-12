"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CommentSection({ camperModelId, initialComments }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submitComment(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ camperModelId, content }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "No s'ha pogut crear el comentari");
      setSaving(false);
      return;
    }

    setComments((prev) => [data, ...prev]);
    setContent("");
    setSaving(false);
  }

  return (
    <section className="space-y-4 rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Comentaris</h2>

      {session?.user ? (
        <form onSubmit={submitComment} className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-28 w-full rounded border px-3 py-2 text-sm"
            placeholder="Comparteix la teva experiencia amb aquest model"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Enviant..." : "Publicar comentari"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-slate-600">
          Per publicar comentaris has d'iniciar sessio. <Link href="/login" className="text-blue-600 underline">Anar a login</Link>
        </p>
      )}

      <ul className="space-y-3">
        {comments.length === 0 ? (
          <li className="text-sm text-slate-500">Encara no hi ha comentaris.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="rounded border p-3">
              <p className="text-sm text-slate-800">{comment.content}</p>
              <p className="mt-1 text-xs text-slate-500">{comment.user.email}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
