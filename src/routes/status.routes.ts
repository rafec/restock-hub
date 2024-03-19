import express from "express";
import {
  CreateStatusController,
  DeleteStatusController,
  FindAllStatusController,
  FindStatusController,
  UpdateStatusController,
} from "src/controllers/status";

const routes = express.Router();

const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();
const findAllStatusController = new FindAllStatusController();
const findStatusController = new FindStatusController();
const updateStatusController = new UpdateStatusController();

routes.get("/", findAllStatusController.handle);
routes.post("/", createStatusController.handle);
routes.get("/:id", findStatusController.handle);
routes.put("/:id", updateStatusController.handle);
routes.delete("/:id", deleteStatusController.handle);

export default routes;
