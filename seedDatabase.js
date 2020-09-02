const { execSync } = require('child_process');

const seedCollection = (collectionName, num) => {
  for (let i = 0; i < num; i++) { // eslint-disable-line no-plusplus
    const command = `mongoimport -d product-overview -c ${collectionName} --file data/${collectionName}/${collectionName}${i}.json --jsonArray`;
    execSync(command);
  }
};

const seedDatabase = (numOfFiles) => {
  seedCollection('products', numOfFiles);
  seedCollection('styles', numOfFiles);
};

const start = Date.now();
seedDatabase(100);
const timeTaken = Date.now() - start;
console.log('time taken', timeTaken / 60000, 'min'); // eslint-disable-line no-console

//  Time taken for 1M documents: 4.5 min.
//  Time taken for 10M documents: 44.44 min.
