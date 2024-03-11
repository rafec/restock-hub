import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

class DeleteProductService {
  async execute(id: string, client: PrismaClient = testPrisma) {
    const productExists = await client.product.findUnique({
      where: {
        id,
      },
    });

    if (!id) {
      throw new Error("The ID informed is invalid.");
    }

    if (!productExists) {
      throw new Error("Product not found.");
    }

    const deletedProduct = await client.product.delete({
      where: {
        id,
      },
    });

    const productAfterDeletion = await client.product.findUnique({
      where: {
        id,
      },
    });

    if (productAfterDeletion) {
      throw new Error("Failed to delete product.");
    }

    return deletedProduct;
  }
}

export { DeleteProductService };
