const {Pool, Client} = require('pg');
const  password  = require('../config.js')

const pool = new Pool({
  user: 'postgres',
  host: '3.133.95.11',
  database: 'qa',
  password: '90248',
  port: 3002,
})

// const pool = new Pool({
//   user: 'sdc_server',
//   host: 'ec2-3-14-67-249.us-east-2.compute.amazonaws.com',
//   database: 'qa_remote',
//   password: password,
//   port: 5432,
// })


module.exports.pool = pool;