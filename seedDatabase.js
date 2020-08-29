const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: 'mongodb://127.0.0.1:27017/product-overview',
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

console.log(collections);

seeder
  .import(collections)
  .then(() => {
    console.log('success!'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.log('error', err); // eslint-disable-line no-console
  });
