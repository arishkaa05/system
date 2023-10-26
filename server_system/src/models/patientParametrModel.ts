import Parametr from "./parametrModel";
import Patient from "./patientModel";

const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Связывающая таблица
const PatientParametr = sequelize.define("patient_parametr", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  exactly_parametr: { type: DataTypes.INTEGER, allowNull: false }

});


// Отношение параметра и пациента
Patient.belongsToMany(Parametr, { through: PatientParametr });
Parametr.belongsToMany(Patient, { through: PatientParametr });

export default PatientParametr;