"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  async function logout() {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <header className="flex flex-wrap items-center gap-4 border-b bg-gray-50 px-4 py-3">
        <Link href="/campers" className="text-blue-600 hover:underline">
          Cataleg public
        </Link>
        <Link href="/admin/campers" className="font-medium text-gray-900 hover:underline">
          Models
        </Link>
        <Link href="/admin/users" className="font-medium text-gray-900 hover:underline">
          Usuaris
        </Link>
        <button
          type="button"
          onClick={logout}
          className="ml-auto rounded border border-red-200 bg-white px-3 py-1 text-sm text-red-700 hover:bg-red-50"
        >
          Tancar sessio
        </button>
      </header>
      <div className="mx-auto max-w-4xl p-4">{children}</div>
    </>
  );
}
