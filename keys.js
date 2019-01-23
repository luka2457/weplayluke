require('dotenv').config({ path: 'process.env' });

var key =  {
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
};

module.exports = key;