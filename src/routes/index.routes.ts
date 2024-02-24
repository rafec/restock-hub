import express from "express";

import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";

const routes = express.Router();

routes.use("/role", roleRoutes);
routes.use("/health", healthRoutes);

export default routes;
