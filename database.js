const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product-overview', { useNewUrlParser: true, useUnifiedTopology: true });

const productsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
    {
      feature: String,
      value: String,
    },
  ],
});

const stylesSchema = mongoose.Schema({
  id: Number,
  results: [
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      'default?': Number,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: {},
    },
  ],
});

const Products = mongoose.model('products', productsSchema);
// Products.collection.createIndex({ id: 1 }, { unique: true });
// console.log('Products index created');
// Products.collection.dropIndexes();
// Console.log('Products index dropped');

const Styles = mongoose.model('styles', stylesSchema);
// Styles.collection.createIndex({ id: 1 }, { unique: true });
// console.log('Style index created');
// Styles.collection.dropIndexes();
// Console.log('Style index dropped');

module.exports = {
  Products,
  Styles,
};
