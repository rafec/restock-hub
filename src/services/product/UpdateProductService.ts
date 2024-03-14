import { PrismaClient } from "@prisma/client";
import testPrisma from "lib/testPrisma";

interface IProductRequest {
  id: string;
  productName?: string;
  description?: string;
  price?: number;
}

class UpdateProductService {
  async execute(
    { id, productName, description, price }: IProductRequest,
    client: PrismaClient = testPrisma,
  ) {
    const productExists = await client.product.findUnique({
      where: {
        id,
      },
    });
    if (!productExists) {
      throw new Error("Product not found.");
    }

    if (productName) {
      if (productName.length < 3 || productName.length > 255) {
        throw new Error(
          "Product name must be between 3 and 255 characters long.",
        );
      }
    }

    if (price) {
      if (price <= 0 || isNaN(price)) {
        throw new Error("Price must be a positive number.");
      }
    }

    if (description) {
      if (description.length > 1000) {
        throw new Error("Description must be less than 1000 characters long.");
      }
    }

    const updatedProduct = await client.product.update({
      where: { id },
      data: {
        productName,
        description,
        price,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
