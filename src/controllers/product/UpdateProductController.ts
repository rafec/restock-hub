import { Request, Response } from "express";
import { UpdateProductService } from "src/services/product/UpdateProductService";

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const { productName, description, price } = request.body;
      const updateProductService = new UpdateProductService();

      const updatedProduct = await updateProductService.execute({
        id,
        productName,
        description,
        price,
      });

      return response.status(200).json({
        message: "Succesfull operation. Product updated.",
        data: updatedProduct,
      });
    } catch (error) {
      console.log(`Error updating product with id ${id}.`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateProductController };
