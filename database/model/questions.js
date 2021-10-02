const {pool} = require('../');
module.exports = {

 'queryById': (product_id) => {
   return new Promise((resolve, reject) => {
     pool.query(
      `SELECT
      question_id,
      question_body,
      question_date,
      asker_name,
      question_helpfulness,
      reported,
      (SELECT jsonb_object_agg(
        answer_id, json_build_object(
          'id', answer_id,
          'body', body ,
          'date', date,
          'answerer_name', answerer_name,
          'helpfulness', helpfulness,
          'photos',
          (SELECT array(
            SELECT photos_url FROM photos WHERE photos.answer_id = answers.answer_id
          ) )
        )
        )
       AS answers FROM answers WHERE answers.question_id = questions.question_id)
      FROM questions WHERE product_id = $1`, [product_id])
     .then( data => resolve(data) )
     .catch( reject );
   });
 }

}




