import { Request, Response, NextFunction } from "express";
import Symptom from "../models/sympromModel";
const ApiError = require("../error");

interface SymptomDto {
  name_symptop: string;
  range_start_symptom: number;
  range_end_symptom: number;
  existance_symptom: boolean;
}

class SymptomController {
  async createSymptom(req: Request, res: Response, next: NextFunction) {
    try {
      const symptomInfo = req.body;
      console.log(symptomInfo);

      const symptom = await Symptom.create({
        ...(symptomInfo as SymptomDto),
      });

      return res.status(200).json({
        symptomId: symptom.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании симптома!"));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const symptoms = await Symptom.findAll();

      return res.status(200).json({
        symptoms: symptoms,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при получении симптомов!"));
    }
  }
}

module.exports = new SymptomController();
