import Product from '../models/product.model.js';

//    Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

//    Get single product
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

//     Create a product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = new Product({ name, description, price, inStock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

//     Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.inStock = inStock ?? product.inStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//     Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
