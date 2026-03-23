const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Counter = require('../models/Counter');


// 1. GET /products - Lấy danh sách sản phẩm (Có Bonus: filter & search)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// 2. GET /products/:id - Lấy chi tiết 1 sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi ID không hợp lệ", error });
  }
});

// 3. POST /products - Thêm sản phẩm mới
router.post('/', async (req, res) => {
  try {
    const { name, category, price, image, stock } = req.body;

    // Validate
    if (!name || !category || price == null || !image || stock == null) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    if (price <= 0) {
      return res.status(400).json({ message: "Giá phải lớn hơn 0" });
    }
    if (stock < 0) {
      return res.status(400).json({ message: "Tồn kho không được âm" });
    }

    // Lấy ID tiếp theo từ Counter (tạo mới nếu chưa có)
    const counter = await Counter.findByIdAndUpdate(
      'productId',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newProduct = new Product({ _id: counter.seq, name, category, price, image, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("=== LỖI THÊM SẢN PHẨM ===", error);
    res.status(400).json({ message: "Lỗi thêm sản phẩm: " + error.message });
  }
});


// 4. PUT /products/:id - Cập nhật sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Trả về data mới và chạy lại các rule validate (min: 0)
    );
    if (!updatedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Lỗi cập nhật", error });
  }
});

// 5. DELETE /products/:id - Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });
    res.json({ message: "Đã xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;