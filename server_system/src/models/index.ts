const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Пользователь
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  fathername: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// Роль пользователя
const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING(512), allowNull: false },
});

// Связывающая таблица
const UserRole = sequelize.define("user_role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Отношение пользователя и роли
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// Область
const Area = sequelize.define("area", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_area: { type: DataTypes.STRING, allowNull: false },
  formula_area: { type: DataTypes.STRING(512), allowNull: false },
  hash_area: { type: DataTypes.STRING(512), allowNull: false },
});

// Симптом
const Symptom = sequelize.define("symptop", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_symptop: { type: DataTypes.STRING, allowNull: false },
  range_start_symptom: { type: DataTypes.FLOAT, allowNull: false },
  range_end_symptom: { type: DataTypes.FLOAT, allowNull: false },
  existance_symptom: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

// Связывающая таблица
// const AreaSymptom = sequelize.define("area_symptop", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// // Отношение области и симптома
// Area.belongsToMany(Symptom, { through: AreaSymptom });
// Symptom.belongsToMany(Area, { through: AreaSymptom });

// Параметр
const Parametr = sequelize.define("parametr", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_parametr: { type: DataTypes.STRING, allowNull: false },
  max_value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  min_value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  input_flag_parametr: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

// Связывающая таблица
const ParametrSymptom = sequelize.define("parametr_symptop", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Отношение параметра и симптома
Parametr.belongsToMany(Symptom, { through: ParametrSymptom });
Symptom.belongsToMany(Parametr, { through: ParametrSymptom });

// Пациент
const Patient = sequelize.define("patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uq_patient: { type: DataTypes.STRING(512), allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  fathername: { type: DataTypes.STRING, allowNull: true },
});

// Связывающая таблица
const PatientParametr = sequelize.define("patient_parametr", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value_parametr: { type: DataTypes.FLOAT, allowNull: false },
  exactly_parametr: { type: DataTypes.INTEGER, allowNull: false }

});

// Отношение параметра и пациента
Patient.belongsToMany(Parametr, { through: PatientParametr });
Parametr.belongsToMany(Patient, { through: PatientParametr });

module.exports = {
  User,
  Role,
  Area,
  Symptom,
  Parametr,
  Patient,
  ParametrSymptom,
  PatientParametr
};
