import prisma from "lib/prisma";

interface IProductRequest {
  id: string;
  productName?: string;
  description?: string;
  price?: number;
}

class UpdateProductService {
  async execute({ id, ...props }: IProductRequest) {
    if (!id) {
      throw new Error("Invalid product id.");
    }

    const productExists = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error("Product not found.");
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { ...props },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
