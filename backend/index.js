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

// CORS configuration
const corsOptions = {
  origin: "https://salary-tracker-front.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

const Port = process.env.PORT || 4000;

app.use("/api/salarytracker", transactionRoute);
app.use("/api/salarytracker", userRoute);

// Error handling
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);

app.listen(Port, () => {
  connecToDB();
  console.log("Server Listening on Port", Port);
});

module.exports = app;
