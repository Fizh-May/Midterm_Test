// const Product = require('./models/Product');
// const products = require('./products.json');

// const seedProducts = async () => {
//   try {
//     const count = await Product.countDocuments();
//     if (count === 0) {
//       await Product.insertMany(products);
//       console.log(`🌱 Đã seed ${products.length} sản phẩm vào MongoDB`);
//     } else {
//       console.log(`ℹ️  Đã có ${count} sản phẩm trong DB – bỏ qua seed`);
//     }
//   } catch (err) {
//     console.error('❌ Lỗi khi seed dữ liệu:', err.message);
//   }
// };

// module.exports = seedProducts;
