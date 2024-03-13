import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindDemandService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const demand = await client.demand.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!demand) {
      throw new Error("Demand not found.");
    }

    return demand;
  }
}

export { FindDemandService };
