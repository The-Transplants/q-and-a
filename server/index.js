const express = require('express');
const path = require('path');
const  pool  = require('../database/index.js')
const {router} = require('./router');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Got ${req.method} on ${req.url}`);
  next();
});
app.use('/', router);

app.listen(port, () => {
  console.log('Listening on http://localhost:' + port + '/');
});

// pool.query('SELECT NOW();', (err, res) => {
//   console.log(err, res.rows);
//   pool.end();
// })