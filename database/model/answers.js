const {pool} = require('../');
module.exports = {

 'queryById': (question_id) => {
   return new Promise((resolve, reject) => {
     pool.query( `
     (SELECT


        answer_id,
        body ,
        date,
        answerer_name,
        helpfulness,

        (SELECT
          array(
             SELECT jsonb_build_object(
                'id', id,
                'url', photos_url
              )
          )
        AS photos FROM photos WHERE photos.answer_id = answers.answer_id
        )


   FROM answers WHERE answers.question_id = $1)
     `, [question_id])
     .then( data => resolve(data) )
     .catch( reject );
   });
 }

}



// (SELECT

//     jsonb_build_object(
//       'answer_id', answers_id,
//       'body', body ,
//       'date', answer_date,
//       'answerer_name', answerer_name,
//       'helpfulness', helpfulness,
//       'photos',
//       (SELECT
//         array(
//            SELECT jsonb_build_object(
//               'id', id,
//               'url', photos_url
//             )
//         )
//        FROM photos WHERE photos.answers_id = answers.answers_id
//       )
//     )

//  FROM answers WHERE answers.question_id = questions.question_id)




