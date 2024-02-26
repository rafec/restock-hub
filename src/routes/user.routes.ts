import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  FindUserController,
  UpdateUserController,
} from "src/controllers/user";

const routes = express.Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findAllUsersController = new FindAllUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();

routes.get("/", findAllUsersController.handle);
routes.post("/", createUserController.handle);
routes.get("/:id", findUserController.handle);
routes.put("/:id", updateUserController.handle);
routes.delete("/:id", deleteUserController.handle);

export default routes;
