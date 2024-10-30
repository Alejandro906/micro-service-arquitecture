const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Route proxies
app.use('/api/products', proxy('http://product-service:3001'));
app.use('/api/categories', proxy('http://category-service:3002'));
app.use('/api/users', proxy('http://user-service:3003'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});