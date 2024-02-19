import nodemailer from "nodemailer";
import { client } from "..";

const sendEmail = async (name: string, email: string, message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: "vinicius.minotti21@gmail.com",
      subject: `Nova mensagem de ${name}`,
      text: `E-mail: ${email} \nMensagem: ${message}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

const getQuote = async () => {
  try {
    const db = client.db("quotes-db");
    const collection = db.collection("quotes");
    const count = await collection.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomDocument = await collection.findOne({}, { skip: randomIndex });

    return randomDocument;
  } catch (err) {
    throw err;
  }
};

const service = {
  sendEmail,
  getQuote,
};

export default service;
