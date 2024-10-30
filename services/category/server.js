const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const categoryRoutes = require('./routes/category.routes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Category service running on port ${PORT}`);
});