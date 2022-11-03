import { test, expect } from "@playwright/test";
import {
  checkEmptyQuestionsList,
  checkIfQuestionIsAdded,
  checkQuestionsCount,
  deleteQuestions,
  questionnaireSelectors,
} from "../pages/questionnaire";

test.describe("default state", () => {
  test("should have one question when landing to the page", async ({
    page,
  }) => {
    await page.goto("/");
    await checkQuestionsCount(page, 1);
    await checkIfQuestionIsAdded(page, "How to add a question?", 0);

    const getSortButton = await page.locator(
      questionnaireSelectors.SORT_BUTTON
    );

    await expect(getSortButton).toBeVisible();
    await deleteQuestions(page);
    await checkQuestionsCount(page, NaN);
    await checkEmptyQuestionsList(page);
  });
});
