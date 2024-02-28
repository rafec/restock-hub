import prisma from "lib/prisma";

class DeleteDemandService {
  async execute(id: string) {
    const demandExists = await prisma.demand.findUnique({ where: { id } });
    if (!demandExists) {
      throw new Error("Demand not found.");
    }

    if (!id) {
      throw new Error("The id informed is invalid.");
    }

    const deletedDemand = await prisma.demand.delete({ where: { id } });

    const demandAfterDeletion = await prisma.demand.findUnique({
      where: { id },
    });
    if (demandAfterDeletion) {
      throw new Error("Failed to delete demand.");
    }

    return deletedDemand;
  }
}

export { DeleteDemandService };
