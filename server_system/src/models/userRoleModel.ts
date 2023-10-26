import Role from "./roleModel";
import User from "./userModel";

const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Связывающая таблица
const UserRole = sequelize.define("user_role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


// Отношение пользователя и роли
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });


export default UserRole;