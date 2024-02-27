import prisma from "lib/prisma";

interface IProductRequest {
  productName: string;
  description?: string;
  price: number;
}

class CreateProductService {
  async execute({ productName, description, price }: IProductRequest) {
    if (!productName || !price) {
      throw new Error("Product name and price are required.");
    }

    if (productName.length < 3 || productName.length > 255) {
      throw new Error(
        "Product name must be between 3 and 255 characters long.",
      );
    }

    if (price <= 0 || isNaN(price)) {
      throw new Error("Price must be a positive number.");
    }

    if (description && description.length > 1000) {
      throw new Error("Description must be less than 1000 characters long.");
    }

    const createdProduct = await prisma.product.create({
      data: {
        productName,
        description,
        price,
      },
    });

    return createdProduct;
  }
}

export { CreateProductService };
