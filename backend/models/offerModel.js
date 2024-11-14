const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    senderID:{type:String,required:true},
    receiverID:{type:String,required:true},
    orderID:{type:String,required:true},
    cost:{type:Number,required:true},
    message:{type:String,required:true,minlength: 5,maxlength: 500 },
    sentAt: { type: Date, required: true, default: Date.now },
    estimatedCost:{type:Number}
})

const Offer = mongoose.model("Offer",offerSchema);

class OfferRepo{
    static create =  async (offerData)=>{
        const newOffer = new Offer(offerData)
        return await newOffer.save()
    }
    static findAll = async () =>{
        return await Offer.find()
    }
    static findById = async (id) =>{
        return await Offer.findById(id);
    }
    static findByOrderId = async (orderID)=>{
        return await Offer.find({orderID})
    }
    static findByReceiverId = async (receiverID)=>{
        return await Offer.find({receiverID})
    }
    static findBySenderId = async (senderID)=>{
        return await Offer.find({senderID})
    }
    static deleteOne = async (id)=>{
        return await Offer.findByIdAndDelete(id)
    }
    static update = async (id,offerData)=>{
        return await Offer.findByIdAndUpdate(id,offerData,{new:true})
    }
}
module.exports = {
    OfferRepo,
  };
  