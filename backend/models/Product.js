const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Product', productSchema);