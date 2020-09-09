const { execSync } = require('child_process');

const seedCollection = (collectionName, num) => {
  for (let i = 0; i < num; i++) { // eslint-disable-line no-plusplus
    const command = `mongoimport -d product-overview -c ${collectionName} --file data/${collectionName}/${collectionName}${i}.json --jsonArray`;
    execSync(command);
  }
  execSync(`mongo product-overview --eval "db.${collectionName}.createIndex({ id: 1 }, { unique: true }, { background: true })"`)
};

const seedDatabase = (numOfFiles) => {
  seedCollection('products', numOfFiles);
  seedCollection('styles', numOfFiles);
};

const start = Date.now();
seedDatabase(100);
const timeTaken = Date.now() - start;
console.log('time taken', timeTaken / 60000, 'min'); // eslint-disable-line no-console

//  Time taken for 1M documents: 4.5 min. || 4.461 min. || 4.794133333333333 min.
//  Time taken for 10M documents: 44.44 min. || 62.83 min

mongo dbname --eval "db.articles.ensureIndex({'text':'text'})"

//  Async version using spawn - takes a similar amount of time for 1M documents.
//  Much faster for 10M, but highly inaccurate
// const { spawn } = require('child_process');

// const seedCollection = (collectionName, num) => {
//   const start = Date.now();
//   for (let i = 0; i < num; i++) { // eslint-disable-line no-plusplus
//     const mongoimport = spawn('mongoimport',
//      ['-d', 'product-overview-1M', '-c', `${collectionName}`, '--file',
//       `data/${collectionName}/${collectionName}${i}.json`, '--jsonArray'])
//     mongoimport.stdout.on('data', (data) => {
//       console.log(`stdout: ${data}`); // eslint-disable-line no-console
//     });

//     mongoimport.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`); // eslint-disable-line no-console
//     });

//     mongoimport.on('close', (code) => {
//       console.log(`child process exited with code ${code}`); // eslint-disable-line no-console
//       const timeTaken = Date.now() - start;
//       console.log('time taken', timeTaken / 60000, 'min'); // eslint-disable-line no-console
//     });
//   }
// };

// const seedDatabase = (numOfFiles) => {
//   seedCollection('products', numOfFiles);
//   seedCollection('styles', numOfFiles);
// };

// seedDatabase(20);

//  Time taken for 1M: 4.32 min. || 4.55 min.
//  Time taken for 2M: 9.4995 min.
//  Time taken for 10M: 15.1542 min.
//  only 8 million products and 1.5 styles in database - inaccurate
