import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
}

class DeleteStockService {
  async execute(
    { supplierId, productId }: IStockRequest,
    client: PrismaClient = testPrisma,
  ) {
    const stockEntryExists = await client.stock.findUnique({
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

    const deletedStock = await client.stock.delete({
      where: { id: { supplierId, productId } },
    });

    const stockAfterDeletion = await client.stock.findUnique({
      where: { id: { supplierId, productId } },
    });

    if (stockAfterDeletion) {
      throw new Error("Failed to delete stock.");
    }

    return deletedStock;
  }
}

export { DeleteStockService };
