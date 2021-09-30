const {Pool, Client} = require('pg');
const { password } = require('../config.js')

const pool = new Pool({
  user: 'lunghaolee',
  host: 'localhost',
  database: 'qa',
  password: password,
  port: 5432,
})


module.exports.pool = pool;