import { auth } from "@/auth";

export async function requireEditor() {
  const session = await auth();

  if (!session?.user) {
    return { error: "No autoritzat", status: 401 };
  }

  const role = session.user.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return { error: "Prohibit", status: 403 };
  }

  return { user: session.user };
}
