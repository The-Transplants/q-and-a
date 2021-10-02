const router = require('express').Router();
const controller = require('./controller');

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);

module.exports.router = router;