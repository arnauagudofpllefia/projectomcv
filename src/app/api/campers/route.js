import { handleListPublicCampers } from "@/controllers/api/campers-controller";

export async function GET() {
  return handleListPublicCampers();
}
