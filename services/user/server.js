const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/user.routes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});