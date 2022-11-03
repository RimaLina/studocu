import { expect, Page } from "@playwright/test";
import { getNumberFromString } from "../utils";

export const questionnaireSelectors = {
  HEADER: "header.header h1",
  SIDEBAR_TEXT: "div.sidebar",
  QUESTIONS: "div.questions ul li",
  QUESTIONS_Q: "ul li div.question__question",
  QUESTIONS_A: "ul li p.question__answer",
  SORT_BUTTON: "button.btn-primary",
  DELETE_BUTTON: "button.btn-danger",
  NO_QUESTIONS_WARNING: "div.alert-danger",
  FORM_INPUT_QUESTION: "id=question",
  FORM_INPUT_ANSWER: "id=answer",
  FORM_SUBMIT: "button[type=submit]",
};

export async function fillInQuestionsAndAnswers(page: Page, data) {
  for (const pair of data) {
    await fillInQuestionAndAnswer(page, pair.question, pair.answer);
  }
}

export async function sortQuestions(page: Page) {
  const getSortButton = await page.locator(questionnaireSelectors.SORT_BUTTON);
  await expect(getSortButton).toBeVisible();
  await getSortButton.click();
}

export async function fillInQuestionAndAnswer(
  page: Page,
  question: string,
  answer: string
) {
  await fillInQuestion(page, question);
  await fillInAnswer(page, answer);
  await submitForm(page);
}

export async function submitForm(page: Page) {
  const getCreateQuestionButton = await page.locator(
    questionnaireSelectors.FORM_SUBMIT
  );
  await getCreateQuestionButton.click();
}

export async function fillInAnswer(page: Page, answer: string) {
  const getAnswerField = await page.locator(
    questionnaireSelectors.FORM_INPUT_ANSWER
  );
  await getAnswerField.fill(answer);
  await expect(await getAnswerField.inputValue()).toBe(answer);
}

export async function fillInQuestion(page: Page, question: string) {
  const getQuestionField = await page.locator(
    questionnaireSelectors.FORM_INPUT_QUESTION
  );
  await getQuestionField.fill(question);
  await expect(await getQuestionField.inputValue()).toBe(question);
}

export async function checkQuestionsCount(page: Page, expectedCount: number) {
  const getSideText = await page
    .locator(questionnaireSelectors.SIDEBAR_TEXT)
    .innerText();
  await expect(getNumberFromString(getSideText)).toBe(expectedCount);

  const getListOfQuestions = await page.locator(
    questionnaireSelectors.QUESTIONS
  );
  await expect(await getListOfQuestions.count()).toBe(expectedCount || 0);
}

export async function checkEmptyQuestionsList(page: Page) {
  const getListOfQuestions = await page.locator(
    questionnaireSelectors.QUESTIONS
  );

  const getDeleteButton = await page.locator(
    questionnaireSelectors.DELETE_BUTTON
  );

  const getSortButton = await page.locator(questionnaireSelectors.SORT_BUTTON);

  const getWarning = await page.locator(
    questionnaireSelectors.NO_QUESTIONS_WARNING
  );

  await expect(await getListOfQuestions).not.toBeVisible();

  await expect(getWarning).toContainText("No questions yet :-(");

  await expect(getDeleteButton).not.toBeVisible();

  await expect(getSortButton).not.toBeVisible();
}

export async function checkIfQuestionIsAdded(
  page,
  question: string,
  position: number
) {
  const getQuestionsList = await page.locator(
    questionnaireSelectors.QUESTIONS_Q
  );
  expect(await getQuestionsList.nth(position).innerText()).toContain(question);
  await expect(await getQuestionsList.nth(position)).toBeVisible();
}

export async function checkIfAnswerIsAdded(
  page,
  answer: string,
  position: number
) {
  const getAnswersList = await page.locator(questionnaireSelectors.QUESTIONS_A);
  expect(await getAnswersList.nth(position).innerText()).toContain(answer);
  await expect(await getAnswersList.nth(position)).not.toBeVisible();
}

export async function deleteQuestions(page: Page) {
  const getDeleteButton = await page.locator(
    questionnaireSelectors.DELETE_BUTTON
  );
  await expect(getDeleteButton).toBeVisible();
  await getDeleteButton.click();
}
