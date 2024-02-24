import express from "express";
import { CreateRoleController } from "src/controllers/role/CreateRoleController";
import { DeleteRoleController } from "src/controllers/role/DeleteRoleController";

const routes = express.Router();

const createRoleController = new CreateRoleController();
const deleteRoleController = new DeleteRoleController();

routes.post("/", createRoleController.handle);
routes.delete("/:id", deleteRoleController.handle);

export default routes;
