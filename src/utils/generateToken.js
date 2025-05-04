import jwt from "jsonwebtoken";

const generateToken = (tokenPayload, secretKey) => {
  const payload = { ...tokenPayload };
  const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

  return token;
};

export default generateToken;
