import { handleGetCamperBySlug } from "@/controllers/api/campers-controller";

export async function GET(_request, context) {
  const { slug } = await context.params;
  return handleGetCamperBySlug(slug);
}
