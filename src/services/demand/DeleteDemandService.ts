import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteDemandService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const demandExists = await client.demand.findUnique({ where: { id } });
    if (!demandExists) {
      throw new Error("Demand not found.");
    }

    const deletedDemand = await client.demand.delete({ where: { id } });

    const demandAfterDeletion = await client.demand.findUnique({
      where: { id },
    });
    if (demandAfterDeletion) {
      throw new Error("Failed to delete demand.");
    }

    return deletedDemand;
  }
}

export { DeleteDemandService };
