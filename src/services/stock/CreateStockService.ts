import { PrismaClient } from "@prisma/client";
import testPrisma from "src/lib/testPrisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
  quantity: number;
}

class CreateStockService {
  async execute(
    { supplierId, productId, quantity }: IStockRequest,
    client: PrismaClient = testPrisma,
  ) {
    console.log(quantity);
    if (!supplierId || !productId || isNaN(quantity)) {
      throw new Error("Supplier ID, product ID, and quantity are required.");
    }

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

    const supplierExists = await client.user.findUnique({
      where: { id: supplierId },
    });
    if (!supplierExists) {
      throw new Error("Supplier not found.");
    }

    const productExists = await client.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      throw new Error("Product not found.");
    }

    if (quantity < 0 || !Number.isInteger(quantity)) {
      throw new Error("Quantity must be an integer, and can't be negative.");
    }

    const createdStock = await client.stock.create({
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

    return createdStock;
  }
}

export { CreateStockService };
