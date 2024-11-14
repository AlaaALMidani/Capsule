const express = require('express');
const router = express.Router();
const AdminServices = require('../services/adminService');



router.post('/addUser', async (req, res) => {
    const registered = await AdminServices.addUser(req.body);
    return res.send(registered)
}
)
router.get('/allUsers', async (req, res) => {
    const allUsers = await AdminServices.getAllUsers(req.body);
    return res.send(allUsers)
}
)

router.get('/users/:role', async (req, res) => {
    const users = await AdminServices.getUsers(req.params.role);
    return res.send(users)
}
)

//orders 
router.get('/orders/', async (req, res) => {
    const orders = await AdminServices.getAllOrders();
    return res.send(orders)
}
)




module.exports = router