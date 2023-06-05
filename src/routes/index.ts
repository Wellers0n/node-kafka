import { Router } from "express";
import { healthRoutes } from "./health";
import { publishRoutes } from "./publish";

const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/publish", publishRoutes);

export { routes };
