const express = require("express");
const {
  updateAnalytic,
  getLiveQuiz,
} = require("../controllers/quizPublicController");

const quizPublicRouter = express.Router();

//to get single quiz for live
quizPublicRouter.get("/get-quiz/:quizId", getLiveQuiz);

//to update analytics
quizPublicRouter.put("/update-analytic/:quizId", updateAnalytic);

module.exports = quizPublicRouter;
