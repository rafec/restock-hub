import prisma from "lib/prisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
  quantity?: number;
}

class UpdateStockService {
  async execute({ supplierId, productId, quantity }: IStockRequest) {
    if (!supplierId || !productId) {
      throw new Error("Supplier ID and/or product ID are invalid.");
    }

    if (quantity) {
      if (quantity <= 0 || !Number.isInteger(quantity)) {
        throw new Error("Quantity must be a positive integer.");
      }
    }

    const stockEntryAlreadyExists = await prisma.stock.findUnique({
      where: {
        id: {
          supplierId,
          productId,
        },
      },
    });
    if (!stockEntryAlreadyExists) {
      throw new Error("Stock entry not found.");
    }

    const updatedStock = await prisma.stock.update({
      where: { id: { supplierId, productId } },
      data: { quantity },
    });

    return updatedStock;
  }
}

export { UpdateStockService };
