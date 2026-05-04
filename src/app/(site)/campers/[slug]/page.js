import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  return (
    <article className="space-y-4">
      <p className="text-sm uppercase tracking-wide text-blue-600">Blog</p>
      <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
      <p className="text-slate-600">{post.content}</p>
    </article>
  );
}