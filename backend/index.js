const express = require("express");
const connecToDB = require("./db/connectToDB");
const cookieParser = require("cookie-parser");
const transactionRoute = require("./Routes/transactionRoutes");
const userRoute = require("./Routes/userRoute");
const cors = require("cors");
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/errorHandling");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // استبدل بهذا العنوان إذا كان مختلفاً
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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
