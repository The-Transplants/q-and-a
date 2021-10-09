import http from "k6/http";
import { sleep, check } from "k6";
import getQuestionsTest from "./getQuestionsTest.js";
import getAnswersTest from "./getAnswersTest.js";
import postQuestion from "./postQuestion.js";

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 2000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
  thresholds: {
    http_req_duration: ['p(99)<50'], // 99% of requests must complete below 50ms
  },
};

export default function() {
    // getQuestionsTest();
    getAnswersTest();
    // postQuestion();
};