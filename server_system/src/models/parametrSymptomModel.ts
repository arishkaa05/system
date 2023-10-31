import Parametr from "./parametrModel";
import Symptom from "./sympromModel";

const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Связывающая таблица
const ParametrSymptom = sequelize.define("parametr_symptom", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


// Отношение параметра и симптома
Parametr.belongsToMany(Symptom, { through: ParametrSymptom });
Symptom.belongsToMany(Parametr, { through: ParametrSymptom });

export default ParametrSymptom;