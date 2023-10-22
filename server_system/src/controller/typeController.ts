import { Request, Response, NextFunction } from "express";
const { Type, Rid } = require("../models");
const ApiError = require("../error");

class TypeController {
  async getType(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      let types;
      if (name === undefined) {
        types = await Type.findAll({ where: {}, order: [["name", "ASC"]] });
      } else {
        types = await Type.findOne({ where: { name } });
      }
      let typesToSend: any = [];
      await Promise.all(
        Array.from(types).map(async (item: any) => {
          let ridWithItem = await Rid.findAll({
            where: {
              typeId: item.id,
            },
          });
          let newItem = { id: item.id, name: item.name, canDelete: !ridWithItem.length };
          typesToSend.push(newItem);
        })
      );
      return res.status(200).json(typesToSend.sort((a: any, b: any) => a.name > b.name));
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при получении видов!"));
    }
  }

  async createType(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      let type = await Type.create({ name });
      return res.status(200).json(type);
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при создании вида!"));
    }
  }

  async deleteType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      let type = await Type.destroy({ where: { id } });
      return res.status(200).json(type);
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при удалении вида!"));
    }
  }

  async editType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, updated } = req.body;
      let type = await Type.update({ name: updated }, { where: { id } });
      return res.status(200).json(type);
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при изменении вида!"));
    }
  }
}

module.exports = new TypeController();
