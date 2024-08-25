import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    questionNo: 1,
    question: "",
    optionType: "text",
    options: {
      text: ["", ""],
      image: ["", ""],
    },
    correctAnswer: "",
    timer: null,
  },
];

const quizQuestionSlice = createSlice({
  name: "quizQuestion",
  initialState,
  reducers: {
    addQuestions: (state) => {
      const newQuestion = {
        questionNo: state.length + 1,
        question: "",
        optionType: "text",
        options: {
          text: ["", ""],
          image: ["", ""],
        },
        correctAnswer: "",
        timer: null,
      };
      state.push(newQuestion);
    },
    removeQuestion: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
      state.forEach((item, index) => {
        item.questionNo = index + 1;
      });
    },
    updateQuestion: (state, action) => {
      const {
        questionNo,
        question,
        optionType,
        optionIndex,
        option,
        fieldType,
        index,
        time,
      } = action.payload;
      const qstn = state.find((question) => question.questionNo === questionNo);
      if (qstn) {
        if (question !== undefined) {
          qstn.question = question;
        }
        if (optionType !== undefined) {
          qstn.optionType = optionType;
        }

        if (index !== undefined) {
          qstn.correctAnswer = index + 1;
        }

        if (time !== undefined) {
          qstn.timer = time;
        }

        if (optionType && optionIndex !== undefined && option !== undefined) {
          if (optionType === "text" || optionType === "image") {
            qstn.options[optionType][optionIndex] = option;
          } else if (optionType === "textNimage") {
            if (fieldType === "text") {
              qstn.options["text"][optionIndex] = option;
            } else if (fieldType === "image") {
              qstn.options["image"][optionIndex] = option;
            }
          }
        }
      }
    },
    resetOptions: (state, action) => {
      const { questionNo, optionType } = action.payload;
      const qstn = state.find((question) => question.questionNo === questionNo);
      if (qstn && optionType) {
        qstn.options["text"] = ["", ""];
        qstn.options["image"] = ["", ""];
      }
    },
    addOptions: (state, action) => {
      const { questionNo, optionType } = action.payload;
      const qstn = state.find((q) => q.questionNo === questionNo);
      if (qstn && optionType) {
        qstn.options["text"].push("");
        qstn.options["image"].push("");
      }
    },
    removeOptions: (state, action) => {
      const { index, questionNo, optionType } = action.payload;
      const qstn = state.find((question) => question.questionNo === questionNo);
      if (qstn && optionType) {
        qstn.options["text"].splice(index, 1);
        qstn.options["image"].splice(index, 1);
      }
    },
  },
});

export const {
  addQuestions,
  removeQuestion,
  updateQuestion,
  addOptions,
  removeOptions,
  resetOptions,
} = quizQuestionSlice.actions;

export default quizQuestionSlice.reducer;
