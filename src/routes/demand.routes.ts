import express from "express";
import {
  CreateDemandController,
  DeleteDemandController,
  FindAllDemandsController,
} from "src/controllers/demand";

const routes = express.Router();

const createDemandController = new CreateDemandController();
const deleteDemandController = new DeleteDemandController();
const findAllDemandsController = new FindAllDemandsController();

routes.get("/", findAllDemandsController.handle);
routes.post("/", createDemandController.handle);
routes.delete("/:id", deleteDemandController.handle);

export default routes;
