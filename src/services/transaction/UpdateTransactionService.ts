import prisma from "lib/prisma";

interface ITransactionRequest {
  id: string;
  buyerId: string;
  supplierId?: string;
  productId?: string;
  quantity?: number;
  totalValue?: number;
}

class UpdateTransactionService {
  async execute({
    id,
    buyerId,
    supplierId,
    productId,
    quantity,
    totalValue,
  }: ITransactionRequest) {
    if (buyerId) {
      const buyerExists = await prisma.user.findUnique({
        where: { id: buyerId },
      });
      if (!buyerExists) {
        throw new Error("Buyer not found.");
      }
    }

    if (supplierId) {
      const supplierExists = await prisma.user.findUnique({
        where: { id: supplierId },
      });
      if (!supplierExists) {
        throw new Error("Supplier not found.");
      }
    }

    if (productId) {
      const productExists = await prisma.product.findUnique({
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

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        buyerId,
        supplierId,
        productId,
        quantity,
        totalValue,
      },
    });

    return updatedTransaction;
  }
}

export { UpdateTransactionService };
