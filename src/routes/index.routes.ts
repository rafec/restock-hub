import express from "express";

import apiRoutes from "./api.routes";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";

const routes = express.Router();

routes.use("/api", apiRoutes);
routes.use("/health", healthRoutes);
routes.use("/role", roleRoutes);

export default routes;
