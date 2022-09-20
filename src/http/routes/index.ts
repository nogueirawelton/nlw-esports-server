import { Router } from "express";
import { adsRoutes } from "./ads.routes";
import { gamesRoutes } from "./games.routes";

export const routes = Router();

routes.use("/ads", adsRoutes);
routes.use("/games", gamesRoutes);