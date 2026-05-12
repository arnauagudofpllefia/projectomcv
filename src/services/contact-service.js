import { prisma } from "@/lib/prisma";

export async function createContactRequest(data) {
  return prisma.contactRequest.create({ data });
}
