import Link from "next/link";

export default function SiteLayout({ children }) {
  return (
    <>
      <header className="border-b bg-white">
        <nav className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-4">
          <Link href="/" className="font-semibold text-slate-900">
            Serveis Informatics
          </Link>
          <Link href="/blog" className="text-slate-700 hover:text-slate-900">
            Blog
          </Link>
          <Link href="/admin/blog" className="text-slate-700 hover:text-slate-900">
            Admin
          </Link>
          <Link href="/login" className="ml-auto text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </>
  );
}
