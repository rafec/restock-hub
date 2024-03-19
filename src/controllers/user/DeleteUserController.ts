import { Request, Response } from "express";
import { DeleteUserService } from "services/user/DeleteUserService";
import prisma from "lib/prisma";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteUserService = new DeleteUserService();

      const deletedUser = await deleteUserService.execute(id, prisma);

      return response.status(204).json({
        message: "Succesfull operation. User deleted.",
        data: deletedUser,
      });
    } catch (error) {
      console.log(`Error deleting user with id ${id}`, error);
      response.status(400).json({ message: error.message, data: {} });
    }
  }
}

export { DeleteUserController };
