import { Request, Response } from "express";
import { CreateProductService } from "src/services/product/CreateProductService";
import prisma from "lib/prisma";

interface IProductRequest {
  productName: string;
  description?: string;
  price: number;
}

class CreateProductController {
  async handle(request: Request, response: Response) {
    try {
      const productProps: IProductRequest = request.body;
      const createProductService = new CreateProductService();

      const createdProduct = await createProductService.execute(
        {
          ...productProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Product created.",
        data: createdProduct,
      });
    } catch (error) {
      console.log("Error creating product: ", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateProductController };
