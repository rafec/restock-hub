import { Request, Response } from "express";
import { CreateDemandService } from "services/demand/CreateDemandService";
import prisma from "lib/prisma";

interface IDemandRequest {
  userId: string;
  description: string;
  keywords: string[];
  statusId: string;
}

class CreateDemandController {
  async handle(request: Request, response: Response) {
    try {
      const demandProps: IDemandRequest = request.body;
      const createDemandService = new CreateDemandService();

      const createdDemand = await createDemandService.execute(
        {
          ...demandProps,
        },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Demand created.",
        data: createdDemand,
      });
    } catch (error) {
      console.log("Error creating demand.", error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateDemandController };
