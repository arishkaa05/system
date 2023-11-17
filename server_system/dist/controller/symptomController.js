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
const sympromModel_1 = __importDefault(require("../models/sympromModel"));
const ApiError = require("../error");
class SymptomController {
    createSymptom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const symptomInfo = req.body;
                console.log(symptomInfo);
                const symptom = yield sympromModel_1.default.create(Object.assign({}, symptomInfo));
                return res.status(200).json({
                    symptomId: symptom.id,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при создании симптома!"));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const symptoms = yield sympromModel_1.default.findAll();
                return res.status(200).json({
                    symptoms: symptoms,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при получении симптомов!"));
            }
        });
    }
}
module.exports = new SymptomController();
