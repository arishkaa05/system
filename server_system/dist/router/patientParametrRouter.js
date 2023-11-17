"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientParametrRouter = void 0;
const express_1 = require("express");
const patientParametrController = require("../controller/patientParametrController");
exports.patientParametrRouter = (0, express_1.Router)();
exports.patientParametrRouter.get("/get_parametrs_by_id/:id", patientParametrController.getParametrsByIdPatient);
exports.patientParametrRouter.post("/create", patientParametrController.createPatientParametr);
