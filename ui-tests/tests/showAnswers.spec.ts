import { test, expect } from "@playwright/test";
import { questionnaireSelectors } from "../pages/questionnaire";

test.describe("show answer", () => {
  test("should show answer when clicking on question", async ({ page }) => {
    await page.goto("/");

    const getQuestionsList = await page.locator(
      questionnaireSelectors.QUESTIONS_Q
    );
    getQuestionsList.click();

    expect(await getQuestionsList.innerText()).toContain(
      "How to add a question?"
    );
    await expect(getQuestionsList).toBeVisible();

    // check if answer is visible
    const getAnswerList = await page.locator(
      questionnaireSelectors.QUESTIONS_A
    );
    expect(await getAnswerList.innerText()).toContain(
      "Just use the form below!"
    );
    await expect(getAnswerList).toBeVisible();
  });
});
