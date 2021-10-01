const {Pool, Client} = require('pg');
const { password } = require('../config.js')

const pool = new Pool({
  user: 'lunghaolee',
  host: 'localhost',
  database: 'qa',
  password: password,
  port: 5432,
})

// pool.connect()
// .then( console.log('\nConnected to PG!', '🐘🥜') )
// .catch( err => console.log( err ));

module.exports.pool = pool;