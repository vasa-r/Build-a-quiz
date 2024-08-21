import { configureStore } from "@reduxjs/toolkit";
import quizFieldSlice from "../slices/quizFieldSlice";
import quizQuestionSlice from "../slices/quizQuestionSlice";

const appStore = configureStore({
  reducer: {
    fields: quizFieldSlice,
    questions: quizQuestionSlice,
  },
});

export default appStore;
