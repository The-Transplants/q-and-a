const questions = require('./questions.js');
describe('GET /qa/question', () => {

  jest.setTimeout(90 * 1000);
  it('should return an array of objects with the correct properties', async () => {
    await questions.queryById(44388)
      .then(({ rows }) => {
        let result = rows[0];
        [
          ['question_id', 'number'],
          ['question_body', 'string'],
          ['question_date', 'string'],
          ['asker_name', 'string'],
          ['question_helpfulness', 'number'],
          ['reported', 'boolean'],
          ['answers', 'object']

        ].forEach(property => {
          let propName = property[0];
          let propType = property[1];
          expect(result).toHaveProperty(propName);
          expect(typeof result[propName]).toBe(propType);
        });
        /* answers */
        let resultAns = rows[0].answers;
        const count = 1;
        let testAns;
        for (let key in resultAns) {
          if (count === 1) {
            testAns = resultAns[key];
          }
        }
        [
          ['id', 'number'],
          ['body', 'string'],
          ['date', 'number'],
          ['answerer_name', 'string'],
          ['helpfulness', 'number'],
          ['photos', 'object']

        ].forEach(property => {
          let propName = property[0];
          let propType = property[1];
          expect(testAns).toHaveProperty(propName);
          expect(typeof testAns[propName]).toBe(propType);
        });

        /* photos */
        let testPhoto = testAns.photos;
        if (testPhoto.length) {
          testPhoto.forEach((photo) => {
            expect(typeof photo).toBe(string);
          })
        }

      })

  })

})

