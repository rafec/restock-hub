import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllDemandsService {
  async execute(client: PrismaClient = testPrisma) {
    const allDemands = await client.demand.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (allDemands.length === 0) return "There is no demands registered yet.";

    return allDemands;
  }
}

export { FindAllDemandsService };
