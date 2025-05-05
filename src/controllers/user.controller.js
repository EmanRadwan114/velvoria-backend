import User from "./../../db/models/user.model";

// ^----------------------------------Get All Users--------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------Get User By ID--------------------------
const getUserById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------Update User By ID--------------------------
const updateUser = (req, res) => async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------Delete User By ID--------------------------
const deleteUser = (req, res) => async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
