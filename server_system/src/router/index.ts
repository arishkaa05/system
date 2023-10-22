import { Router } from "express";
import { userRouter } from "./userRouter";
import { areaRouter } from "./areaRouter";
import { patientRouter } from "./patientRouter";
import { symptomRouter } from "./symptomRouter";
import { parametrRouter } from "./parametrRouter";
import { patientParametrRouter } from "./patientParametrRouter";
import { parametrSymptomRouter } from "./parametrSympromRouter";

export const defaultRouter = Router();

defaultRouter.use("/user", userRouter);
defaultRouter.use("/area", areaRouter);
defaultRouter.use("/patient", patientRouter);
defaultRouter.use("/symptom", symptomRouter);
defaultRouter.use("/parametr", parametrRouter);
defaultRouter.use("/patient_parametr", patientParametrRouter);
defaultRouter.use("/parametr_symptop", parametrSymptomRouter);
