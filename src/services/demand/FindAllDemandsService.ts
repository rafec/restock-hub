import prisma from "lib/prisma";

class FindAllDemandsService {
  async execute() {
    const allDemands = await prisma.demand.findMany();

    if (allDemands.length === 0) return "There is no demands registered yet.";

    return allDemands;
  }
}

export { FindAllDemandsService };
