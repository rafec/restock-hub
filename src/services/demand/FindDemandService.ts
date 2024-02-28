import prisma from "lib/prisma";

class FindDemandService {
  async execute(id: string) {
    const demand = await prisma.demand.findUnique({ where: { id } });

    if (!demand) {
      throw new Error("Demand not found.");
    }

    return demand;
  }
}

export { FindDemandService };
