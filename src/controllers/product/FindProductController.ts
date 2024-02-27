import { Request, Response } from "express";
import { FindProductService } from "services/product/FindProductService";

class FindProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findProductService = new FindProductService();

      const product = await findProductService.execute(id);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: product });
    } catch (error) {
      console.log(`Error retrieving product with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { FindProductController };
