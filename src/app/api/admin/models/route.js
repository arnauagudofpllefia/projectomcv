import {
  handleListAdminCampers,
  handleCreateCamper,
} from "@/controllers/api/campers-controller";
import { requireEditor } from "@/lib/api-auth";

export async function GET() {
  const authResult = await requireEditor();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  return handleListAdminCampers();
}

export async function POST(request) {
  const authResult = await requireEditor();
  if (authResult.error) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = await request.json();
  return handleCreateCamper(body, authResult.user.id);
}
