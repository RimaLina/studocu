import { test, expect } from "@playwright/test";
import { shuffle } from "../utils";
import { promises as fs } from "fs";
import {
  fillInQuestionsAndAnswers,
  questionnaireSelectors,
  sortQuestions,
} from "../pages/questionnaire";

test.describe("sort questions", () => {
  test("should have one question when landing to the page", async ({
    page,
  }) => {
    await page.goto("/");

    const dataset = await fs.readFile("./sortedQuestionsData.ts");
    const data: { question: string; answer: string }[] = dataset
      .toString()
      .split("\n")
      .map((l) => ({ question: l.split(",")[0], answer: l.split(",")[1] }));

    const insertData = shuffle(
      data.filter((x) => !x.question.includes("How to add a question"))
    );

    await fillInQuestionsAndAnswers(page, insertData);
    await sortQuestions(page);

    const getQuestionList = await page.locator(
      questionnaireSelectors.QUESTIONS_Q
    );
    const questionCount = await getQuestionList.count();

    for (let i = 0; i < questionCount; i++) {
      await expect(await getQuestionList.nth(i)).toHaveText(data[i].question);
    }
  });
});
