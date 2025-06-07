const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Meal', MealSchema);
