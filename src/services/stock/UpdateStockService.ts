import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IStockRequest {
  supplierId?: string;
  productId?: string;
  quantity?: number;
}

class UpdateStockService {
  async execute(
    currentSupplierId: string,
    currentProductId: string,
    { supplierId, productId, quantity }: IStockRequest,
    client: PrismaClient = testPrisma,
  ) {
    const stockEntryExists = await client.stock.findUnique({
      where: {
        id: {
          supplierId: currentSupplierId,
          productId: currentProductId,
        },
      },
    });
    if (!stockEntryExists) {
      throw new Error("Stock entry not found.");
    }

    if (supplierId && productId) {
      const stockEntryAlreadyExists = await client.stock.findFirst({
        where: {
          supplierId,
          productId,
        },
      });
      if (stockEntryAlreadyExists) {
        throw new Error(
          "Stock entry already exists for this supplier and product.",
        );
      }
    }

    if (supplierId) {
      const newSupplierExists = await client.user.findUnique({
        where: { id: supplierId },
      });
      if (!newSupplierExists) {
        throw new Error(
          "The supplier that will replace the current supplier was not found.",
        );
      }
    }

    if (productId) {
      const newProductExists = await client.product.findUnique({
        where: { id: productId },
      });
      if (!newProductExists) {
        throw new Error(
          "The product that will replace the current product was not found.",
        );
      }
    }

    if (quantity) {
      if (quantity < 0 || !Number.isInteger(quantity)) {
        throw new Error("Quantity must be a positive integer.");
      }
    }

    const updatedStock = await client.stock.update({
      where: {
        id: {
          supplierId: currentSupplierId,
          productId: currentProductId,
        },
      },
      data: {
        supplierId,
        productId,
        quantity,
      },
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

    return updatedStock;
  }
}

export { UpdateStockService };
