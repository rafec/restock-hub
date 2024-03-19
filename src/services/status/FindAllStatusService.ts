import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllStatusService {
  async execute(client: PrismaClient = testPrisma) {
    const allStatus = await client.status.findMany();

    if (allStatus.length === 0) return "There is no status registered yet.";

    return allStatus;
  }
}

export { FindAllStatusService };
