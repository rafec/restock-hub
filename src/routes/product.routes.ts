import express from "express";
import {
  CreateProductController,
  DeleteProductController,
  FindAllProductsController,
  FindProductController,
  UpdateProductController,
} from "src/controllers/product";

const routes = express.Router();

const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const findAllProductsController = new FindAllProductsController();
const findProductController = new FindProductController();
const updateProductController = new UpdateProductController();

routes.get("/", findAllProductsController.handle);
routes.post("/", createProductController.handle);
routes.get("/:id", findProductController.handle);
routes.put("/:id", updateProductController.handle);
routes.delete("/:id", deleteProductController.handle);

export default routes;
