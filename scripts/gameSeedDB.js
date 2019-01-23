// This file empties the Games collection and inserts the games below
const mongoose = require("mongoose");
const db = require("../models");

// Connect to the Mongo DB!
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/weplay");
mongoose.connect(MONGODB_URI , { useNewUrlParser: true });


const gameSeed = [
  {
    title: "Soccer @ Piedmont",
    sport: 'Soccer',
    author: "David Watson",
    date: new Date(Date.now()),
    authorEmail: 'mdwat@email.com'
  },
  {
    title: "Soccer @ Piedmont",
    sport: 'Soccer',
    author: "David Watson",
    date: new Date(Date.now()),
    authorEmail: 'mdwat@email.com'
  },
  {
    title: "Football @ Wash Park",
    sport: 'Football',
    author: "Luke Karlovich",
    date: new Date(Date.now()),
    authorEmail: 'luke.karlovich@gmail.com'
  },
];

db.Game
  .remove({})
  .then(() => db.Game.collection.insertMany(gameSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });