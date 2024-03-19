import { Request, Response } from "express";
import { DeleteProductService } from "services/product/DeleteProductService";
import prisma from "lib/prisma";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteProductService = new DeleteProductService();

      const deletedUser = await deleteProductService.execute(id, prisma);

      return response.status(204).json({
        message: "Succesfull operation. Product deleted.",
        data: deletedUser,
      });
    } catch (error) {
      console.log(`Error deleting product with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteProductController };
