import React from "react";
import styles from "./LiveQuiz.module.css";
import Quiz from "../../components/LiveQuizComponents/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";

const LiveQuiz = () => {
  return (
    <div className={styles.quizWrapper}>
      <Routes>
        <Route path="/:id" element={<Quiz />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default LiveQuiz;
