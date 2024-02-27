import express from "express";
import {
  CreateStockController,
  DeleteStockController,
  FindAllStocksController,
} from "src/controllers/stock";

const routes = express.Router();

const createStockController = new CreateStockController();
const deleteStockController = new DeleteStockController();
const findAllStocksController = new FindAllStocksController();

routes.get("/", findAllStocksController.handle);
routes.post("/", createStockController.handle);
routes.delete("/:supplierId/:productId", deleteStockController.handle);

export default routes;
