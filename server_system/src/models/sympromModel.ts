const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Симптом
const Symptom = sequelize.define("symptop", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_symptop: { type: DataTypes.STRING, allowNull: false },
  range_start_symptom: { type: DataTypes.FLOAT, allowNull: false },
  range_end_symptom: { type: DataTypes.FLOAT, allowNull: false },
  existance_symptom: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

export default Symptom;