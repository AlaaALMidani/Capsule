const mongoose = require('mongoose'); 

const connect = async () => {  
  try {
    await mongoose.connect('mongodb://localhost:27017/capsule-app',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Re-throw the error to be handled by app.js
  }
};

module.exports = { connect };