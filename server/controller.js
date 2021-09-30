const questions = require('../database/model/questions.js');

module.exports = {
  'getQuestions': (req, res, next) => {
    questions.queryById(req.query.product_id)
    .then( data => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    })
    .catch( err => console.log(err));
  }
}