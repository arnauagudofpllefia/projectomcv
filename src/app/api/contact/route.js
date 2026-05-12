import { handleCreateContact } from "@/controllers/api/contacts-controller";

export async function POST(request) {
  const body = await request.json();
  return handleCreateContact(body);
}
