"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const areaRouter_1 = require("./areaRouter");
const patientRouter_1 = require("./patientRouter");
const symptomRouter_1 = require("./symptomRouter");
const parametrRouter_1 = require("./parametrRouter");
const patientParametrRouter_1 = require("./patientParametrRouter");
const parametrSympromRouter_1 = require("./parametrSympromRouter");
exports.defaultRouter = (0, express_1.Router)();
exports.defaultRouter.use("/user", userRouter_1.userRouter);
exports.defaultRouter.use("/area", areaRouter_1.areaRouter);
exports.defaultRouter.use("/patient", patientRouter_1.patientRouter);
exports.defaultRouter.use("/symptom", symptomRouter_1.symptomRouter);
exports.defaultRouter.use("/parametr", parametrRouter_1.parametrRouter);
exports.defaultRouter.use("/patient_parametr", patientParametrRouter_1.patientParametrRouter);
exports.defaultRouter.use("/parametr_symptop", parametrSympromRouter_1.parametrSymptomRouter);
