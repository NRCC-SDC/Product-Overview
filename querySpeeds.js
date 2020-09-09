const { Products, Styles } = require('./database');

Products.find({ id: 21 }).explain("executionStats")
  .then((data) => {
    console.log('Time taken for Product query', data[0].executionStats.executionTimeMillis, 'ms'); // eslint-disable-line no-console
  }).catch((err) => {
    console.log('error', err); // eslint-disable-line no-console
  });

//  Times taken with 1M records
//  Without indexing: 1736 ms (1.736 sec) || 1801 ms (1.801 sec) || 1868 ms (1.868 sec) || 2027 ms (2.027 sec) || 2982 ms (2.982 sec) || 3201 ms (3.201 sec) || 1673 ms (1.673 sec) || 1643 ms (1.643 sec)
//  With indexing: 0 ms || 2 ms || 0 ms || 0 ms || 8 ms || 0 ms || 0 ms || 0 ms || 20 ms || 0 ms || 0 ms

//  Time taken with 10M records
//  Without indexing: 43848 ms (43.848 sec) || 58605 ms (58.605 sec) || 34175 ms (34.175 sec) || 35409 ms (35.409 sec)
//  With indexing: 19 ms || 10 ms || 9 ms || 0 ms || 0 ms || 0 ms

Styles.find({ id: 100 }).explain("executionStats")
  .then((data) => {
    console.log('Time taken for Styles query', data[0].executionStats.executionTimeMillis, 'ms'); // eslint-disable-line no-console
  }).catch((err) => {
    console.log('error', err); // eslint-disable-line no-console
  });

//  Times taken with 1M records
//  Without indexing: 10338 ms (10.338 sec) || 12636 ms (12.636 sec) || 7609 ms (7.609 sec) || 8540 ms (8.540 sec) || 21159 ms (21.159 sec) || 16276 ms (16.276 sec) || 5518 ms (5.518 sec) || 5928 ms (5.928 sec)
//  With indexing: 0 ms || 2 ms || 0 ms || 0 ms || 10 ms || 0 ms || 0 ms || 0 ms || 17 ms || 0 ms || 0 ms

//  Times taken with 10M records
//  Without indexing: 144893 ms (2.41 min.) || 53875 ms (4.23 min) || 173201 ms (2.88 min.)
//  With indexing: 7 ms || 0 ms || 0 ms || 0 ms || 0 ms || 1 ms