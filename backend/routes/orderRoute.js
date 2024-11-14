const express = require('express');
const router = express.Router();
const OrderServices = require('../services/orderService');
const orderService = require('../services/orderService');

router.post('/addOrder', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.createOrder(req.body, token);
  
    if (result.success) {
      return res.status(201).json(result);
    } else {  
      return res.status(400).json(result);
    }
  });
  
  router.delete('/:orderId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.deleteOrder(req.params.orderId, token);
 
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
});
  
  router.get('/current', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.currentOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    } 
  });

  router.get('/previous', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.previousOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.get('/all', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const result = await OrderServices.getAllOrders(token);
  
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.post('/repeat/:orderId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    const result = await OrderServices.repeatOrder(req.params.orderId, token);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  });

  router.put('/update/:orderId', async (req, res) => {  
    const token = req.headers.authorization?.split(' ')[1];   
    const orderId = req.params.orderId; 
    const updateData = req.body; 

    const result = await OrderServices.updateOrder(orderId, updateData, token); 

    if (result.success) {  
        return res.status(200).json(result); 
    } else {  
        return res.status(400).json(result);
    }  
});
  module.exports = router;