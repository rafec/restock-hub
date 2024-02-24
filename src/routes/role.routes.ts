import express from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  FindAllRolesController,
  FindRoleController,
  UpdateRoleController,
} from "src/controllers/role";

const routes = express.Router();

const createRoleController = new CreateRoleController();
const deleteRoleController = new DeleteRoleController();
const findRoleController = new FindRoleController();
const findAllRolesController = new FindAllRolesController();
const updateRoleController = new UpdateRoleController();

routes.get("/", findAllRolesController.handle);
routes.post("/", createRoleController.handle);
routes.get("/:id", findRoleController.handle);
routes.put("/:id", updateRoleController.handle);
routes.delete("/:id", deleteRoleController.handle);

export default routes;
