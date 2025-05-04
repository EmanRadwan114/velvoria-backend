import jwt from "jsonwebtoken";
import verifyToken from "./../utils/verifyToken";

//* Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized, no token provided" });
  }

  const decoded = verifyToken(token, process.env.USER_TOKEN_SECRET_KEY);

  //? Save user info (from payload) to request object
  if (decoded.role === "user") {
    req.user = decoded;
  } else if (decoded.role === "admin") {
    req.admin = decoded;
  }

  next();
};

export default authenticate;
