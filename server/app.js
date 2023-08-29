const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended : false }));

//добавление параметров
app.post('/insertParametr', async (request, response) => {
  console.log(request.body)
  const { newParam } = request.body
  const db = dbService.getDbServiceInstance();
  console.log(newParam)
  try {
    const insertedId = await db.insertNewParametr(newParam);
    console.log(`Данные успешно добавлены с ID: ${insertedId}`);
  } catch (error) {
    console.log("Ошибка:", error);
  }
});
//получение параметров
app.get('/getParametrList', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getParametrList();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})
//добавление симптомов
app.post('/insertSymptom', async (request, response) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(request.body)
  const { newSymptom } = request.body
  const db = dbService.getDbServiceInstance();
  console.log(newSymptom)
  try {
    // newSymptomsList.forEach(async element => {
      console.log(111)
      const insertedIdSymptom = await db.insertNewSymptom(newSymptom);
      console.log(`Данные успешно добавлены с ID: ${insertedIdSymptom}`);
      const results = await db.setSymptomByParametr(insertedIdSymptom, newSymptom);
      console.log("Данные из таблицы:", results);
    //  });
  } catch (error) {
    console.log("Ошибка:", error);
  }
});
//получение симптомов
app.get('/getSymptomList', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getSymptomList();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})

//получение симптомов по id параметра
app.get('/getSympromsByParametrId', (request, response) => {
  const db = dbService.getDbServiceInstance();
  const parametrId = request.query.parametrId;
  const result = db.getSympromsByParametrId(parametrId);

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})
//добавление направления
app.post('/insertArea', async (request, response) => {
  console.log(request.body)
  const { newArea } = request.body
  const db = dbService.getDbServiceInstance();
  console.log(newArea)
  try {
    const insertedId = await db.insertNewArea(newArea);
    console.log(`Данные успешно добавлены с ID: ${insertedId}`);
  } catch (error) {
    console.log("Ошибка:", error);
  }
});
//добавление пациента
app.post('/insertPatient', async (request, response) => {
  console.log(request.body)
  const { newPatient } = request.body
  const db = dbService.getDbServiceInstance();
  console.log(newPatient)
  try {
    const insertedId = await db.insertNewPatient(newPatient);
    console.log(`Данные успешно добавлены с ID: ${insertedId}`);
  } catch (error) {
    console.log("Ошибка:", error);
  }
});
//получение пациентов
app.get('/getPatientList', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getPatientList();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})
//добавление параметров по пациенту
app.post('/insertParametrByPatient', async (request, response) => {
  const { newParamList } = request.body
  const db = dbService.getDbServiceInstance();
  console.log(newParamList)
  try {
    newParamList.forEach(async element => {
      const insertedId = await db.insertNewParametrByPatient(element);
      console.log(`Данные успешно добавлены с ID: ${insertedId}`);
    });
  } catch (error) {
    console.log("Ошибка:", error);
  }
});
//получение параметров по id пациентa
app.get('/getParametrsByPatient', (request, response) => {
  const db = dbService.getDbServiceInstance();
  const patientId = request.query.patientId;
  console.log(patientId)
  const result = db.getParametrsByPatient(patientId);

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})
//получение всех областей
app.get('/getArea', (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getArea();

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})
app.listen(process.env.PORT, () => console.log('app is running'));