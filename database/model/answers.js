const { pool } = require('../');
module.exports = {

  'queryById': (question_id, page = 1, count = 5) => {
    return new Promise((resolve, reject) => {
      pool.query(`
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
              ) FROM photos WHERE photos.answer_id = answers.answer_id
          )
        AS photos
        )


   FROM answers WHERE answers.question_id = $1
   LIMIT $2)
     `, [question_id, (page * count)])
        .then(data => {
          let result = {
            "question": question_id,
            "page": page,
            "count": parseInt(count),
            "results": data.rows
          };
          return resolve(result)
        })
        .catch(reject);
    });
  },
  'postAnswer': (question_id, body, name, email, photos = []) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT setval('answers_answer_id_seq', (SELECT MAX(answer_id) from answers));`
      )
        .then((data) => {
          return (pool.query(
            `INSERT INTO answers(body, answerer_name, answerer_email, question_id)
              VALUES ($1, $2, $3, $4)`
            , [body, name, email, question_id])
            .catch(err => console.error(err))
          )
        }
        )
        .then((data) => {
          for (let i = 0; i < photos.length; i++) {
            pool.query(
              `SELECT setval('photos_id_seq', (SELECT MAX(id) from photos));`
            ).then((data) => {
              return (pool.query(
                ` INSERT INTO photos(photos_url, answer_id)
                  VALUES ($1, (SELECT MAX(answer_id) from answers))`, [photos[i]])
              )
            })
              .catch((err) => console.error(err));
          }
          resolve();
        })
        .catch((err) => reject());

    });

  },
  'updateHelpful': (answer_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1;`, [answer_id])

        .then(data => resolve(data))
        .catch(reject);
    });
  },
  'updateReport': (answer_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE answers SET reported = true WHERE answer_id = $1;`, [answer_id])

        .then(data => resolve(data))
        .catch(reject);
    });
  }

}
