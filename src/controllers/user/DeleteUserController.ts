import { Request, Response } from "express";
import { DeleteUserService } from "src/services/user/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteUserService = new DeleteUserService();

      const deletedUser = await deleteUserService.execute(id);

      return response.status(204).json({
        message: "Succesfull operation.",
        data: deletedUser,
      });
    } catch (error) {
      console.log(`Error deleting user with id ${id}`, error);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteUserController };
