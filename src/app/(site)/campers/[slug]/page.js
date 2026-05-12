import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CommentSection from "@/components/campers/comment-section";

export const dynamic = "force-dynamic";

export default async function CamperDetailPage({ params }) {
  const { slug } = await params;

  const camper = await prisma.camperModel.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, email: true, role: true },
          },
        },
      },
    },
  });

  if (!camper || !camper.isPublished) notFound();

  return (
    <section className="space-y-6">
      <article className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-blue-600">Model camper</p>
        <h1 className="text-3xl font-bold text-slate-900">{camper.name}</h1>
        <p className="text-slate-700">{camper.description}</p>
        <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <p><span className="font-semibold">Preu orientatiu:</span> {camper.dailyPrice} EUR/dia</p>
          <p><span className="font-semibold">Places:</span> {camper.seats}</p>
          <p><span className="font-semibold">Llits:</span> {camper.beds}</p>
          <p><span className="font-semibold">Transmissio:</span> {camper.transmission}</p>
          <p><span className="font-semibold">Combustible:</span> {camper.fuelType}</p>
        </div>
      </article>

      <CommentSection camperModelId={camper.id} initialComments={camper.comments} />
    </section>
  );
}