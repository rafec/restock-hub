import prisma from "lib/prisma";

class FindProductService {
  async execute(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }
}

export { FindProductService };
