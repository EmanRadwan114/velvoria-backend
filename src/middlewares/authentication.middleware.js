import jwt from "jsonwebtoken";
import verifyToken from "./../utils/verifyToken.js";

//* Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    // * 1- verify token
    const decoded = verifyToken(token, process.env.USER_TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      //* 1- Safely decode token payload without verifying signature
      const decoded = jwt.decode(token);

      //* 2- Redirect user to login page based on their role
      return res.redirect(`${process.env.FRONT_URL}/login/${decoded?.role}`);
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

export default authenticate;
