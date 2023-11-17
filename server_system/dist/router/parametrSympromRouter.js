"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametrSymptomRouter = void 0;
const express_1 = require("express");
const parametrSymptomController = require("../controller/parametrSymptomController");
exports.parametrSymptomRouter = (0, express_1.Router)();
exports.parametrSymptomRouter.get("/get_symptoms_by_id/:id", parametrSymptomController.getSymptomsByParametrId);
exports.parametrSymptomRouter.post("/create", parametrSymptomController.createParametrSymptom);
