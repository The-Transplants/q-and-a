const http = require('k6/http');
const {sleep} = require('k6');

export default function () {
  http.get('http://localhost:3000/qa/questions/?product_id=44388');
  sleep(1);
}