require('newrelic');
const express = require('express');
const { Products, Styles } = require('./database');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/:productId', express.static('public'));

let start;

start = Date.now();
app.get('/products/list', (req, res) => {
  Products.find({})
    .then((data) => {
      const timeTaken = Date.now() - start;
      console.log('time taken', timeTaken / 60000, 'min'); // eslint-disable-line no-console
      res.send(data);
    }).catch((err) => {
      console.log('error', err); // eslint-disable-line no-console
    });
});

//  Overflows Javascript heap

start = Date.now();
app.get('/products/:product_id', (req, res) => {
  Products.find({ id: req.params.product_id })
    .then((data) => {
      const timeTaken = Date.now() - start;
      console.log('time taken', timeTaken / 1000, 'sec'); // eslint-disable-line no-console
      res.send(data[0]);
    }).catch((err) => {
      console.log('error', err); // eslint-disable-line no-console
    });
});

//  Time taken with 1M records in database:
//  After indexing: 18.025 sec

//  Time taken with 10M records in database:
//  Time taken: 28.395 sec
//  Time taken with indexing: 4.165 sec || 2.882 sec

start = Date.now();
app.get('/products/:product_id/styles', (req, res) => {
  Styles.find({ id: req.params.product_id })
    .then((data) => {
      console.log('data', data);
      const timeTaken = Date.now() - start;
      console.log('time taken', timeTaken / 1000, 'sec'); // eslint-disable-line no-console
      res.send(data[0]);
    }).catch((err) => {
      console.log('error', err); // eslint-disable-line no-console
    });
});

//  After indexing:
//  Time taken with 1M records in database: 28.684 sec

//  Time taken with 10M records in database:
//  Time taken: 134.138 sec (socket hangs up before it can be sent)
//  Time taken: 237.964 sec (socket hangs up before it can be sent)

//  After Indexing: 8.217 sec

app.listen(port, () => {
  console.log(`server is listening on port ${port}`); // eslint-disable-line no-console
});
