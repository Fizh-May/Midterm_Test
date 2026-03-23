const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Kết nối MongoDB và chạy server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Đã kết nối thành công với MongoDB');
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Lỗi kết nối MongoDB:', e.message);
  });