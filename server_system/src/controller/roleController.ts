import { Request, Response, NextFunction } from "express";
const { User, Role } = require("../models");
const ApiError = require("../error");

class RoleController {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, description } = req.body;
      console.log(value, description);
      await Role.create({ value, description });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка при изменении роли!"));
    }
  }
}
