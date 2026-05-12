import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/api-auth";

export async function GET(_request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }

  const { id } = await context.params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "No trobat" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }

  const { id } = await context.params;
  const body = await request.json();

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "No s'ha pogut actualitzar" }, { status: 400 });
  }
}

export async function DELETE(_request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }

  const { id } = await context.params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No s'ha pogut esborrar" }, { status: 400 });
  }
}
