const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  quizName: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    enum: ["qNa", "poll"],
    required: true,
  },
  impressions: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdTime: {
    type: String,
    required: true,
  },
  quizQuestions: [
    {
      _id: false,
      questionNo: {
        type: Number,
        required: true,
        unique: false,
      },
      question: {
        type: String,
        required: true,
      },
      optionType: {
        type: String,
        enum: ["text", "image", "textNimage"],
        required: true,
      },
      options: {
        text: {
          type: [String],
          default: [],
        },
        image: {
          type: [String],
          default: [],
        },
      },
      correctAnswer: {
        type: Number,
        required: true,
      },
      timer: {
        type: Number,
        default: null,
      },
      analytics: {
        _id: false,
        peopleAttempted: {
          type: Number,
          default: 0,
        },
        answeredCorrectly: {
          type: Number,
          default: 0,
        },
        answeredIncorrectly: {
          type: Number,
          default: 0,
        },
        optionChoosed: {
          type: [Number],
          default: [],
        },
      },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
