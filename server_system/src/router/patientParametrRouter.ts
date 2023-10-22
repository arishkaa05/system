import { Router } from "express";
const patientParametrController = require("../controller/patientParametrController");

export const patientParametrRouter = Router();

patientParametrRouter.get("/get_parametrs_by_id/:id", patientParametrController.getParametrsByIdPatient);
patientParametrRouter.post("/create", patientParametrController.createPatientParametr);
