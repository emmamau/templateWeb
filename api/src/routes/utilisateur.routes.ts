import { Application, Router } from "express";
import utilisateurController from "../controllers/utilisateur.controllers";

export default (app: Application): void => {
  const router = Router();

  // login utilisateur
  router.post("/login", utilisateurController.login);

  app.use("/api/utilisateur", router);
};
