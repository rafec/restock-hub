import express from "express";
import {
  CreateStatusController,
  DeleteStatusController,
} from "src/controllers/status";

const routes = express.Router();

const createStatusController = new CreateStatusController();
const deleteStatusController = new DeleteStatusController();

routes.post("/", createStatusController.handle);
routes.delete("/:id", deleteStatusController.handle);

export default routes;
