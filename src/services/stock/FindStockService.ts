import prisma from "lib/prisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
}
class FindStockService {
  async execute({ supplierId, productId }: IStockRequest) {
    const stock = await prisma.stock.findUnique({
      where: { id: { supplierId, productId } },
    });

    if (!stock) {
      throw new Error("Stock not found.");
    }

    return stock;
  }
}

export { FindStockService };