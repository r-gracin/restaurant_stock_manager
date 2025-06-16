// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const foodRoutes = require('./routes/foodRoutes');
const mealRoutes = require('./routes/mealRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/meals', mealRoutes);
// app.get('/', (req, res) => {
//     res.send('Server is not working!');
//   });

// Catch unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Serve React static files
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all for client-side routing
app.use('/ali', function(req, res) {
  // res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  res.send("ola");
});

const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.error(err));
