"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const areaModel_1 = __importDefault(require("../models/areaModel"));
const ApiError = require("../error");
class AreaController {
    createArea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const areaInfo = req.body;
                console.log(areaInfo);
                const area = yield areaModel_1.default.create(Object.assign({}, areaInfo));
                return res.status(200).json({
                    areaId: area.id,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при создании области!"));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const areas = yield areaModel_1.default.findAll();
                return res.status(200).json({
                    areas: areas,
                });
            }
            catch (e) {
                return next(ApiError.badRequest('Ошибка при получении областей!'));
            }
        });
    }
}
module.exports = new AreaController();
