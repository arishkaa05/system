"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symptomRouter = void 0;
const express_1 = require("express");
const symptomController = require("../controller/symptomController");
exports.symptomRouter = (0, express_1.Router)();
exports.symptomRouter.get("/all", symptomController.getAll);
exports.symptomRouter.post("/create", symptomController.createSymptom);
