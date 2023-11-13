import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

require("dotenv").config();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer();

server.listen(3030, () => {
  console.log("Server listen in http://localhost:3030");
});

mongoose.Promise = Promise;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  });

app.use("/", router());
