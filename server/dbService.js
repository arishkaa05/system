const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  //добавление параметра
  insertNewParametr = (newParam) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO parametrs(name_parametr,max_value_parametr, min_value_parametr, input_flag_parametr) VALUES(?, ?, ?, ?)";
      const values = [newParam.parametrName, newParam.parametrMax, newParam.parametrMin, 1];

      connection.query(sqlQuery, values, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          const insertedId = results.insertId;
          resolve(insertedId);
        }
      });
    });
  }
  //Получение всех параметров
  async getParametrList() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM parametrs;";
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  // добавление симптома
  insertNewSymptom = (newSymptom) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO symptoms(name_symptom, range_start_symptom, range_end_symptom, existance_symptom) VALUES(?, ?, ?, ?)";
      const values = [newSymptom.name_symptom, newSymptom.range_start_symptom.toString(), newSymptom.range_end_symptom.toString(), newSymptom.existance_symptom.toString()];

      connection.query(sqlQuery, values, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          const insertedIdSymptom = results.insertId; //запомнить ID
          resolve(insertedIdSymptom);
        }
      });
    });
  }
  //добавление симптомов параметру
  setSymptomByParametr = (idsymptom, newSymptom) => {
    return new Promise((resolve, reject) => {
    // patientData.patientSymptoms.forEach((element) => {
        const sqlQuery = "INSERT INTO parametrs_has_symptoms(parametrs_id_parametr, symptoms_id_symptom) VALUES(?,?)";
        const values = [newSymptom.id_parametr.toString(), idsymptom.toString()];

        connection.query(sqlQuery, values, function (error, results, fields) {
            if (error) {
            reject(error);
            } else {
              const insertedIdDirection = results.insertId;
            resolve(insertedIdDirection);
            }
        });
      // })
    });
  }
  //Получение всех симптомов
  async getSymptomList() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM symptoms;";

        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      // console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Получение всех симптомов по ID параметра
  async getSympromsByParametrId(parametrId) {
    // console.log('idpatient: ',  idpatient)
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT symptoms.* FROM symptoms INNER JOIN parametrs_has_symptoms ON symptoms.id_symptom = parametrs_has_symptoms.symptoms_id_symptom WHERE parametrs_has_symptoms.parametrs_id_parametr =" + parametrId;

        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //добавление направления
  insertNewArea = (newArea) => {
    console.log(newArea)
    return new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO area(name_area, formula_area, hash_area) VALUES(?, ?, ?)";
      const values = [newArea.name_area, newArea.formula_area, newArea.hash_area];

      connection.query(sqlQuery, values, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          const insertedId = results.insertId;
          resolve(insertedId);
        }
      });
    });
  }
  //добавление пациента
  insertNewPatient = (newPatient) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO people(uq_people,first_name_people, last_name_people, fathert_name_people) VALUES(?, ?, ?, ?)";
      const values = [newPatient.uq_people, newPatient.first_name_people, newPatient.last_name_people, newPatient.fathert_name_people];

      connection.query(sqlQuery, values, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          const insertedId = results.insertId;
          resolve(insertedId);
        }
      });
    });
  }
   //Получение всех пациентов
   async getPatientList() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM people;";
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  // //добавление параметра по пациенту
  // insertNewParametrByPatient = (newParamList) => {
  //   return new Promise((resolve, reject) => {
  //     console.log(newParamList)
  //     const sqlQuery = "INSERT INTO people_has_parametrs(people_id_people,parametrs_id_parametr, value_parametr, exactly_parametr) VALUES(?, ?, ?, ?)";
  //     const values = [newParamList.people_id_people.toString(), newParamList.parametrs_id_parametr.toString(), newParamList.value_parametr, newParamList.exactly_parametr];

  //     connection.query(sqlQuery, values, function (error, results, fields) {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         const insertedId = results.insertId;
  //         resolve(insertedId);
  //       }
  //     });
  //   });
  // }
  //добавление параметра по пациенту
  insertNewParametrByPatient = (newParamList) => {
    return new Promise((resolve, reject) => {
      console.log(newParamList)
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Преобразовать в нужный формат
      const sqlQuery = "INSERT INTO people_has_parametrs(people_id_people,parametrs_id_parametr, value_parametr, exactly_parametr, date_parametr) VALUES(?, ?, ?, ?, ?)";
      const values = [newParamList.people_id_people.toString(), newParamList.parametrs_id_parametr.toString(), newParamList.value_parametr, newParamList.exactly_parametr, currentDate];

      connection.query(sqlQuery, values, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          const insertedId = results.insertId;
          resolve(insertedId);
        }
      });
    });
  }

  //Получение всех параметров по ID пациента
  async getParametrsByPatient(patientId) {
    // console.log('idpatient: ',  idpatient)
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT people.uq_people,\
        people.first_name_people,\
        people.last_name_people,\
        people.fathert_name_people,\
        parametrs.name_parametr,\
        parametrs.id_parametr,\
        people_has_parametrs.exactly_parametr,\
        people_has_parametrs.date_parametr,\
        people_has_parametrs.value_parametr\
        FROM people\
        JOIN people_has_parametrs ON people.id_people = people_has_parametrs.people_id_people\
        JOIN parametrs ON people_has_parametrs.parametrs_id_parametr = parametrs.id_parametr\
        WHERE people.id_people =" + patientId;

        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Получение формул для областей
  async getArea() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM area;";
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;