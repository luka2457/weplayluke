// Node Mailer
var nodemailer = require('nodemailer');
var key = require('../keys');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: key.username,
    pass: key.password
  }
});

module.exports = transporter;