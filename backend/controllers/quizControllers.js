const { format } = require("date-fns");
const Quiz = require("../model/quizModel");

const getAllQuiz = async (req, res, next) => {
  const userId = req.user;
  try {
    const quizzes = await Quiz.find({ createdBy: userId }).lean();

    if (!quizzes) {
      return res.status(400).json({
        success: false,
        message: "No quizzes available yet",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully",
      data: quizzes,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleQuiz = async (req, res, next) => {
  const { quizId } = req.params;
  const userId = req.user;
  try {
    const quiz = await Quiz.findOne({ _id: quizId, createdBy: userId });
    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "No quizzes available yet",
      });
    }

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

const createQuiz = async (req, res, next) => {
  const { quizName, quizType, quizQuestions } = req.body;
  const createdBy = req.user;
  const createdTime = format(new Date(), "dd MMM, yyy");

  try {
    const createQuiz = await Quiz.create({
      quizName: quizName,
      quizType: quizType,
      createdBy: createdBy,
      createdTime: createdTime,
      quizQuestions: quizQuestions,
    });

    if (!createQuiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz creation failed. Please try again later",
      });
    }

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: createQuiz,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  const { quizQuestions } = req.body;
  const { quizId } = req.params;
  const userId = req.user;
  try {
    const quiz = await Quiz.findOne({
      _id: quizId,
      createdBy: userId,
    });

    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz not exist. Please create one",
      });
    }

    quiz.quizQuestions = quizQuestions;

    const updatedQuiz = await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz Updated Successfully",
      data: updatedQuiz,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  const { quizId } = req.params;
  try {
    const deleteQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deleteQuiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz not deleted. Please try again later",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllQuiz,
  getSingleQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
