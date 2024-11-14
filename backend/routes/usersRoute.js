const express = require('express');
const router = express.Router();
const UserServices = require('../services/userService');



router.post('/login',async (req, res) => {
    const loggedIn = await UserServices.login(req.body);
    res.send(loggedIn)
})

module.exports = router   
