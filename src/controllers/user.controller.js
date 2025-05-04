import bcrypt from "bcrypt";
import User from "../../db/models/user.model.js";
import generateToken from "./../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import verifyToken from "../utils/verifyToken.js";

const baseURL = process.env.BASE_URL;

// ^----------------------------------Registeration--------------------------
const RegisterUser = async (req, res) => {
  try {
    //* 1- check if email exists or not
    const { name, email, password } = req.body;

    if (!email)
      return res.status(400).json({ message: "please provide user email" });

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "email already exists" });
    }

    //* 2- hashing password
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.USER_PASS_SALT_ROUNDS
    );

    //* 3- save in db
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    //* 4- generate token for email activation
    const token = generateToken(
      { id: newUser._id },
      process.env.EMAIL_ACTIVATION_TOKEN_SECRET_KEY
    );

    //* 5- email activation
    const link = `${baseURL}/auth/users/email-activation/${token}`;
    sendEmail(newUser.email, link);

    //* 6- send success msg
    res.status(201).json({
      message: "user registered successfully",
      data: {
        id: newUser._id,
        name,
        email,
        isEmailActive: newUser.isEmailActive,
        role: newUser.role,
      },
    });
  } catch (err) {
    // * handle validation error => eg: when not passing required field
    if (err.name === "ValidationError") {
      const errors = {};

      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ message: "validation error", errors });
    }

    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------Email Activation--------------------------
const emailActivation = async (req, res) => {
  const { token } = req.params;

  const decoded = verifyToken(
    token,
    process.env.EMAIL_ACTIVATION_TOKEN_SECRET_KEY
  );

  const user = await User.findById({ _id: decoded.id });
  console.log(user);

  if (!user.isEmailActive) {
    user.isEmailActive = true;
    await user.save();
  }

  res.status(200).json({ message: "email is activated successfully", user });
};

// ^----------------------------------Login--------------------------
const signIn = async (req, res) => {
  try {
    //* 1- check if email exists or not
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ message: "please provide user email" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "email does not exist" });
    }

    //* 2- check if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "incorrect password" });

    //* 3- generate user token
    const token = generateToken(
      { email: user.email, id: user._id, role: user.role },
      process.env.USER_TOKEN_SECRET_KEY
    );

    //* 4- send token in http-only cookie to prevent js access
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //? 7 days
    });

    //* 4- send success msg
    res.status(200).json({ message: "successful login" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};

      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ message: "validation error", errors });
    }

    res.status(500).json({ message: "server error" });
  }
};

const getAllUsers = (req, res) => {};

const getUserById = (req, res) => {};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

const forgetPassword = (req, res) => {}; //additional feature

const resetPassword = (req, res) => {}; //additional feature

export default {
  RegisterUser,
  emailActivation,
  signIn,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
};
