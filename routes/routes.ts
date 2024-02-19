import express from "express";
import controller from "../controller/controller";
import validations from "../middleware/validation";

const router = express.Router();

router.post("/email", validations.validateEntry, controller.sendEmail);

router.get("/quote", controller.getQuote);

export default router;
