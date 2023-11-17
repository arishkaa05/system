"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Роль пользователя
const Role = sequelize.define("role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING(512), allowNull: false },
});
exports.default = Role;
