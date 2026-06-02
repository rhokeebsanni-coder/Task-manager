const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error.js");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("No token provided, authorization denied", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    throw new CustomError("Token is invalid", 401);
  }
};

module.exports = authMiddleware;
