const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // get the token from the cookie
  if (!token)
    return next(new AppError("Access Denied: No Token Provided", 401));
  try {
    const verifedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifedToken;
    next();
  } catch (error) {
    return next(new AppError("Invalid Token", error));
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else {
    return next(new AppError("access Denied: Admins Only", 404));
  }
};
