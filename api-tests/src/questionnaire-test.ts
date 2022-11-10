import { check } from "k6";
import {
  getQuestions,
  addQuestion,
  deleteQuestions,
  sortQuestions,
} from "../pages/questionnaire";

/* @ts-ignore */
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.2/index.js";

export default () => {
  getQuestions();

  let body = {
    question: "alio?",
    answer: "valio",
  };

  addQuestion(body);

  sortQuestions();

  deleteQuestions();

};
