const express = require('express');
const { addMessage, getAllMessage } = require('../controllers/messageController');
const { route } = require('./userRoutes');

const router =express.Router();



router.post("/addmsg",addMessage)
router.post("/getmsg/",getAllMessage)




module.exports =router