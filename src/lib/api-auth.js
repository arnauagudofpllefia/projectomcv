import { auth } from "@/auth";

export async function requireAuthUser() {
  const session = await auth();

  if (!session?.user) {
    return { error: "No autoritzat", status: 401 };
  }

  return { user: session.user };
}

export async function requireEditor() {
  const authResult = await requireAuthUser();
  if (authResult.error) return authResult;

  const role = authResult.user.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return { error: "Prohibit", status: 403 };
  }

  return { user: authResult.user };
}

export async function requireAdmin() {
  const authResult = await requireAuthUser();
  if (authResult.error) return authResult;

  if (authResult.user.role !== "ADMIN") {
    return { error: "Nomes ADMIN", status: 403 };
  }

  return { user: authResult.user };
}
