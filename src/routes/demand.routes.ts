import express from "express";
import {
  CreateDemandController,
  DeleteDemandController,
  FindAllDemandsController,
  FindDemandController,
} from "src/controllers/demand";

const routes = express.Router();

const createDemandController = new CreateDemandController();
const deleteDemandController = new DeleteDemandController();
const findAllDemandsController = new FindAllDemandsController();
const findDemandController = new FindDemandController();

routes.get("/", findAllDemandsController.handle);
routes.post("/", createDemandController.handle);
routes.get("/:id", findDemandController.handle);
routes.delete("/:id", deleteDemandController.handle);

export default routes;
