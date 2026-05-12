import { handleListUsers } from "@/controllers/api/users-controller";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  return handleListUsers();
}
