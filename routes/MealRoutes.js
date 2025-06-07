const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const Food = require('../models/Food');

// GET all meals
router.get('/', async (req, res) => {
  const meals = await Meal.find().populate('items.foodId');
  res.json(meals);
});

// POST create meal
router.post('/', async (req, res) => {
  const { name, items } = req.body;

  let totalPrice = 0;
  for (const item of items) {
    const food = await Food.findById(item.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    totalPrice += item.quantity * food.price;
  }

  const meal = new Meal({ name, items, totalPrice });
  await meal.save();
  res.status(201).json(meal);
});

// PUT update meal
router.put('/:id', async (req, res) => {
  const { name, items } = req.body;

  let totalPrice = 0;
  for (const item of items) {
    const food = await Food.findById(item.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    totalPrice += item.quantity * food.price;
  }

  const updatedMeal = await Meal.findByIdAndUpdate(
    req.params.id,
    { name, items, totalPrice },
    { new: true }
  );

  res.json(updatedMeal);
});

// DELETE meal
router.delete('/:id', async (req, res) => {
  await Meal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Meal deleted' });
});

module.exports = router;
