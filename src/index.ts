// ChatGPT
// ask about each of the following dependencies individually, understand http
// ask about callback functions
// Mongodb: username: pjomehri - password: Czltm4TA8DOSaZ0B

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { Promise } from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server running on http://localhost:8080/");
});

const MONGO_URL =
  "mongodb+srv://pjomehri:Czltm4TA8DOSaZ0B@cluster0.3qhoodu.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
