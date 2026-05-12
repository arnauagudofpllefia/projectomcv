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
    <section className="space-y-4 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5">
      <h2 className="text-xl font-semibold text-white">Comentaris</h2>

      {session?.user ? (
        <form onSubmit={submitComment} className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-28 w-full rounded-lg border border-cyan-100/25 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400/30 focus:ring"
            placeholder="Comparteix la teva experiencia amb aquest model"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
          >
            {saving ? "Enviant..." : "Publicar comentari"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-slate-300">
          Per publicar comentaris has d&apos;iniciar sessio. <Link href="/login" className="text-cyan-300 underline">Anar a login</Link>
        </p>
      )}

      <ul className="space-y-3">
        {comments.length === 0 ? (
          <li className="text-sm text-slate-400">Encara no hi ha comentaris.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="rounded-lg border border-cyan-100/20 bg-slate-950/45 p-3">
              <p className="text-sm text-slate-200">{comment.content}</p>
              <p className="mt-1 text-xs text-slate-400">{comment.user.email}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
