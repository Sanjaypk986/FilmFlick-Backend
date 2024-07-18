const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  res.send("hellow world");
};
const getUserById = async (req, res) => {
  res.send("hellow world");
};
const addUser = async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;
    const email = await User.findOne({ email: data.email }).exec();
    if (!email) {
      const hash = bcrypt.hashSync(password, saltRounds);
      const user = new User({ ...data, password: hash });
      await user.save();
      res.status(201).json(user);
    } else {
      res.status(409).send("Email already exists");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).send("Bad Request");
  }
};
 
const updateUser = async (req, res) => {
  res.send("hellow world");
};
const deleteUser = async (req, res) => {
  res.send("hellow world");
};

module.exports = {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
