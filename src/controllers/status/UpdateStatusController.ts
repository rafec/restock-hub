import { Request, Response } from "express";
import { UpdateStatusService } from "services/status/UpdateStatusService";
import prisma from "lib/prisma";

interface IStatusRequest {
  name?: string;
}

class UpdateStatusController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const statusProps: IStatusRequest = request.body;
      const updateStatusService = new UpdateStatusService();
      const updatedStatus = await updateStatusService.execute(
        { id, ...statusProps },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Status updated.",
        data: updatedStatus,
      });
    } catch (error) {
      console.log(`Error updating status with id ${id}.`, error.message);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateStatusController };
