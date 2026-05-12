import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await prisma.camperModel.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 py-10">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100/20 bg-slate-900/70 p-10 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(2,8,23,0.95) 15%, rgba(2,8,23,0.55) 58%, rgba(8,47,73,0.25) 100%), url('https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">VanLife Rentals</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-white">
          La teva aventura comenca aqui
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-200">
          Furgonetes camper totalment equipades per viure experiencies inoblidables amb una reserva clara i suport real 24/7.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/campers" className="rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-cyan-400">
            Descobreix els models
          </Link>
          <Link href="/#contacte" className="rounded-lg border border-slate-200/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">
            Demanar informacio
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Flota verificada", d: "Vehicles revisats abans de cada entrega." },
          { t: "Assistencia humana", d: "Suport local 24/7 i resolucio immediata." },
          { t: "Reserva transparent", d: "Preu per dia clar i condicions simples." },
        ].map((item) => (
          <article key={item.t} className="rounded-2xl border border-cyan-100/20 bg-slate-900/60 p-5 shadow-sm">
            <h2 className="font-semibold text-cyan-200">{item.t}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.d}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <article className="rounded-2xl border border-cyan-100/20 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Models destacats</h2>
            <Link href="/campers" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Veure tot el cataleg
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {featured.map((camper) => (
              <li key={camper.id}>
                <Link href={`/campers/${camper.slug}`} className="block rounded-xl border border-cyan-100/20 bg-slate-950/45 p-4 hover:border-cyan-300/45">
                  {camper.imageUrl ? (
                    <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src={camper.imageUrl} alt={camper.name} fill className="object-cover" />
                    </div>
                  ) : null}
                  <h3 className="font-semibold text-slate-100">{camper.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{camper.shortDescription}</p>
                  <p className="mt-3 text-sm font-semibold text-cyan-300">{camper.dailyPrice} EUR / dia</p>
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <section id="contacte" className="space-y-4 rounded-2xl border border-cyan-100/20 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">Reserva la teva furgoneta</h2>
          <p className="text-slate-300">Envia una sollicitud i et respondrem amb disponibilitat real en menys de 24 h.</p>
          <ContactForm />
        </section>
      </section>
    </main>
  );
}
