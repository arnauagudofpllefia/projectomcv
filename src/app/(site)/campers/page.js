import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CampersPage() {
  const campers = await prisma.camperModel.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="space-y-8">
      <header className="rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Flota disponible</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Cataleg de campers</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Tria model segons places, comoditat i pressupost. Les dades i disponibilitat estan sincronitzades amb la base de dades.
        </p>
      </header>
      {campers.length === 0 ? (
        <p className="text-slate-300">No hi ha models disponibles ara mateix.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {campers.map((camper) => (
            <li key={camper.id}>
              <Link
                href={`/campers/${camper.slug}`}
                className="block rounded-2xl border border-cyan-100/20 bg-slate-900/65 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-cyan-300/45"
              >
                <h2 className="font-semibold text-slate-100">{camper.name}</h2>
                <p className="mt-1 text-sm text-slate-300">{camper.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                  <span>{camper.seats} places · {camper.beds} llits</span>
                  <span className="rounded bg-cyan-500/20 px-2 py-1 font-semibold text-cyan-200">{camper.dailyPrice} EUR/dia</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}