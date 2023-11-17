"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametrRouter = void 0;
const express_1 = require("express");
const parametrController = require("../controller/parametrController");
exports.parametrRouter = (0, express_1.Router)();
exports.parametrRouter.get("/all", parametrController.getAll);
exports.parametrRouter.post("/create", parametrController.createParametr);
