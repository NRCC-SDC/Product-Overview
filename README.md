# GreenCommerce Product Overview

> GreenCommerce is an e-commerce clothing retailer. I built out the back-end for the front-end legacy code and optimized it so that it could handle high web traffic.

## Achievements and Optimizations

- Seeded a MongoDB database with over 20 million records.
- Optimized Mongo query times through indexing.
- Stress tested with Artillery and New Relic

## Technologies Used

  - React
  - Node
  - Express
  - MongoDB
  - Artillery.io
  - New Relic

## Screenshot of Legacy Front-End

I created the Express routes and generated the database records you see rendered below.

![Screenshot](https://github.com/NRCC-SDC/Product-Overview/blob/master/legacy-front-end.png)

## Usage

To run this repo, you will need to install dependencies and run appropriate scripts.

## Requirements

- Node 6.13.0
- npm
- MongoDB

## Development

Executing the code below will install dependencies, seed the database, start the server, and start webpack. Examine the package.json file for additional scripts.

```
npm install
node dataGenerator.js
node seedDatabase.js
npm run start
npm run build
```
