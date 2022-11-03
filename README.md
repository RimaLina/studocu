# StuDocu acceptance tests

![UI tests](https://github.com/RimaLina/studocu/actions/workflows/playwright.yml/badge.svg)

Here is the instructions how to run acceptance tests.

## Setup
1. Clone the repository into your local directory. Use the command

    ```
    $ git clone https://github.com/RimaLina/studocu.git
    ```
2. In your terminal type to navigate into tests directory
    ```
    $ cd ui-tests
    ```
3. Then run command to install all packages
    ```
    $ npm ci
    ```
4. To run all tests use command
    ```
    $ npx playwright test
    ```
    If you want to run tests in one file, run the command
    ```
     $ npx playwright test <fileName.spec.ts>
    ```
    Tests will run in headless mode. 

## Acceptance tests
UI automated acceptance tests were written. 

Before automating tests I planned test cases and decided to group tests according the functions in the page: create, delete, sort, show questions and check default state.

These were my tests scenarios I automated:

1. check default state

    - check the title of page 

    - check if default question exists and its value

    - check if delault answer exists and its value

    - check count of questions in the list and in the sidetext

2. create questions

    - ckeck if count of questions is increased and question appears in the list if **valid** question is added
    - check if question and answer input fields are required 
    - check that identical question can be added
    
    More test cases can be added in the future, for example:

    - text length, maximum count of questions, entering text with other characters and so on. 

3. show answer

    - check if answers appear and disappear clicking on question

4. delete questions

    - check if delete button works 

    - check if no questions is shown in sidebar text

    - check if no questions warning message is shown

    - check if sort and delete buttons disappear after deletion

5. sort questions

    - check if questions are sorted correctly

    For this test case I use randomly generated strings for questions and answers which are sorted and placed in separate expected data file. Before I create these question-answer pairs in web page, I suffle the pairs and the do sort action, then compare actual and expected resuts. Also, clarfied that if questions are the same, they are not sorder according to their answers alfabetically. 

**Note:** another kind of acceptance tests such as unit, component, integration, API tests could not be written for this web page.

## CI
It took an extra few minutes to setup CI using Github Actions, results can be seen here https://github.com/RimaLina/studocu/actions 

![UI tests](https://github.com/RimaLina/studocu/actions/workflows/playwright.yml/badge.svg)

To make CI work I had to deploy frontend page using AWS S3 http://studocu-qa-deployment.s3-website.eu-central-1.amazonaws.com

Tests are configured to run on Chrome, Firefox and Safari browsers.


