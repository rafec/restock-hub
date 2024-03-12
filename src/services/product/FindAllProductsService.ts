import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class FindAllProductsService {
  async execute(client: PrismaClient = testPrisma) {
    const allProducts = await client.product.findMany();

    if (allProducts.length === 0) return "There is no products registered yet.";

    return allProducts;
  }
}

export { FindAllProductsService };
