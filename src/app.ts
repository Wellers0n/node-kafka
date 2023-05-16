import "dotenv/config";

import express from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { routes } from "./routes";

// @ts-ignore
import swaggerJson from "../swagger.json";

const port = process.env.PORT || 3001;

const app = express();


import * as dotenv from "dotenv";
import connectDatabase from "./database";

dotenv.config();

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const swaggerDocs = swaggerJsdoc(swaggerJson);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      docExpansions: "none",
      persistAuthorization: true,
    },
  })
);

app.listen(port, async () => {
  console.log(`We are live on ${port}`);
  console.log(`Environment: ${process.env.ENVIRONMENT}`);

  try {
    await connectDatabase();
    console.log("Database connected with success!");
  } catch (error) {
    console.log("Could not connect to database", { error });
    throw error;
  }
});
