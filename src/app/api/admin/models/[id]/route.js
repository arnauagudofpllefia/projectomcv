import {
  handleGetCamperById,
  handleUpdateCamper,
  handleDeleteCamper,
} from "@/controllers/api/campers-controller";
import { requireEditor } from "@/lib/api-auth";

export async function GET(_request, context) {
  const authResult = await requireEditor();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await context.params;
  return handleGetCamperById(id);
}

export async function PATCH(request, context) {
  const authResult = await requireEditor();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await context.params;
  const body = await request.json();
  return handleUpdateCamper(id, body);
}

export async function DELETE(_request, context) {
  const authResult = await requireEditor();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await context.params;
  return handleDeleteCamper(id);
}
