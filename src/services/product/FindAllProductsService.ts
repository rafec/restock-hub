import prisma from "lib/prisma";

class FindAllProductsService {
  async execute() {
    const allProducts = await prisma.product.findMany();

    if (allProducts.length === 0) return "There is no products registered yet.";

    return allProducts;
  }
}

export { FindAllProductsService };
