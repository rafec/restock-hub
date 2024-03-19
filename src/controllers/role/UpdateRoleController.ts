import { Request, Response } from "express";
import { UpdateRoleService } from "services/role/UpdateRoleService";
import prisma from "lib/prisma";

interface IRoleRequest {
  roleName?: string;
}

class UpdateRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const roleProps: IRoleRequest = request.body;
      const updateRoleService = new UpdateRoleService();
      const updatedRole = await updateRoleService.execute(
        { id, ...roleProps },
        prisma,
      );

      return response.status(200).json({
        message: "Succesfull operation. Role updated.",
        data: updatedRole,
      });
    } catch (error) {
      console.log(`Error updating role with id ${id}.`, error.message);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateRoleController };
