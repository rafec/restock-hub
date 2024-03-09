import { PrismaClient } from "../../prisma/test-database/generated/test-client";

const testPrisma = new PrismaClient({
  log: ["query"],
});

export default testPrisma;
