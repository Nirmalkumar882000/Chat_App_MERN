const express = require('express');
const router =express.Router();
const {registerUser, loginUser, avatharUser,getAllUsers, logOut } = require('../controllers/userController');

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/setAvatar/:id",avatharUser)
router.get("/allusers/:id",getAllUsers)
router.post("/logout/:id",logOut)




module.exports =router