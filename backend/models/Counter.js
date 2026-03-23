const mongoose = require('mongoose');

// Lưu số đếm hiện tại cho từng collection
const counterSchema = new mongoose.Schema({
  _id: { type: String },       // tên counter, VD: 'productId'
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', counterSchema);
