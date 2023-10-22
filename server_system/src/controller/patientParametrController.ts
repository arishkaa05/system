import { Request, Response, NextFunction } from "express";
const { PatientParametr, Patient, Parametr } = require("../models");
const ApiError = require("../error");

interface PatientParametrDto {
  patientId: number;
  parametrId: number;
  value_parametr: number;
  exactly_parametr: number;
}

class PatientParametrController {
  async createPatientParametr(req: Request, res: Response, next: NextFunction) {
    try {
      const patientParametrInfo = req.body;
      console.log(patientParametrInfo);

      const patientParametr = await PatientParametr.create({
        ...(patientParametrInfo as PatientParametrDto),
      });

      return res.status(200).json({
        patientParametrId: patientParametr.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании связи пациента и параметра!"));
    }
  }

  async getParametrsByIdPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const patientId = req.params.id;
      console.log(patientId);
      const parametrs = await Parametr.findAll({
        include: {
          model: Patient,
          where: {
            id: patientId,
          },
          through: {
            attributes: [],
          },
        },
      });

      return res.status(200).json({
        parametrs,
      });
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при получении параметров по id пациента!"));
    }
  }
}

module.exports = new PatientParametrController();
