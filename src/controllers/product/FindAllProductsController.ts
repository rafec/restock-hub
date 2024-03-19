import { Request, Response } from "express";
import { FindAllProductsService } from "services/product/FindAllProductsService";
import prisma from "lib/prisma";

class FindAllProductsController {
  async handle(request: Request, response: Response) {
    try {
      const findAllProductsService = new FindAllProductsService();

      const allProducts = await findAllProductsService.execute(prisma);

      return response.status(200).json({
        message: "Succesfull operation.",
        data: allProducts,
      });
    } catch (error) {
      console.log("Error retrieving products records", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllProductsController };
