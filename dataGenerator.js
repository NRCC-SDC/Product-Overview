const faker = require('faker');
const fs = require('fs');

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
    default_price: Math.floor(Math.random() * 300),
    features,
  };

  return product;
};

const generateProductData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) { // eslint-disable-line no-plusplus
    const entry = generateProduct();
    data.push(entry);
  }
  return data;
};

const saveData = (numOfRecords) => {
  const data = JSON.stringify(generateProductData(numOfRecords));
  fs.writeFile('productData.json', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!'); // eslint-disable-line no-console
  });
};

saveData(10);
