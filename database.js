const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product-overview', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = mongoose.Schema({
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
  product_id: Number,
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

const Product = mongoose.model('Product', productSchema);

const Styles = mongoose.model('Styles', stylesSchema);

module.exports = {
  Product,
  Styles,
};
