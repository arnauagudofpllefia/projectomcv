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
  const passwordHash = bcrypt.hashSync("demo1234", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.local" },
    update: {
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@demo.local",
      passwordHash,
      role: "ADMIN",
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