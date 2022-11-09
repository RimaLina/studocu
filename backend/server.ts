import Koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new koaRouter();

let db = [
  { question: "How to add a question?", answer: "Just use the form below!" },
];

router.post("addQuestion", "/", (context) => {
  console.log((context.request as any).body);
  db.push((context.request as any).body);
  context.status = 200;
});

router.get("getQuestions", "/", (context) => {
  context.body = db.length ? db : "No questions yet :-(";
});

router.delete("deleteQuestions", "/", (context) => {
  db = [];
  context.status = 200;
});

router.post("sortQuestions", "/sort", (context) => {
  db.sort(function (a, b) {
    return a.question.toLowerCase() < b.question.toLowerCase()
      ? -1
      : a.question.toLowerCase() > b.question.toLowerCase()
      ? 1
      : 0;
  });
  context.status = 200;
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is up");
