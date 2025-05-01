import User from "../../db/models/user.model.js";

const RegisterUser = (res, req) => {};

const emailActivation = (res, req) => {};

const signIn = (res, req) => {};

const getAllUsers = (res, req) => {};

const getUserById = (res, req) => {};

const updateUser = (res, req) => {};

const deleteUser = (res, req) => {};

const forgetPassword = (res, req) => {}; //additional feature

const resetPassword = (res, req) => {}; //additional feature

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
