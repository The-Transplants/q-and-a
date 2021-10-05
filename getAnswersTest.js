const http = require('k6/http');
const {sleep} = require('k6');


export default function () {
  http.get('http://localhost:3000/qa/questions/156318/answers');
  sleep(1);
}