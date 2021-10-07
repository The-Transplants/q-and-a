import http from 'k6/http';

export default function () {
  var url = 'http://localhost:3000/qa/questions';
  var payload = JSON.stringify({
    "product_id": 44392,
    "body": "testing for query",
    "name": "jayChou",
    "email": "somewhere@zmail.com"
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}