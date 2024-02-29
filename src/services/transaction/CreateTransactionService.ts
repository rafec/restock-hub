import prisma from "lib/prisma";

interface ITransactionRequest {
  buyerId: string;
  supplierId: string;
  productId: string;
  quantity: number;
  totalValue: number;
}

class CreateTransactionService {
  async execute({
    buyerId,
    supplierId,
    productId,
    quantity,
    totalValue,
  }: ITransactionRequest) {
    if (!buyerId || !supplierId || !productId || !quantity || !totalValue) {
      throw new Error(
        "Buyer ID, supplier ID, product ID, quantity, and total value are required.",
      );
    }

    const buyerExists = await prisma.user.findUnique({
      where: { id: buyerId },
    });
    if (!buyerExists) {
      throw new Error("Buyer not found.");
    }

    const supplierExists = await prisma.user.findUnique({
      where: { id: supplierId },
    });
    if (!supplierExists) {
      throw new Error("Supplier not found.");
    }

    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      throw new Error("Product not found.");
    }

    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new Error("Quantity must be a positive integer.");
    }

    if (totalValue <= 0) {
      throw new Error("Total value must be a positive decimal number.");
    }

    const createdTransaction = await prisma.transaction.create({
      data: {
        buyerId,
        supplierId,
        productId,
        quantity,
        totalValue,
      },
    });

    return createdTransaction;
  }
}

export { CreateTransactionService };
