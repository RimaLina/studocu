import http from "k6/http";
import { config } from "../config";
/* @ts-ignore */
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.2/index.js";

export function getQuestions() {
  const res = http.get(`${config.baseURL}`);

  expect(res.status).to.equal(200);
  expect(res.body).to.not.be.null;

  const body = JSON.parse(res.body as string);

  return body;
}

export function addQuestion(body: { question: string; answer: string }) {
  const res = http.post(`${config.baseURL}`, JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });

  expect(res.status).to.equal(200);

  return res;
}

export function deleteQuestions() {
  const res = http.del(`${config.baseURL}`);

  expect(res.status).to.equal(200);

  return res;
}

export function sortQuestions() {
  const res = http.post(`${config.baseURL}/sort`);

  expect(res.status).to.equal(200);

  return res;
}
