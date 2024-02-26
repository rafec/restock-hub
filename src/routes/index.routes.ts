import express from "express";

import apiRoutes from "./api.routes";
import healthRoutes from "./health.routes";
import roleRoutes from "./role.routes";
import userRoutes from "./user.routes";

const routes = express.Router();

routes.use("/api", apiRoutes);
routes.use("/health", healthRoutes);
routes.use("/role", roleRoutes);
routes.use("/user", userRoutes);

export default routes;
