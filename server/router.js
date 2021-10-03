const router = require('express').Router();
const controller = require('./controller');

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);
router.post('/qa/questions', controller.postQuestion);
router.post('/qa/questions/:question_id/answers', controller.postAnswer);
router.put('/qa/questions/:question_id/helpful', controller.updateQuestionHelpful);
router.put('/qa/answers/:answer_id/helpful', controller.updateAnswerHelpful);

module.exports.router = router;