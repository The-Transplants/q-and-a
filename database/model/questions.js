const {pool} = require('../');
module.exports = {

 'queryById': (product_id) => {
   return new Promise((resolve, reject) => {
     pool.query(
       `SELECT jsonb_build_object(
      'question_id', question_id,
      'question_body', question_body,
      'question_date', question_date,
      'asker_name', asker_name,
      'helpfulness', question_helpfulness,
      'reported', reported
       )  FROM questions WHERE product_id = $1`, [product_id])
     .then( data => resolve(data) )
     .catch( reject );
   });
 }

}

// SELECT jsonb_build_object(
//   'question_id', question_id,
//   'question_body', question_body,
//   'question_date', question_date,
//   'asker_name', asker_name,
//   'helpfulness', question_helpfulness,
//   'reported', reported

//    )  FROM questions WHERE product_id = 44388;