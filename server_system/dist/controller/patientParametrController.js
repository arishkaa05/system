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
const patientParametrModel_1 = __importDefault(require("../models/patientParametrModel"));
const parametrModel_1 = __importDefault(require("../models/parametrModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const ApiError = require("../error");
class PatientParametrController {
    createPatientParametr(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientParametrInfo = req.body;
                console.log(patientParametrInfo);
                const patientParametr = yield patientParametrModel_1.default.create(Object.assign({}, patientParametrInfo));
                return res.status(200).json({
                    patientParametrId: patientParametr.id,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при создании связи пациента и параметра!"));
            }
        });
    }
    getParametrsByIdPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientId = req.params.id;
                console.log(patientId);
                const parametrs = yield patientModel_1.default.findByPk(req.params.id, {
                    attributes: ['uq_patient', 'name', 'lastname', 'fathername'],
                    include: [
                        {
                            model: parametrModel_1.default,
                            attributes: ['id', 'name_parametr'],
                            through: {
                                model: patientParametrModel_1.default,
                                attributes: ['value_parametr', 'exactly_parametr', 'createdAt']
                            }
                        }
                    ]
                });
                return res.status(200).json({
                    parametrs,
                });
            }
            catch (error) {
                return next(ApiError.badRequest("Ошибка при получении параметров по id пациента!"));
            }
        });
    }
}
module.exports = new PatientParametrController();
