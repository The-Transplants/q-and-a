const router = require('express').Router();
const controller = require('./controller');

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);
router.post('/qa/questions', controller.postQuestion);

module.exports.router = router;