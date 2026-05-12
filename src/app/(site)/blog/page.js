import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-slate-600">Encara no hi ha articles. Executa el seed o crea&apos;n des de Prisma Studio.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-lg border bg-white p-4 shadow-sm hover:border-blue-300"
              >
                <h2 className="font-semibold text-slate-900">{post.title}</h2>

                {post.excerpt && <p className="mt-1 text-sm text-slate-600">{post.excerpt}</p>}

                {post.imageUrl ? (
                  <div className="relative mt-3 aspect-video w-full overflow-hidden rounded">
                    <Image
                      src={post.imageUrl}
                      alt="Imatge de l'article"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
