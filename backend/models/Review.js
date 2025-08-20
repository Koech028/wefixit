const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  message: String,
  rating: Number,
  projectType: String,
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

module.exports = mongoose.model('Review', ReviewSchema);
