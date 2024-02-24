import { Request, Response } from "express";
import { DeleteRoleService } from "src/services/role/DeleteRoleService";

class DeleteRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    try {
      const deleteRoleService = new DeleteRoleService();

      const deletedRole = await deleteRoleService.execute(id);

      return response.status(204).json({
        message: "Succesfull operation! Role deleted",
        data: deletedRole,
      });
    } catch (error) {
      console.log(`Error deleting role with id ${id}`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteRoleController };
