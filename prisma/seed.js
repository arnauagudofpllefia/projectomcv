import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.createMany({
    data: [
      {
        slug: "el-meu-primer-post",
        title: "El meu primer post",
        excerpt: "Introducció al blog.",
        content: "Aquest és el contingut complet del primer article.",
      },
      {
        slug: "nextjs-app-router",
        title: "Next.js App Router",
        excerpt: "Rutes i layouts.",
        content: "Aquí expliques com funciona l'App Router.",
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