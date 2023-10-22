import { Router } from "express";
const parametrController = require("../controller/parametrController");

export const parametrRouter = Router();

parametrRouter.get("/all", parametrController.getAll);
parametrRouter.post("/create", parametrController.createParametr);
