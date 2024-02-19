import express from "express";
import router from "./routes/routes";
import cors from "./middleware/cors";
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";
import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.DATABASE_URL);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();
    app.use(express.json());
    app.use(cors);
    app.use(router);
    app.use(errorHandler);

    app.listen(process.env.PORT, () => {
      console.log(`Server running`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
