import { test } from "@playwright/test";
import {
  checkIfAnswerIsAdded,
  checkIfQuestionIsAdded,
  checkQuestionsCount,
  fillInAnswer,
  fillInQuestion,
  fillInQuestionAndAnswer,
  submitForm,
} from "../pages/questionnaire";

test.describe("add questions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should have 2 questions in the list when new valid question is added", async ({
    page,
  }) => {
    await fillInQuestionAndAnswer(
      page,
      "Is it a new question?",
      "Yes, this is a new valid question"
    );
    await checkQuestionsCount(page, 2);
    await checkIfQuestionIsAdded(page, "Is it a new question?", 1);
    await checkIfAnswerIsAdded(page, "Yes, this is a new valid question", 1);
  });
  test("should not add a question if answer is missing", async ({ page }) => {
    await fillInQuestion(page, "Is it a rhetorical question?");
    await submitForm(page);
    await checkQuestionsCount(page, 1);
  });
  test("should not add question if question is missing", async ({ page }) => {
    await fillInAnswer(page, "I did not hear the question");
    await submitForm(page);
    await checkQuestionsCount(page, 1);
  });
  test("should be able to add identical question to questions list", async ({
    page,
  }) => {
    await fillInQuestionAndAnswer(
      page,
      "How to add a question?",
      "Just use the form below!"
    );
    await checkQuestionsCount(page, 2);
    await checkIfQuestionIsAdded(page, "How to add a question?", 1);
    await checkIfAnswerIsAdded(page, "Just use the form below!", 1);
  });
});
