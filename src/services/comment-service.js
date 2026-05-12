import { prisma } from "@/lib/prisma";

export async function listCommentsByCamperId(camperModelId) {
  return prisma.comment.findMany({
    where: { camperModelId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, email: true, role: true },
      },
    },
  });
}

export async function createComment(data) {
  return prisma.comment.create({
    data,
    include: {
      user: {
        select: { id: true, email: true, role: true },
      },
    },
  });
}
