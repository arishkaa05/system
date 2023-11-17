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
const patientModel_1 = __importDefault(require("../models/patientModel"));
const ApiError = require("../error");
class PatientController {
    createPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientInfo = req.body;
                console.log(patientInfo);
                const candidate = yield patientModel_1.default.findOne({ where: { uq_patient: patientInfo.uq_patient } });
                if (candidate)
                    return next(ApiError.badRequest("Пациент с таким UQ уже существует!"));
                const patient = yield patientModel_1.default.create(Object.assign({}, patientInfo));
                return res.status(200).json({
                    patientId: patient.id,
                });
            }
            catch (e) {
                return next(ApiError.badRequest("Ошибка при создании пациента!"));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield patientModel_1.default.findAll();
                return res.status(200).json({
                    patients: patients,
                });
            }
            catch (e) {
                return next(ApiError.badRequest('Ошибка при получении пациентов!'));
            }
        });
    }
}
module.exports = new PatientController();
