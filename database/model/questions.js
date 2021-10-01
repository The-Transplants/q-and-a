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
        answers_id, json_build_object(
          'id', answers_id,
          'body', body ,
          'date', answer_date,
          'answerer_name', answerer_name,
          'helpfulness', helpfulness,
          'photos',
          (SELECT array(
            SELECT photos_url FROM photos WHERE photos.answers_id = answers.answers_id
          ) )
        )
        )
       AS answers FROM answers WHERE answers.question_id = questions.question_id)
      FROM questions WHERE product_id = $1`, [product_id])
     .then( data => {
      console.log(data.rows)
      resolve(data)} )
     .catch( reject );
   });
 }

}

  // `SELECT
  // question_id,
  // question_body,
  // question_date,
  // asker_name,
  // question_helpfulness,
  // reported,
  // (SELECT jsonb_object_agg(
  //   answers_id, json_build_object(
  //     'id', answers_id,
  //     'body', body ,
  //     'date', answer_date,
  //     'answerer_name', answerer_name,
  //     'helpfulness', helpfulness,
  //     'photos',
  //     (SELECT array(
  //       SELECT photos_url FROM photos WHERE photos.answers_id = answers.answers_id
  //     ) )
  //   )
  //   )
  //  AS answers FROM answers WHERE answers.question_id = questions.question_id)
  // FROM questions WHERE product_id = $1`


