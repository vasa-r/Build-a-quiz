import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizName: "",
  quizType: "",
};

const quizFieldSlice = createSlice({
  name: "quizField",
  initialState,
  reducers: {
    setQuizName: (state, action) => {
      state.quizName = action.payload;
    },
    setQuizType: (state, action) => {
      state.quizType = action.payload;
    },
    setQuizData: (state, action) => {
      const { quizName, quizType } = action.payload;
      state.quizName = quizName;
      state.quizType = quizType;
    },
    resetQuizData: () => initialState,
  },
});

export const { setQuizName, setQuizType, setQuizData, resetQuizData } =
  quizFieldSlice.actions;

export default quizFieldSlice.reducer;
