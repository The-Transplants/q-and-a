const http = require('k6/http');
const {sleep} = require('k6');

export default function () {
  http.get('http://ec2-3-144-80-220.us-east-2.compute.amazonaws.com/qa/questions/?product_id=44388');
  sleep(1);
}