import prisma from "src/lib/prisma";

interface IDemandRequest {
  id: string;
  userId?: string;
  description?: string;
  keywords?: string[];
  status?: string;
}

class UpdateDemandService {
  async execute({ id, userId, description, keywords, status }: IDemandRequest) {
    if (!id) {
      throw new Error("Demand ID is required.");
    }

    const existingDemand = await prisma.demand.findUnique({ where: { id } });
    if (!existingDemand) {
      throw new Error("Demand not found.");
    }

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found.");
      }
    }

    if (description && (description.length < 3 || description.length > 255)) {
      throw new Error("Description must be between 3 and 255 characters long.");
    }

    if (keywords) {
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error("Keywords must be provided as a non-empty array.");
      }
      // for (const keyword of keywords) {
      //   if (keyword.length < 2 || keyword.length > 50) {
      //     throw new Error(
      //       "Keyword length must be between 2 and 50 characters.",
      //     );
      //   }
      // }
    }

    const updatedDemand = await prisma.demand.update({
      where: { id },
      data: {
        userId,
        description,
        keywords: keywords ? { set: keywords } : undefined,
        status,
      },
    });

    return updatedDemand;
  }
}

export { UpdateDemandService };
