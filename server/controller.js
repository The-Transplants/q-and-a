const questions = require('../database/model/questions.js');
const answers = require('../database/model/answers.js');

module.exports = {
  'getQuestions': (req, res, next) => {
    questions.queryById(req.query.product_id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => console.log(err));
  },
  'getAnswers': (req, res, next) => {
    answers.queryById(req.params.question_id, req.query.page, req.query.count)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => console.log(err));
  },
  'postQuestion': (req, res, next) => {
    let { product_id, body, name, email } = req.body;
    questions.postQuestion(product_id, body, name, email)
      .then(data => {
        res.sendStatus(201);
      })
      .catch(err => console.log(err));
  },
  'postAnswer': (req, res, next) => {
    let { question_id } = req.params;
    let { body, name, email, photos } = req.body;
    answers.postAnswer(question_id, body, name, email, photos)
      .then(data => {
        res.sendStatus(201);
      })
      .catch(err => console.log(err));
  },
  'updateQuestionHelpful': (req, res, next) => {
    let { question_id } = req.params;
    questions.updateHelpful(question_id)
      .then(data => {
        res.sendStatus(204).send('NO CONTENT');
      })
      .catch(err => console.log(err));
  },
  'updateAnswerHelpful': (req, res, next) => {
    let { answer_id } = req.params;
    answers.updateHelpful(answer_id)
      .then(data => {
        res.sendStatus(204).send('NO CONTENT');
      })
      .catch(err => console.log(err));
  },
  'updateQuestionReport': (req, res, next) => {
    let { question_id } = req.params;
    questions.updateReport(question_id)
      .then(data => {
        res.sendStatus(204).send('NO CONTENT');
      })
      .catch(err => console.log(err));
  },
  'updateAnswerReport': (req, res, next) => {
    let { answer_id } = req.params;
    answers.updateReport(answer_id)
      .then(data => {
        res.sendStatus(204).send('NO CONTENT');
      })
      .catch(err => console.log(err));
  }
}