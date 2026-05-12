import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CommentSection from "@/components/campers/comment-section";
import Image from "next/image";

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
      <article className="space-y-5 rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Fitxa de model</p>
        <h1 className="text-4xl font-bold text-white">{camper.name}</h1>
        {camper.imageUrl ? (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-cyan-100/20">
            <Image
              src={camper.imageUrl}
              alt={camper.name}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>
        ) : null}
        <p className="text-slate-300">{camper.description}</p>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <p className="text-slate-200"><span className="font-semibold text-cyan-200">Preu orientatiu:</span> {camper.dailyPrice} EUR/dia</p>
          <p className="text-slate-200"><span className="font-semibold text-cyan-200">Places:</span> {camper.seats}</p>
          <p className="text-slate-200"><span className="font-semibold text-cyan-200">Llits:</span> {camper.beds}</p>
          <p className="text-slate-200"><span className="font-semibold text-cyan-200">Transmissio:</span> {camper.transmission}</p>
          <p className="text-slate-200"><span className="font-semibold text-cyan-200">Combustible:</span> {camper.fuelType}</p>
        </div>
      </article>

      <CommentSection camperModelId={camper.id} initialComments={camper.comments} />
    </section>
  );
}