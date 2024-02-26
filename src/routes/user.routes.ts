import express from "express";
import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  FindUserController,
} from "src/controllers/user";

const routes = express.Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findAllUsersController = new FindAllUsersController();
const findUserController = new FindUserController();

routes.get("/", findAllUsersController.handle);
routes.post("/", createUserController.handle);
routes.get("/:id", findUserController.handle);
routes.delete("/:id", deleteUserController.handle);

export default routes;
