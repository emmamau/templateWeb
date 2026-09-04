import { Application } from "express";
import catalogueRoutes from "./catalogue.routes";
import utilisateurRoutes from "./utilisateur.routes";

export default (app: Application): void => {
  catalogueRoutes(app);
  utilisateurRoutes(app);
};
