import { Request, Response, NextFunction } from "express";
import ParametrSymptom from "../models/parametrSymptomModel";
import Symptom from "../models/sympromModel";
import Parametr from "../models/parametrModel";
const ApiError = require("../error");

interface ParametrSymptomDto {
  symptopId: number;
  parametrId: number;
}

class ParametrSymptomController {
  async createParametrSymptom(req: Request, res: Response, next: NextFunction) {
    try {
      const parametrSymptomInfo = req.body;
      console.log(parametrSymptomInfo);

      const parametrSymptom = await ParametrSymptom.create({
        ...(parametrSymptomInfo as ParametrSymptomDto),
      });

      return res.status(200).json({
        parametrSymptomId: parametrSymptom.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании связи параметра и симптома!"));
    }
  }

  async getSymptomsByParametrId(req: Request, res: Response, next: NextFunction) {
    try {
      const parametrId = req.params.id;
      console.log(parametrId);
      const symptoms = await Symptom.findAll({
        include: {
          model: Parametr,
          where: {
            id: parametrId,
          },
          through: {
            attributes: [],
          },
        },
      });

      return res.status(200).json({
        symptoms,
      });
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при получении симптомов по параметру!"));
    }
  }
}

module.exports = new ParametrSymptomController();
