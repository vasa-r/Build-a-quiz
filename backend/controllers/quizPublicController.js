const Quiz = require("../model/quizModel");
const mongoose = require("mongoose");

const getLiveQuiz = async (req, res, next) => {
  const { quizId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID is invalid. Please don't modify ID.",
      });
    }
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz not found",
      });
    }

    quiz.impressions++;
    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz fetched successfully",
      data: quiz,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAnalytic = async (req, res, next) => {
  const {
    questionNo,
    peopleAttempted,
    answeredCorrectly,
    answeredIncorrectly,
    optionChoosed,
  } = req.body;

  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz not found",
      });
    }

    //to get particular question
    const question = quiz.quizQuestions.find(
      (q) => q.questionNo === questionNo
    );

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question not found",
      });
    }

    // Initialize optionChoosed if not already initialized
    if (!Array.isArray(question.analytics.optionChoosed)) {
      question.analytics.optionChoosed = new Array(
        Math.max(optionChoosed.length, 0)
      ).fill(0);
    }

    //update the analytics
    if (peopleAttempted !== undefined) {
      question.analytics.peopleAttempted += peopleAttempted;
    }
    if (answeredCorrectly !== undefined) {
      question.analytics.answeredCorrectly += answeredCorrectly;
    }
    if (answeredIncorrectly !== undefined) {
      question.analytics.answeredIncorrectly += answeredIncorrectly;
    }
    if (optionChoosed !== undefined && Array.isArray(optionChoosed)) {
      const maxLength = Math.max(
        question.analytics.optionChoosed.length,
        optionChoosed.length
      );
      question.analytics.optionChoosed = Array.from(
        { length: maxLength },
        (_, index) =>
          (question.analytics.optionChoosed[index] || 0) +
          (optionChoosed[index] || 0)
      );
    }

    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: quiz,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getLiveQuiz, updateAnalytic };
