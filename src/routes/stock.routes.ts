import express from "express";
import {
  CreateStockController,
  DeleteStockController,
} from "src/controllers/stock";

const routes = express.Router();

const createStockController = new CreateStockController();
const deleteStockController = new DeleteStockController();

routes.post("/", createStockController.handle);
routes.delete("/:supplierId/:productId", deleteStockController.handle);

export default routes;
