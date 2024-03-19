import { Request, Response } from "express";
import { DeleteRoleService } from "services/role/DeleteRoleService";
import prisma from "lib/prisma";

class DeleteRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteRoleService = new DeleteRoleService();

      const deletedRole = await deleteRoleService.execute(id, prisma);

      return response.status(204).json({
        message: "Succesfull operation. Role deleted.",
        data: deletedRole,
      });
    } catch (error) {
      console.log(`Error deleting role with id ${id}`, error);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteRoleController };
