import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  inStock: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
