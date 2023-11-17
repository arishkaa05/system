"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const patientController = require("../controller/patientController");
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.get("/all", patientController.getAll);
exports.patientRouter.post("/create", patientController.createPatient);
