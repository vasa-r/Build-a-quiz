const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const validateNewQuiz = require("../middleware/validateNewQuiz");
const validateUpdateQuiz = require("../middleware/validateUpdateQuiz");
const {
  getAllQuiz,
  getSingleQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizControllers");

const quizRouter = express.Router();

//get quiz
quizRouter.get("/get-all", getAllQuiz);

//get single quiz
quizRouter.get("/get-one/:quizId", getSingleQuiz);

//create quiz
quizRouter.post("/create", validateNewQuiz, createQuiz);

//update quiz
quizRouter.put("/update/:quizId", validateUpdateQuiz, updateQuiz);

//delete quiz
quizRouter.delete("/delete/:quizId", deleteQuiz);

module.exports = quizRouter;
