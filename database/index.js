const {Pool, Client} = require('pg');
const { password } = require('../config.js')

const pool = new Pool({
  user: 'lunghaolee',
  host: 'localhost',
  database: 'qa',
  password: password,
  port: 5432,
})

pool.query('SELECT NOW();', (err, res) => {
  console.log(err, res.rows);
  pool.end();
})