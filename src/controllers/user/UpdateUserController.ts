import { Request, Response } from "express";
import { UpdateUserService } from "services/user/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password, country, city, state, address, roleId } =
      request.body;

    try {
      const updateUserService = new UpdateUserService();
      const updatedUser = await updateUserService.execute({
        id,
        name,
        email,
        password,
        country,
        city,
        state,
        address,
        roleId,
      });

      return response.status(200).json({
        message: "Succesfull operation. User updated.",
        data: updatedUser,
      });
    } catch (error) {
      console.log(`Error updating user '${name}' with id ${id}.`);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { UpdateUserController };
