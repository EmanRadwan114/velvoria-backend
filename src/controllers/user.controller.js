import User from "../../db/models/user.model.js";

const RegisterUser = (req, res) => {
  // try {
  //   //* use case 1 ==> check if
  // } catch (err) {
  //   console.log(err);
  // }

  res.json("hi");
};

const emailActivation = (req, res) => {};

const signIn = (req, res) => {};

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
