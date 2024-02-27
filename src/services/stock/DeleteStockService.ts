import prisma from "lib/prisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
}

class DeleteStockService {
  async execute({ supplierId, productId }: IStockRequest) {
    const stockEntryExists = await prisma.stock.findUnique({
      where: {
        id: {
          supplierId,
          productId,
        },
      },
    });

    if (!stockEntryExists) {
      throw new Error("Stock entry not found.");
    }

    const deletedStock = await prisma.stock.delete({
      where: { id: { supplierId, productId } },
    });

    return deletedStock;
  }
}

export { DeleteStockService };
