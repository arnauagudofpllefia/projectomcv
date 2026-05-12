import { handleUpdateUserRole } from "@/controllers/api/users-controller";
import { requireAdmin } from "@/lib/api-auth";

export async function PATCH(request, context) {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await context.params;
  const body = await request.json();

  return handleUpdateUserRole(id, body.role);
}
