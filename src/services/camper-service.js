import { prisma } from "@/lib/prisma";

export async function listPublishedCampers() {
  return prisma.camperModel.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function listAllCampers() {
  return prisma.camperModel.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getCamperBySlug(slug) {
  return prisma.camperModel.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, email: true, role: true },
          },
        },
      },
    },
  });
}

export async function getCamperById(id) {
  return prisma.camperModel.findUnique({ where: { id } });
}

export async function createCamper(data) {
  return prisma.camperModel.create({ data });
}

export async function updateCamper(id, data) {
  return prisma.camperModel.update({
    where: { id },
    data,
  });
}

export async function deleteCamper(id) {
  return prisma.camperModel.delete({ where: { id } });
}
