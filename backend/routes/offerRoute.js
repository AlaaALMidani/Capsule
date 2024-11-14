const express = require("express");
const router = express.Router();
const OfferServices = require("../services/offerService"); 

router.post("/addOffer", async (req, res) => {
  const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ success: false, error: "Authorization token missing" });
    }
  const offerData = req.body;
  const result = await OfferServices.createOffer(offerData, token);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
});

router.delete("/:id", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, error: "Authorization token missing" });
  }
  const { id } = req.params;
  const result = await OfferServices.deleteOneOffer(id, token);
  if (!result.success) return res.status(403).json(result);
  res.status(200).json(result);
});

router.put("/:id", async (req, res) => {
  const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ success: false, error: "Authorization token missing" });
    }
  const { id } = req.params;
  const offerData = req.body;
  const result = await OfferServices.updateOffer(id, offerData, token);
  if (!result.success) return res.status(403).json(result);
  res.status(200).json(result);
});


router.get("/myOffers", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, error: "Authorization token missing" });
  }
  const result = await OfferServices.getOffers(token);
  if (!result.success) return res.status(404).json(result);
  res.status(200).json(result);
});


router.get("/order/:orderID", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, error: "Authorization token missing" });
  }
  const { orderID } = req.params;
  const result = await OfferServices.getOrderOffers(token, orderID);
  if (!result.success) return res.status(404).json(result);
  res.status(200).json(result);
});

module.exports = router;
