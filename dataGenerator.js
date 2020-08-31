const faker = require('faker');
const fs = require('fs');

let style_id = 0; // eslint-disable-line camelcase

const generateProduct = () => {
  const amountOfFeatures = Math.floor(Math.random() * 5);
  const features = [];

  for (let i = 0; i < amountOfFeatures; i++) { // eslint-disable-line no-plusplus
    const feature = {};
    feature.feature = faker.commerce.productMaterial();
    feature.value = faker.commerce.productMaterial();
    features.push(feature);
  }

  const product = {
    name: faker.commerce.productName(),
    slogan: faker.fake('{{commerce.productAdjective}} {{commerce.productAdjective}} {{commerce.product}}'),
    description: faker.commerce.productDescription(),
    category: faker.commerce.product(),
    default_price: Math.ceil(Math.random() * 300),
    features,
  };

  return product;
};

const generateStyles = () => {
  const amountOfStyles = Math.ceil(Math.random() * 8);
  const setOfStyles = {};
  const styles = [];

  for (let i = 0; i < amountOfStyles; i++) { // eslint-disable-line no-plusplus
    const original_price = Math.ceil(Math.random() * 300); // eslint-disable-line camelcase
    const amountOfPhotos = Math.ceil(Math.random() * 12);
    const photos = [];

    for (let j = 0; j < amountOfPhotos; j++) { // eslint-disable-line no-plusplus
      const photo = {
        thumbnail_url: faker.image.imageUrl(),
        url: faker.image.imageUrl(),
      };
      photos.push(photo);
    }

    const shirtSkus = {
      XS: Math.floor(Math.random() * 40),
      S: Math.floor(Math.random() * 40),
      M: Math.floor(Math.random() * 40),
      L: Math.floor(Math.random() * 40),
      XL: Math.floor(Math.random() * 40),
      XXL: Math.floor(Math.random() * 40),
    };

    const shoeSkus = {
      '7': Math.floor(Math.random() * 40), //eslint-disable-line
      '8': Math.floor(Math.random() * 40), //eslint-disable-line
      '9': Math.floor(Math.random() * 40), //eslint-disable-line
      '10': Math.floor(Math.random() * 40), //eslint-disable-line
      '11': Math.floor(Math.random() * 40), //eslint-disable-line
      '12': Math.floor(Math.random() * 40), //eslint-disable-line
      '7 1/2': Math.floor(Math.random() * 40), //eslint-disable-line
      '8 1/2': Math.floor(Math.random() * 40), //eslint-disable-line
      '9 1/2': Math.floor(Math.random() * 40), //eslint-disable-line
      '10 1/2': Math.floor(Math.random() * 40), //eslint-disable-line
      '11 1/2': Math.floor(Math.random() * 40), //eslint-disable-line
    };

    const randomNumber = Math.floor(Math.random() * 2);
    let skus;

    if (randomNumber === 0) {
      skus = shirtSkus;
    } else {
      skus = shoeSkus;
    }

    const style = {
      style_id,
      name: faker.commerce.productName(),
      original_price,
      sale_price: Math.abs(original_price - Math.floor(Math.random() * 50)), // eslint-disable-line
      'default?': i === 0 ? 1 : 0,
      photos,
      skus,
    };
    style_id++; // eslint-disable-line
    styles.push(style);
  }
  setOfStyles.results = styles;
  return setOfStyles;
};

const generateRecords = (num, collectionName, callback, fileNumber) => {
  const data = [];
  for (let i = 0; i < num; i++) { // eslint-disable-line no-plusplus
    const entry = callback();
    entry.id = (fileNumber * 100000) + i;
    data.push(entry);
  }
  return data;
}

const writeRecords = (num, collectionName, callback) => {
  let fileNum = 0;
  let remainingRecords = num;

  while (remainingRecords >= 100000) {
    const data = JSON.stringify(generateRecords(100000, collectionName, callback, fileNum));
    fs.writeFileSync(`data/${collectionName}/${collectionName}${fileNum}.json`, data);
    remainingRecords -= 100000;
    fileNum++; // eslint-disable-line no-plusplus
  }
  if (remainingRecords > 0) {
    const data = JSON.stringify(generateRecords(100000, collectionName, callback, fileNum));
    fs.writeFileSync(`data/${collectionName}/${collectionName}${fileNum}.json`, data);
  }
}

const generateData = (numOfMillions) => {
  writeRecords(numOfMillions * 1000000, 'products', generateProduct);
  writeRecords(numOfMillions * 1000000, 'styles', generateStyles);
};

const start = Date.now();
generateData(1);
const timeTaken = Date.now() - start;
console.log('time taken', timeTaken);

//  10M records generated into 1 file (much slower)

// const writeRecords = (num, collectionName, callback) => {
//   for (let i = 0; i < num; i++) {
//     const data = JSON.stringify(callback(), null, 1);
//     fs.appendFileSync(`data/${collectionName}/${collectionName}.json`, data);
//   }
// };

// const generateData = (numOfMillions) => {
//   console.log('here we go!')
//   writeRecords(numOfMillions * 1000000, 'styles', generateStyles);
//   writeRecords(numOfMillions * 1000000, 'products', generateProduct);
//   console.log('done!');
// };

// let start = Date.now();
// generateData(10);
// let timeTaken = Date.now() - start;
// console.log('time taken', timeTaken);
