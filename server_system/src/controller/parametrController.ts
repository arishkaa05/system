import { Request, Response, NextFunction } from "express";
import Parametr from "../models/parametrModel";
const ApiError = require("../error");

interface ParametrDto {
  name_parametr: string;
  max_value_parametr: number;
  min_value_parametr: number;
  input_flag_parametr: boolean;
}

class ParametrController {
  async createParametr(req: Request, res: Response, next: NextFunction) {
    try {
      const parametrInfo = req.body;
      console.log(parametrInfo);

      const parametr = await Parametr.create({
        ...(parametrInfo as ParametrDto),
      });

      return res.status(200).json({
        parametrId: parametr.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании симптома!"));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const parametrs = await Parametr.findAll();

      return res.status(200).json({
        parametrs: parametrs,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при получении симптомов!"));
    }
  }
}

module.exports = new ParametrController();
