"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parametrModel_1 = __importDefault(require("./parametrModel"));
const patientModel_1 = __importDefault(require("./patientModel"));
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Связывающая таблица
const PatientParametr = sequelize.define("patient_parametr", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value_parametr: { type: DataTypes.FLOAT, allowNull: false },
    exactly_parametr: { type: DataTypes.INTEGER, allowNull: false }
}, {
    constraints: false,
    unique: false,
});
// Отношение параметра и пациента
patientModel_1.default.belongsToMany(parametrModel_1.default, { through: { model: PatientParametr, unique: false } });
parametrModel_1.default.belongsToMany(patientModel_1.default, { through: { model: PatientParametr, unique: false } });
exports.default = PatientParametr;
