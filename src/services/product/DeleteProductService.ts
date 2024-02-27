import prisma from "src/lib/prisma";

class DeleteProductService {
  async execute(id: string) {
    const productExists = await prisma.product.findUnique({
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

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    const productAfterDeletion = await prisma.product.findUnique({
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
