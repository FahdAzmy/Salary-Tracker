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

// CORS middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://salary-tracker-front.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Other middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/salarytracker", transactionRoute);
app.use("/api/salarytracker", userRoute);

// Error handling
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);

const Port = process.env.PORT || 4000;

app.listen(Port, () => {
  connecToDB();
  console.log("Server Listening on Port", Port);
});

module.exports = app;
