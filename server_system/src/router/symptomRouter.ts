import { Router } from "express";
const symptomController = require("../controller/symptomController");

export const symptomRouter = Router();

symptomRouter.get("/all", symptomController.getAll);
symptomRouter.post("/create", symptomController.createSymptom);
