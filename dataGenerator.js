const faker = require('faker');
const fs = require('fs');

const generateProduct = () => {
  const amountOfFeatures = Math.floor(Math.random() * 5);
  const features = [];

  for (let i = 0; i < amountOfFeatures; i++) {
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

const saveData = () => {

};

let result = generateProduct();

console.log(result);
