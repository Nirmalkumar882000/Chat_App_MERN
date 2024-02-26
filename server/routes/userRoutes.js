const express = require('express');
const router =express.Router();
const {registerUser, loginUser, avatharUser,getUser, logOut } = require('../controllers/userController');

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/image/:id",avatharUser)
router.get("/:id",getUser)
router.post("/logout/:id",logOut)






module.exports =router