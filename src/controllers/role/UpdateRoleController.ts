import { Request, Response } from "express";
import { UpdateRoleService } from "src/services/role/UpdateRoleService";

class UpdateRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { roleName } = request.body;

    try {
      const updateRoleService = new UpdateRoleService();
      const updatedRole = await updateRoleService.execute(id, roleName);

      return response.status(200).json({
        message: "Succesfull operation. Role updated.",
        data: updatedRole,
      });
    } catch (error) {
      console.log(
        `Error updating role '${roleName}' with id ${id}.`,
        error.message,
      );
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateRoleController };
