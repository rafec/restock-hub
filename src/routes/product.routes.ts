import express from "express";
import {
  CreateProductController,
  DeleteProductController,
  FindAllProductsController,
} from "src/controllers/product";

const routes = express.Router();

const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const findAllProductsController = new FindAllProductsController();

routes.get("/", findAllProductsController.handle);
routes.post("/", createProductController.handle);
routes.delete("/:id", deleteProductController.handle);

export default routes;
