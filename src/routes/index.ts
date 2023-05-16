import { Router } from "express";
import { healthRoutes } from "../routes/health";
import { sessionRoutes } from "../routes/session";
import { publishRoutes } from "../routes/publish";

const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/session", sessionRoutes);
routes.use("/publish", publishRoutes);

export { routes };
