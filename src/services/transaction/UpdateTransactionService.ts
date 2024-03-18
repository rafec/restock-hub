import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface ITransactionRequest {
  id: string;
  buyerId?: string;
  supplierId?: string;
  productId?: string;
  quantity?: number;
  totalValue?: number;
}

class UpdateTransactionService {
  async execute(
    {
      id,
      buyerId,
      supplierId,
      productId,
      quantity,
      totalValue,
    }: ITransactionRequest,
    client: PrismaClient = testPrisma,
  ) {
    const existingTransaction = await client.transaction.findUnique({
      where: { id },
    });
    if (!existingTransaction) {
      throw new Error("Transaction not found.");
    }

    if (buyerId) {
      const buyerExists = await client.user.findUnique({
        where: { id: buyerId },
      });
      if (!buyerExists) {
        throw new Error("Buyer not found.");
      }
    }

    if (supplierId) {
      const supplierExists = await client.user.findUnique({
        where: { id: supplierId },
      });
      if (!supplierExists) {
        throw new Error("Supplier not found.");
      }
    }

    if (productId) {
      const productExists = await client.product.findUnique({
        where: { id: productId },
      });
      if (!productExists) {
        throw new Error("Product not found.");
      }
    }

    if (quantity) {
      if (quantity <= 0 || !Number.isInteger(quantity)) {
        throw new Error("Quantity must be a positive integer.");
      }
    }

    if (totalValue) {
      if (totalValue <= 0) {
        throw new Error("Total value must be a positive decimal number.");
      }
    }

    const updatedTransaction = await client.transaction.update({
      where: { id },
      data: {
        buyerId,
        supplierId,
        productId,
        quantity,
        totalValue,
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
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

    return updatedTransaction;
  }
}

export { UpdateTransactionService };
