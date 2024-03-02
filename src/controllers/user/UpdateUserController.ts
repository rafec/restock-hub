import { Request, Response } from "express";
import { UpdateUserService } from "services/user/UpdateUserService";

interface IUserRequest {
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const userProps: IUserRequest = request.body;
      const updateUserService = new UpdateUserService();
      const updatedUser = await updateUserService.execute({
        id,
        ...userProps,
      });

      return response.status(200).json({
        message: "Succesfull operation. User updated.",
        data: updatedUser,
      });
    } catch (error) {
      console.log(`Error updating user with id ${id}.`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateUserController };
