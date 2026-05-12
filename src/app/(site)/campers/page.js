import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CampersPage() {
  const campers = await prisma.camperModel.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Cataleg de campers</h1>
      {campers.length === 0 ? (
        <p className="text-slate-600">No hi ha models disponibles ara mateix.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {campers.map((camper) => (
            <li key={camper.id}>
              <Link
                href={`/campers/${camper.slug}`}
                className="block rounded-lg border bg-white p-4 shadow-sm hover:border-blue-300"
              >
                <h2 className="font-semibold text-slate-900">{camper.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{camper.shortDescription}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
                  <span>{camper.seats} places · {camper.beds} llits</span>
                  <span className="font-semibold text-blue-700">{camper.dailyPrice} EUR/dia</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}