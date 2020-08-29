const express = require('express');
const { Products, Styles } = require('./database');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/:productId', express.static('public'));

app.get('/products/list', (req, res) => {
  Products.find({})
    .then((data) => {
      res.send(data);
    });
});

app.get('/products/:product_id', (req, res) => {
  Products.find({ id: req.params.product_id })
    .then((data) => {
      console.log('data', data);
      res.send(data[0]);
    }).catch((err) => {
      console.log('error', err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  Styles.find({ product_id: req.params.product_id })
    .then((data) => {
      res.send(data[0]);
    }).catch((err) => {
      console.log('error', err);
    });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`); // eslint-disable-line no-console
});
