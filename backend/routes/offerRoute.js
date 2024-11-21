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


router.get("/orderOffers", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, error: "Authorization token missing" });
  }
  const result = await OfferServices.getOrderOffers(token);
  if (!result.success) return res.status(404).json(result);
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {  
  const { id } = req.params;  
  const token = req.headers['authorization'];   
  const result = await OfferServices.getOfferById(id, token);   
  if (result.success) {  
    return res.status(200).json(result);
  } else {  
    return res.status(404).json(result); 
  }  
});  

module.exports = router;
