import { Request, Response } from "express";
import { CreateUserService } from "src/services/user/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password, roleId } = request.body;
      const createUserService = new CreateUserService();

      const createdUser = await createUserService.execute({
        name,
        email,
        password,
        roleId,
      });

      return response.status(201).json({
        message: "Succesfull operation. User created.",
        data: createdUser,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
      response.status(404).json({ message: error.message, data: {} });
    }
  }
}

export { CreateUserController };
