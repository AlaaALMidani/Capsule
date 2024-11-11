const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://alaaalmedane:a1HdKaiPT566ySIY@cluster0.2d4jl.mongodb.net/Capsule-App',
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