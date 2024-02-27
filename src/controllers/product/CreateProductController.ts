import { Request, Response } from "express";
import { CreateProductService } from "src/services/product/CreateProductService";

class CreateProductController {
  async handle(request: Request, response: Response) {
    try {
      const { productName, description, price } = request.body;
      const createProductService = new CreateProductService();

      const createdProduct = await createProductService.execute({
        productName,
        description,
        price,
      });

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
