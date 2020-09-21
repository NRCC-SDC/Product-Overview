'use strict';

function generateRandomNumber(userContext, events, done) {
  // generate data with Faker:
  const product_id = Math.floor(Math.random() * 10000000);
  // add variables to virtual user's context:
  userContext.vars.product_id = product_id;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomNumber,
};
