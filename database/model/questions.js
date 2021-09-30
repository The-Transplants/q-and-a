const {pool} = require('../');
module.exports = {

 'queryById': (product_id) => {
   return new Promise((resolve, reject) => {
     pool.query('SELECT * FROM questions WHERE product_id=$1;', [product_id])
     .then( data => resolve(data) )
     .catch( reject );
   });
 }

}