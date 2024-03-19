import { Request, Response } from "express";
import { CreateStatusService } from "src/services/status/CreateStatusService";
import prisma from "lib/prisma";

interface IStatusRequest {
  name: string;
}

class CreateStatusController {
  async handle(request: Request, response: Response) {
    try {
      const statusProps: IStatusRequest = request.body;
      const createStatusService = new CreateStatusService();

      const createdStatus = await createStatusService.execute(
        {
          ...statusProps,
        },
        prisma,
      );

      return response.status(201).json({
        message: "Succesfull operation. Status created.",
        data: createdStatus,
      });
    } catch (error) {
      console.log("Error creating status: ", error.message);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { CreateStatusController };
