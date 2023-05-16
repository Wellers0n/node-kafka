import { Router } from "express";
import { healthRoutes } from "../routes/health";
import { sessionRoutes } from "../routes/session";
import { locationRoutes } from "../routes/location";

const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/session", sessionRoutes);
routes.use("/location", locationRoutes);

export { routes };
