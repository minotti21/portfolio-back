import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import service from "../service/service";

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { name, email, message },
    } = req;

    await service.sendEmail(name, email, message);

    res.status(200).send("Mensagem enviada com sucesso, vou responder em breve!");
  } catch (err) {
    next(err);
  }
};

const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quote = await service.getQuote();

    res.status(200).json(quote);
  } catch (err) {
    next(err);
  }
};

const controller = {
  sendEmail,
  getQuote,
};

export default controller;
