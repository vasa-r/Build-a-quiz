const validateUpdateQuiz = (req, res, next) => {
  const { quizName, quizType, quizQuestions } = req.body;
  try {
    if (!quizQuestions) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    for (const question of quizQuestions) {
      if (
        !question.questionNo ||
        !question.question ||
        !question.options ||
        question.options.length === 0 ||
        (question.correctAnswer !== null &&
          typeof question.correctAnswer !== "number")
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide all the required fields for each question here",
        });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = validateUpdateQuiz;
