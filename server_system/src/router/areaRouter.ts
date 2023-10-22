import { Router } from "express";
const areaController = require("../controller/areaController");

export const areaRouter = Router();

areaRouter.get("/all", areaController.getAll);
areaRouter.post("/create", areaController.createArea);
