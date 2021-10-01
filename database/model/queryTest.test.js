const questions = require('./questions.js');

it('should return an array of objects with the correct properties', async ()=>{
  await questions.queryById(44388)
  .then( ({rows}) => {
    let result  = rows[0].jsonb_build_object;

    [
      ['question_id', 'number'],
      ['question_body', 'string'],
      ['question_date', 'number'],
      ['asker_name', 'string'],
      ['helpfulness', 'number'],
      ['reported', 'boolean']

    ].forEach( property =>{
      let propName = property[0];
      let propType = property[1];
      expect( result ).toHaveProperty( propName );
      expect( typeof result[propName] ).toBe( propType );
    });

  })

});

// SELECT jsonb_build_object(
//   'question_id', question_id,
//   'question_body', question_body,
//   'question_date', question_date,
//   'asker_name', asker_name,
//   'helpfulness', question_helpfulness,
//   'reported', reported

//    )  FROM questions WHERE product_id = 44388;