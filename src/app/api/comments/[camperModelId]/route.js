import { handleListComments } from "@/controllers/api/comments-controller";

export async function GET(_request, context) {
  const { camperModelId } = await context.params;
  return handleListComments(camperModelId);
}
