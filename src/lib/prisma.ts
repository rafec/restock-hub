import { PrismaClient } from "../../prisma/main-database/generated/main-client";

const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;
