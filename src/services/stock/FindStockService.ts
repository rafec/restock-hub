import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
}
class FindStockService {
  async execute(
    { supplierId, productId }: IStockRequest,
    client: PrismaClient = testPrisma,
  ) {
    const stock = await client.stock.findUnique({
      where: { id: { supplierId, productId } },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    if (!stock) {
      throw new Error("Stock not found.");
    }

    return stock;
  }
}

export { FindStockService };
