import prisma from "lib/prisma";

class FindDemandService {
  async execute(id: string) {
    const demand = await prisma.demand.findUnique({
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
