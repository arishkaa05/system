"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Область
const Area = sequelize.define("area", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_area: { type: DataTypes.STRING, allowNull: false },
    formula_area: { type: DataTypes.STRING(512), allowNull: false },
    hash_area: { type: DataTypes.STRING(512), allowNull: false, unique: true },
});
exports.default = Area;
