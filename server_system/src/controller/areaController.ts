import { Request, Response, NextFunction } from "express";
const { Area } = require("../models");
const ApiError = require("../error");

interface AreaDto {
  name_area: string;
  formula_area: string;
  hash_area: string;
}

class AreaController {
  async createArea(req: Request, res: Response, next: NextFunction) {
    try {
      const areaInfo = req.body;

      console.log(areaInfo);

      const area = await Area.create({
        ...(areaInfo as AreaDto),
      });

      return res.status(200).json({
        areaId: area.id,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании области!"));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const areas = await Area.findAll();

      return res.status(200).json({
          areas: areas,
      });
  }  catch (e) {
        return next(ApiError.badRequest('Ошибка при получении областей!'))
    }
  }
}


module.exports = new AreaController();
