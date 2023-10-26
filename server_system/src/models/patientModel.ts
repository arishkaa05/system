const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Пациент
const Patient = sequelize.define("patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uq_patient: { type: DataTypes.STRING(512), allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  fathername: { type: DataTypes.STRING, allowNull: true },
});

export default Patient;