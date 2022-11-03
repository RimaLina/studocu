import { test, expect } from "@playwright/test";
import {
  checkQuestionsCount,
  questionnaireSelectors,
} from "../pages/questionnaire";

test.describe("default state", () => {
  test("should have one question when landing to the page", async ({
    page,
  }) => {
    await page.goto("/");

    const getTitle = await page.locator(questionnaireSelectors.HEADER);
    await expect(getTitle).toHaveText("The awesome Q/A tool");

    await checkQuestionsCount(page, 1);

    const getQuestion = await page.locator(questionnaireSelectors.QUESTIONS_Q);
    await expect(getQuestion).toContainText("How to add a question?");

    const getAnswer = await page.locator(questionnaireSelectors.QUESTIONS_A);
    await expect(getAnswer).not.toBeVisible();
  });
});
