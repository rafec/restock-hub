import { PrismaClient } from "@prisma/client";

const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
  log: ["query"],
});

export default testPrisma;
