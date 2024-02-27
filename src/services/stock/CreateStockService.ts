import prisma from "lib/prisma";

interface IStockRequest {
  supplierId: string;
  productId: string;
  quantity: number;
}

class CreateStockService {
  async execute({ supplierId, productId, quantity }: IStockRequest) {
    if (!supplierId || !productId || !quantity) {
      throw new Error("Supplier ID, product ID, and quantity are required.");
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

    if (quantity <= 0 || isNaN(quantity)) {
      throw new Error("Quantity must be a positive number.");
    }

    const stockEntryAlreadyExists = await prisma.stock.findFirst({
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

    const createdStock = await prisma.stock.create({
      data: {
        supplierId,
        productId,
        quantity,
      },
    });

    return createdStock;
  }
}

export { CreateStockService };
