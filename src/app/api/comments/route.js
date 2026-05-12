import { handleCreateComment } from "@/controllers/api/comments-controller";
import { requireAuthUser } from "@/lib/api-auth";

export async function POST(request) {
  const authResult = await requireAuthUser();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = await request.json();
  return handleCreateComment(body, authResult.user.id);
}
