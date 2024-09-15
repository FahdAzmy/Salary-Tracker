const express = require("express");
const cors = require("cors");
const connecToDB = require("./db/connectToDB");
const cookieParser = require("cookie-parser");
const transactionRoute = require("./Routes/transactionRoutes");
const userRoute = require("./Routes/userRoute");
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/errorHandling");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
const Port = process.env.PORT || 4000;

app.use("/api/salarytracker", transactionRoute);
app.use("/api/salarytracker", userRoute);

// app.all("*", NotFoundRoutes);
app.use(GlobalErrorHandler);

app.listen(Port, () => {
  connecToDB();
  console.log("Server Listening on Port", Port);
});
