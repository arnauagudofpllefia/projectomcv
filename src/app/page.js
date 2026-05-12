import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-6 py-12">
      <section className="rounded-2xl border bg-gradient-to-br from-blue-50 to-slate-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">CamperCat</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-slate-900">Lloguer de furgonetes camper per viure rutes amb llibertat</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Flota actualitzada, reserva flexible i assessorament personalitzat per trobar el model que millor encaixa amb el teu viatge.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/campers" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Veure cataleg
          </Link>
          <Link href="/admin/campers" className="rounded border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:bg-slate-50">
            Panell de gestio
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Flota revisada</h2>
          <p className="mt-2 text-sm text-slate-600">Models equipats i revisats abans de cada sortida.</p>
        </article>
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Assistencia de ruta</h2>
          <p className="mt-2 text-sm text-slate-600">Suport per telefon i recomanacions per cada itinerari.</p>
        </article>
        <article className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-slate-900">Preus transparents</h2>
          <p className="mt-2 text-sm text-slate-600">Tarifes clares per dia amb extres opcionals.</p>
        </article>
      </section>

      <section id="contacte" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Solicita informacio</h2>
        <p className="text-slate-600">Explica&apos;ns dates i necessitats. Et respondrem amb proposta personalitzada.</p>
        <ContactForm />
      </section>
    </main>
  );
}
