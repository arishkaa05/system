"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roleModel_1 = __importDefault(require("./roleModel"));
const userModel_1 = __importDefault(require("./userModel"));
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// Связывающая таблица
const UserRole = sequelize.define("user_role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Отношение пользователя и роли
userModel_1.default.belongsToMany(roleModel_1.default, { through: UserRole });
roleModel_1.default.belongsToMany(userModel_1.default, { through: UserRole });
exports.default = UserRole;
