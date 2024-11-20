const express = require('express');
const router = express.Router();
const OrderServices = require('../services/orderService');



router.post('/addOrder', OrderServices.upload, async (req, res) => {
  console.log(req.body)
  const token = req.headers.authorization?.split(' ')[1];
  const orderData = req.body;
  if (req.file) {
    orderData.photo = req.file.path.replace(/\\/g, '/'); 
  }
  const result = await OrderServices.createOrder(orderData, token, req);
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
  
  router.get('/ordersByStatus', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { status } = req.query;
    const result = await OrderServices.ordersByStatus(token,status);
  
      return res.status(200).json(result);
    
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

  router.put('/update/:orderId', OrderServices.upload, async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { orderId } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.photo = req.file.path.replace(/\\/g, '/');
    }
    const result = await OrderServices.updateOrder(orderId, updateData, token, req);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }

    
  });
  router.patch("/:orderId/status", async (req, res) => {
    const { orderId } = req.params;
    const { offerId, status } = req.body;
    const token = req.headers.authorization;
    const response = await OrderServices.updateStatus(orderId, offerId, status, token);
      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ error: response.error });
      }
  });
  module.exports = router;