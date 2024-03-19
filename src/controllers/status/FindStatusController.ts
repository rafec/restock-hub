import { Request, Response } from "express";
import { FindStatusService } from "services/status/FindStatusService";
import prisma from "lib/prisma";

class FindStatusController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const findStatusService = new FindStatusService();
      const status = await findStatusService.execute(id, prisma);

      return response
        .status(200)
        .json({ message: "Succesfull operation.", data: status });
    } catch (error) {
      console.log(`Error retrieving status with id ${id}`, error);
      return response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { FindStatusController };
