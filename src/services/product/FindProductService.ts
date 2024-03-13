import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindProductService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const product = await client.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }
}

export { FindProductService };
