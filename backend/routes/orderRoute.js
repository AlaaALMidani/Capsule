const express = require('express');
const router = express.Router();
const OrderServices = require('../services/orderServices');

router.post('/orders', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.createOrder(req.body, token);
  
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  });
  
  router.delete('/orders/:id', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.deleteOrder(req.params.id, token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });
  
  router.get('/orders/current', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.currentOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.get('/orders/previous', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.previousOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.get('/orders/all', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.getAllOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.post('/orders/repeat/:orderId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    const result = await OrderServices.repeatOrder(req.params.orderId, token);
  
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  module.exports = router;