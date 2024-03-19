import { Request, Response } from "express";
import { FindAllStatusService } from "services/status/FindAllStatusService";
import prisma from "lib/prisma";

class FindAllStatusController {
  async handle(request: Request, response: Response) {
    try {
      const findAllStatusService = new FindAllStatusService();
      const allStatus = await findAllStatusService.execute(prisma);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: allStatus });
    } catch (error) {
      console.log("Error retrieving status records.", error);
      response.status(404).json({ message: error.message, data: [] });
    }
  }
}

export { FindAllStatusController };
