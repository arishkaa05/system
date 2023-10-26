import { Request, Response, NextFunction } from "express";
import Patient from "../models/patientModel";
const ApiError = require("../error");

interface PatientDto {
  uq_patient: string;
  name: string;
  lastname: string;
  fathername?: string;
}

class PatientController {
  async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      
      const patientInfo = req.body;
      console.log(patientInfo);
      const candidate = await Patient.findOne({ where: { uq_patient: patientInfo.uq_patient } });

      if (candidate) return next(ApiError.badRequest("Пациент с таким UQ уже существует!"));
    
      const patient = await Patient.create({
        ...(patientInfo as PatientDto),
      });

      return res.status(200).json({
        patientId: patient.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании пациента!"));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await Patient.findAll();

      return res.status(200).json({
        patients: patients,
      });
  }  catch (e) {
        return next(ApiError.badRequest('Ошибка при получении пациентов!'))
    }
  }
}


module.exports = new PatientController();
