"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Симптом
const Symptom = sequelize.define("symptom", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_symptom: { type: DataTypes.STRING, allowNull: false },
    range_start_symptom: { type: DataTypes.FLOAT, allowNull: false },
    range_end_symptom: { type: DataTypes.FLOAT, allowNull: false },
    existance_symptom: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});
exports.default = Symptom;
