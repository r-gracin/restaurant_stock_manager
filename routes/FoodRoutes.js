const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// GET all foods
router.get('/', async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// POST create food

// router.post('/', async (req, res) => {
//   const { name, type, price, amount } = req.body;
//   const food = new Food({ name, type, price, amount });
//   await food.save();
//   res.status(201).json(food);
// });

router.post('/', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT update food
router.put('/:id', async (req, res) => {
  const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE food
router.delete('/:id', async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: 'Food deleted' });
});

module.exports = router;
