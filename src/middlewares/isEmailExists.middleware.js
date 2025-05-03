import User from "./../../db/models/user.model.js";

const isEmailExists = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) res.status(409).json({ message: "email already exists" });
  else next();
};

export default isEmailExists;
