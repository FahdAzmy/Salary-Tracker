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
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // السماح بإرسال الكوكيز
};
const Port = process.env.PORT || 4000;

app.use(cors(corsOptions));

app.use("/api/salarytracker", transactionRoute);
app.use("/api/salarytracker", userRoute);

// معالجة الأخطاء
app.all("*", NotFoundRoutes);
app.use(GlobalErrorHandler);

// الاتصال بقاعدة البيانات وبدء الخادم
app.listen(Port, () => {
  connecToDB();
  console.log("Server Listening on Port", Port);
});

// dataBase Passowrd
//7lurqHvkzcZSGyyD
