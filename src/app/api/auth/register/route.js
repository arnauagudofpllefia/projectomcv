import { handleRegisterUser } from "@/controllers/api/users-controller";

export async function POST(request) {
  const body = await request.json();
  return handleRegisterUser(body);
}
