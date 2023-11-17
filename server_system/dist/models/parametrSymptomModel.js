"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parametrModel_1 = __importDefault(require("./parametrModel"));
const sympromModel_1 = __importDefault(require("./sympromModel"));
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Связывающая таблица
const ParametrSymptom = sequelize.define("parametr_symptom", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Отношение параметра и симптома
parametrModel_1.default.belongsToMany(sympromModel_1.default, { through: ParametrSymptom });
sympromModel_1.default.belongsToMany(parametrModel_1.default, { through: ParametrSymptom });
exports.default = ParametrSymptom;
