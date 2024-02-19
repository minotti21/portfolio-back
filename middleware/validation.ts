import { NextFunction, Request, Response } from "express";
import validator from "email-validator";

const validateEntry = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { name, email, message },
    } = req;

    if (!name || !email || !message) {
      throw new Error("É obrigatório preencher todos os campos!");
    }

    if (name.trim().length > 25) {
      throw new Error("O nome deve conter menos de 25 caracteres!");
    }

    if (!validator.validate(email)) {
      throw new Error("E-mail inválido!");
    }

    if (message.trim().length < 60) {
      throw new Error("A mensagem deve conter mais de 60 caracteres!");
    }

    if (message.trim().length > 600) {
      throw new Error("A mensagem deve conter menos de 600 caracteres!");
    }

    next();
  } catch (err) {
    res.status(422).send(err.message);
  }
};

const validations = {
  validateEntry,
};

export default validations;
