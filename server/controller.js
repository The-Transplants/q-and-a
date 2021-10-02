const questions = require('../database/model/questions.js');
const answers = require('../database/model/answers.js');

module.exports = {
  'getQuestions': (req, res, next) => {
    questions.queryById(req.query.product_id)
    .then( data => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    })
    .catch( err => console.log(err));
  },
  'getAnswers': (req, res, next) => {
    answers.queryById(req.params.question_id)
    .then( data => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    })
    .catch( err => console.log(err));
  }
}