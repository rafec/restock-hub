import { Request, Response } from "express";
import { DeleteStatusService } from "services/status/DeleteStatusService";
import prisma from "lib/prisma";

class DeleteStatusController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteStatusService = new DeleteStatusService();

      const deletedStatus = await deleteStatusService.execute(id, prisma);

      return response.status(204).json({
        message: "Succesfull operation. Status deleted.",
        data: deletedStatus,
      });
    } catch (error) {
      console.log(`Error deleting status with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteStatusController };
