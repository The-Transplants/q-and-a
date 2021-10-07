const {Pool, Client} = require('pg');
const  password  = require('../config.js')

// const pool = new Pool({
//   user: 'lunghaolee',
//   host: 'localhost',
//   database: 'qa',
//   password: password,
//   port: 5432,
// })

const pool = new Pool({
  user: 'sdc_server',
  host: 'ec2-3-14-67-249.us-east-2.compute.amazonaws.com',
  database: 'qa_remote',
  password: password,
  port: 5432,
})


module.exports.pool = pool;