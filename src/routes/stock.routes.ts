import express from "express";
import {
  CreateStockController,
  DeleteStockController,
  FindAllStocksController,
  FindStockController,
  UpdateStockController,
} from "src/controllers/stock";

const routes = express.Router();

const createStockController = new CreateStockController();
const deleteStockController = new DeleteStockController();
const findAllStocksController = new FindAllStocksController();
const findStockController = new FindStockController();
const updateStockController = new UpdateStockController();

routes.get("/", findAllStocksController.handle);
routes.post("/", createStockController.handle);
routes.get("/:supplierId/:productId", findStockController.handle);
routes.put("/:supplierId/:productId", updateStockController.handle);
routes.delete("/:supplierId/:productId", deleteStockController.handle);

export default routes;
