// This file empties the Games collection and inserts the games below
const mongoose = require("mongoose");
const db = require("../models");


// Connect to the Mongo DB!
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/weplay");
mongoose.connect(MONGODB_URI , { useNewUrlParser: true });

const userSeed = [
  {
    name: 'David',
    email: 'dwat@email.com'
  },
  {
    name: 'Luke',
    email: 'luke.karlovich@gmail.com'
  },
];


db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
