const express = require('express');
const { getAllUser, getUserById, addUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router()

//get all User
router.get("/", getAllUser);
// get User by id
router.get("/:UserId", getUserById);
// add User
router.post("/", addUser);
// update User
router.patch("/:UserId", updateUser);
// delete User
router.delete("/:UserId",deleteUser);

module.exports = router