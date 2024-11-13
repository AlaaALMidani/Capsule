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
router.get("/orders/", async (req, res) => {
  const orders = await AdminServices.getAllOrders();
  return res.send(orders);
});

router.get("/orders/completed", async (req, res) => {
  const orders = await AdminServices.getOrders("completed");
  return res.send(orders);
});

router.get("/orders/pending", async (req, res) => {
  const orders = await AdminServices.getOrders("pending");
  return res.send(orders);
});

router.get("/orders/inProgress", async (req, res) => {
  const orders = await AdminServices.getOrders("inProgress");
  return res.send(orders);
});

router.get("/orders/canseled", async (req, res) => {
  const orders = await AdminServices.getOrders("canseled");
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
  const orders = await AdminServices.getUserOrders(req.query.id,req.query.status);
  return res.send(orders);
});

module.exports = router;
