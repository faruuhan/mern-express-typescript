require("dotenv").config();
require("./config/database").connect();
import express from "express";
import cors from "cors";
import router from "./routes/routes";

const app = express();
var corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use("/assets", express.static("assets"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export default app;
