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

  const camperSeeds = [
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
      imageUrl: "https://nomadaslife.es/wp-content/uploads/2023/07/Furgonetas-camper-de-lujo.jpg",
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
      imageUrl: "https://nomadaslife.es/wp-content/uploads/2023/07/Furgonetas-camper-de-lujo.jpg",
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
      imageUrl: "https://doncamper.es/wp-content/uploads/2022/08/que-es-una-furgoneta-camper-1200x600.jpg",
      isPublished: true,
      authorId: editor.id,
    },
    {
      slug: "glacier-pro-4x4",
      name: "Glacier Pro 4x4",
      shortDescription: "Preparada per rutes de muntanya i terreny exigent.",
      description:
        "Traccio integral, aillament premium i equipament complet per escapades de llarga distancia.",
      dailyPrice: 165,
      seats: 4,
      beds: 3,
      transmission: "Automatica",
      fuelType: "Diesel",
      imageUrl: "https://cdn.pixabay.com/photo/2017/04/25/16/00/mobile-home-2260094_1280.jpg",
      isPublished: true,
      authorId: admin.id,
    },
    {
      slug: "urban-weekender",
      name: "Urban Weekender",
      shortDescription: "Perfecta per city breaks i caps de setmana curts.",
      description:
        "Mida compacta, interior modulable i consum contingut per moure't comodament.",
      dailyPrice: 88,
      seats: 4,
      beds: 2,
      transmission: "Manual",
      fuelType: "Gasolina",
      imageUrl: "https://images.prismic.io/siestacampers/Z5JDV5bqstJ99yJF_siesta-sierra-1.webp?auto=format,compress",
      isPublished: true,
      authorId: editor.id,
    },
    {
      slug: "sunrise-lounge",
      name: "Sunrise Lounge",
      shortDescription: "Confort premium amb gran espai interior i acabats top.",
      description:
        "Llits amplis, cuina completa i zona lounge per viatges familiars amb maxima comoditat.",
      dailyPrice: 175,
      seats: 5,
      beds: 4,
      transmission: "Automatica",
      fuelType: "Diesel",
      imageUrl: "https://www.canalcar.es/build/images/comparador/camper.7667caf9.jpg",
      isPublished: true,
      authorId: admin.id,
    },
  ];

  for (const camper of camperSeeds) {
    await prisma.camperModel.upsert({
      where: { slug: camper.slug },
      update: camper,
      create: camper,
    });
  }

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