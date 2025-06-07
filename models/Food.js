const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Food', FoodSchema);
