"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areaRouter = void 0;
const express_1 = require("express");
const areaController = require("../controller/areaController");
exports.areaRouter = (0, express_1.Router)();
exports.areaRouter.get("/all", areaController.getAll);
exports.areaRouter.post("/create", areaController.createArea);
