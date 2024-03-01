import express from "express";
import {
  CreateTransactionController,
  DeleteTransactionController,
  FindAllTransactionsController,
  FindTransactionController,
  UpdateTransactionController,
} from "src/controllers/transaction";

const routes = express.Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const findAllTransactionsController = new FindAllTransactionsController();
const findTransactionController = new FindTransactionController();
const updateTransactionController = new UpdateTransactionController();

routes.get("/", findAllTransactionsController.handle);
routes.post("/", createTransactionController.handle);
routes.get("/:id", findTransactionController.handle);
routes.put("/:id", updateTransactionController.handle);
routes.delete("/:id", deleteTransactionController.handle);

export default routes;
