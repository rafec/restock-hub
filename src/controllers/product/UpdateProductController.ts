import { Request, Response } from "express";
import { UpdateProductService } from "src/services/product/UpdateProductService";
import prisma from "lib/prisma";

interface IProductRequest {
  productName?: string;
  description?: string;
  price?: number;
}

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const productProps: IProductRequest = request.body;
      const updateProductService = new UpdateProductService();

      const updatedProduct = await updateProductService.execute(
        {
          id,
          ...productProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Product updated.",
        data: updatedProduct,
      });
    } catch (error) {
      console.log(`Error updating product with id ${id}.`);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateProductController };
