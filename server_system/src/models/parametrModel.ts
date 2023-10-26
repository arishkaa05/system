const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Параметр
const Parametr = sequelize.define("parametr", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_parametr: { type: DataTypes.STRING, allowNull: false },
  max_value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  min_value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  input_flag_parametr: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

export default Parametr;