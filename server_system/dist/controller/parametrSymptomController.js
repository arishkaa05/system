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
const parametrSymptomModel_1 = __importDefault(require("../models/parametrSymptomModel"));
const sympromModel_1 = __importDefault(require("../models/sympromModel"));
const parametrModel_1 = __importDefault(require("../models/parametrModel"));
const ApiError = require("../error");
class ParametrSymptomController {
    createParametrSymptom(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parametrSymptomInfo = req.body;
                console.log(parametrSymptomInfo);
                const parametrSymptom = yield parametrSymptomModel_1.default.create(Object.assign({}, parametrSymptomInfo));
                return res.status(200).json({
                    parametrSymptomId: parametrSymptom.id,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при создании связи параметра и симптома!"));
            }
        });
    }
    getSymptomsByParametrId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parametrId = req.params.id;
                console.log(parametrId);
                const symptoms = yield sympromModel_1.default.findAll({
                    include: {
                        model: parametrModel_1.default,
                        where: {
                            id: parametrId,
                        },
                        through: {
                            attributes: [],
                        },
                    },
                });
                return res.status(200).json({
                    symptoms,
                });
            }
            catch (error) {
                return next(ApiError.badRequest("Ошибка при получении симптомов по параметру!"));
            }
        });
    }
}
module.exports = new ParametrSymptomController();
