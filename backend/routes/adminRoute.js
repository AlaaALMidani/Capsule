const express = require('express');
const router = express.Router();
const AdminServices = require('../services/adminService');



router.post('/addUser', async (req, res) => {
    const registered = await AdminServices.addUser(req.body);
    return res.send(registered)
}
)

module.exports = router