import { Application, Router } from "express";
import { checkJwt } from "./jwtMiddleware";
import catalogueController from "../controllers/catalogue.controllers";

export default (app: Application): void => {
  const router = Router();

  router.get("/", checkJwt, catalogueController.get);

  app.use("/api/catalogue", router);
};
