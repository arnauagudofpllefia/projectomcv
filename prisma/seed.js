import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPasswordHash = bcrypt.hashSync("demo1234", 10);
  const editorPasswordHash = bcrypt.hashSync("editor1234", 10);
  const userPasswordHash = bcrypt.hashSync("user1234", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.local" },
    update: {
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@demo.local",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@demo.local" },
    update: {
      passwordHash: editorPasswordHash,
      role: "EDITOR",
    },
    create: {
      email: "editor@demo.local",
      passwordHash: editorPasswordHash,
      role: "EDITOR",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@demo.local" },
    update: {
      passwordHash: userPasswordHash,
      role: "EDITOR",
    },
    create: {
      email: "user@demo.local",
      passwordHash: userPasswordHash,
      role: "EDITOR",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        slug: "el-meu-primer-post",
        title: "El meu primer post",
        excerpt: "Introducció al blog.",
        content: "Aquest és el contingut complet del primer article.",
        imageUrl: null,
        authorId: admin.id,
      },
      {
        slug: "nextjs-app-router",
        title: "Next.js App Router",
        excerpt: "Rutes i layouts.",
        content: "Aquí expliques com funciona l'App Router.",
        imageUrl: null,
        authorId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.camperModel.createMany({
    data: [
      {
        slug: "atlas-nomad",
        name: "Atlas Nomad",
        shortDescription: "Camper compacta ideal per a escapades de cap de setmana.",
        description:
          "Model agile i facil de conduir, amb llit doble, cuina integrada i espai de maleter modular.",
        dailyPrice: 95,
        seats: 4,
        beds: 2,
        transmission: "Manual",
        fuelType: "Diesel",
        imageUrl: null,
        isPublished: true,
        authorId: editor.id,
      },
      {
        slug: "sierra-family-xl",
        name: "Sierra Family XL",
        shortDescription: "Pensada per families amb gran capacitat i confort.",
        description:
          "Inclou quatre places per dormir, taula interior, nevera gran i calefaccio estacionaria.",
        dailyPrice: 145,
        seats: 5,
        beds: 4,
        transmission: "Automatica",
        fuelType: "Diesel",
        imageUrl: null,
        isPublished: true,
        authorId: admin.id,
      },
      {
        slug: "coastal-easy",
        name: "Coastal Easy",
        shortDescription: "Opcio economica per a rutes costaneres i viatges curts.",
        description:
          "Camper versatil amb dos llits, connexio USB, tendal exterior i consum ajustat.",
        dailyPrice: 79,
        seats: 4,
        beds: 2,
        transmission: "Manual",
        fuelType: "Gasolina",
        imageUrl: null,
        isPublished: true,
        authorId: editor.id,
      },
    ],
    skipDuplicates: true,
  });

  const atlas = await prisma.camperModel.findUnique({ where: { slug: "atlas-nomad" } });
  const sierra = await prisma.camperModel.findUnique({ where: { slug: "sierra-family-xl" } });

  if (atlas && sierra) {
    await prisma.comment.createMany({
      data: [
        {
          camperModelId: atlas.id,
          userId: user.id,
          content: "Ens va anar perfecte per una ruta pel Pirineu. Molt recomanable.",
        },
        {
          camperModelId: sierra.id,
          userId: editor.id,
          content: "Molt comoda per viatjar amb nens, espai interior excel lent.",
        },
      ],
      skipDuplicates: true,
    });
  }

  await prisma.contactRequest.createMany({
    data: [
      {
        name: "Laura Pons",
        email: "laura.pons@example.com",
        phone: "+34 600 111 222",
        message: "Hola, voldria disponibilitat per la primera setmana d'agost.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });