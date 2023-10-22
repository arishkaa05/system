import { Router } from "express";
const parametrSymptomController = require("../controller/parametrSymptomController");

export const parametrSymptomRouter = Router();

parametrSymptomRouter.get("/get_symptoms_by_id/:id", parametrSymptomController.getSymptomsByParametrId);
parametrSymptomRouter.post("/create", parametrSymptomController.createParametrSymptom);
