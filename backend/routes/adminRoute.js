const express = require("express");
const router = express.Router();
const AdminServices = require("../services/adminService");

router.post("/addUser", async (req, res) => {
  const registered = await AdminServices.addUser(req.body);
  return res.send(registered);
});
router.get("/allUsers", async (req, res) => {
  const allUsers = await AdminServices.getAllUsers(req.body);
  return res.send(allUsers);
});

router.get("/users/:role", async (req, res) => {
  const users = await AdminServices.getUsers(req.params.role);
  return res.send(users);
});

//orders
router.get("/allOrders/", async (req, res) => {
  const orders = await AdminServices.getAllOrders();
  return res.send(orders);
});

router.get("/orders/", async (req, res) => {
  const orders = await AdminServices.getOrders(req.query.status);
  return res.send(orders);
});


//profiles
router.get("/profiles/userInfo/:userID", async (req, res) => {
  const user = await AdminServices.getProfile(req.params.userID);
  return res.send(user);
});

router.get("/profiles/userInfo", async (req, res) => {
  const user = await AdminServices.getProfile(req.user.id);
  return res.send(user);
});

router.get("/profiles/orders", async (req, res) => {
  console.log(req.query);
  const orders = await AdminServices.getUserOrders(req.query.userID,req.query.status);
  return res.send(orders);
});

router.get("/profiles/", async (req, res) => {
  console.log(req.query);
  const orders = await AdminServices.getUserOrders(req.query.userID,req.query.status);
  return res.send(orders);
});

router.patch("/profiles/toggleActivation", async (req, res) => {
  const user = await AdminServices.toggleActivation(req.query.userID);
  return res.send(user);
});
module.exports = router;
