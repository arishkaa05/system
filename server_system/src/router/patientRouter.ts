import { Router } from "express";
const patientController = require("../controller/patientController");

export const patientRouter = Router();

patientRouter.get("/all", patientController.getAll);
patientRouter.post("/create", patientController.createPatient);
