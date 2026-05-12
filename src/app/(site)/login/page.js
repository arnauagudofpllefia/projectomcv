"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credencials incorrectes");
      return;
    }

    let next = searchParams.get("callbackUrl") || "/admin/blog";
    if (!next.startsWith("/")) next = "/admin/blog";
    router.push(next);
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Inici de sessio</h1>
      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contrasenya</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded bg-blue-600 px-3 py-2 text-white">
          Entrar
        </button>
      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="p-4 text-gray-600">Carregant...</p>}>
      <LoginForm />
    </Suspense>
  );
}
