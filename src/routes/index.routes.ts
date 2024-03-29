import express from "express";

import apiRoutes from "./api.routes";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import stockRoutes from "./stock.routes";
import demandRoutes from "./demand.routes";
import transactionRoutes from "./transaction.routes";
import statusRoutes from "./status.routes";

const routes = express.Router();

routes.use("/api", apiRoutes);
routes.use("/health", healthRoutes);
routes.use("/role", roleRoutes);
routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
routes.use("/stock", stockRoutes);
routes.use("/demand", demandRoutes);
routes.use("/transaction", transactionRoutes);
routes.use("/status", statusRoutes);

export default routes;
