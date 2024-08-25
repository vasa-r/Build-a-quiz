import React from "react";
import styles from "./LiveQuiz.module.css";
import Quiz from "../../components/LiveQuizComponents/Quiz/Quiz";
import QnaEnd from "../../components/LiveQuizComponents/QnaEnd/QnaEnd";
import PollEnd from "../../components/LiveQuizComponents/PollEnd/PollEnd";

const LiveQuiz = () => {
  return (
    <div className={styles.quizWrapper}>
      {/* <Quiz /> */}
      {/* <QnaEnd /> */}
      <PollEnd />
    </div>
  );
};

export default LiveQuiz;
