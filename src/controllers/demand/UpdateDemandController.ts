import { Request, Response } from "express";
import { UpdateDemandService } from "services/demand/UpdateDemandService";
import prisma from "lib/prisma";

interface IDemandRequest {
  userId?: string;
  description?: string;
  keywords?: string[];
  statusId?: string;
}

class UpdateDemandController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const demandProps: IDemandRequest = request.body;
      const updateDemandService = new UpdateDemandService();

      const updatedDemand = await updateDemandService.execute(
        {
          id,
          ...demandProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Demand updated.",
        data: updatedDemand,
      });
    } catch (error) {
      console.log(`Error updating demand with id ${id}.`);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateDemandController };
