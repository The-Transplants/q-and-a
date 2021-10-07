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
     .then( data => {
      let result = {
        "product_id": product_id,
        "results": data.rows
      };
      return resolve(result)} )
     .catch( reject );
   });
 },

 'postQuestion': (product_id, body, name, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT setval('Questions_question_id_seq', (SELECT MAX(question_id) from questions));`
      )
      .then((data) => {
        return (
          pool.query(
            `
           INSERT INTO questions(product_id, question_body, asker_name, asker_email)
           VALUES ($1, $2, $3, $4)`, [product_id, body, name, email])
           .catch(err => console.error(err))
        )
      })
      .then( data => resolve() )
      .catch( err => reject() );
  });
},

'updateHelpful': (question_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1;`, [question_id])

    .then( data => resolve(data) )
    .catch( reject );
  });
},

'updateReport': (question_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE questions SET reported = true WHERE question_id = $1;`, [question_id])

    .then( data => resolve(data) )
    .catch( reject );
  });


}
}



