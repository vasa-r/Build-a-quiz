import React from "react";
import styles from "./QnaEnd.module.css";
import Trophy from "../../../assets/trophy-icon.png";

const QnaEnd = ({ correctAnswers, totalQuestions }) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>Congrats Quiz is completed</h1>
        <img src={Trophy} alt="trophy cup" />
        <h1>
          Your Score is{" "}
          <span>
            0{correctAnswers}/0{totalQuestions}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default QnaEnd;
