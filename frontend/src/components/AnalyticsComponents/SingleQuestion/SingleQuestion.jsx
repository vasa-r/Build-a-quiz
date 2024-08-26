import React from "react";
import styles from "./SingleQuestion.module.css";

const SingleQuestion = ({ questionNo, analytics, quizType, question }) => {
  const {
    answeredCorrectly,
    answeredIncorrectly,
    peopleAttempted,
    optionChoosed,
  } = analytics;
  return (
    <div>
      <h1 className={styles.question}>
        Q.{questionNo} {question}
      </h1>
      {quizType === "qNa" && (
        <div className={styles.cardsContainer}>
          <div className={styles.dataContainer}>
            <h1>{peopleAttempted}</h1>
            <p>people Attempted the question</p>
          </div>
          <div className={styles.dataContainer}>
            <h1>{answeredCorrectly}</h1>
            <p>people Answered Correctly</p>
          </div>
          <div className={styles.dataContainer}>
            <h1>{answeredIncorrectly}</h1>
            <p>people Answered Incorrectly</p>
          </div>
        </div>
      )}
      {quizType === "poll" && (
        <div className={styles.pollCards}>
          {optionChoosed.length < 1 && (
            <p className={styles.noData}>No data avialable yet</p>
          )}
          {optionChoosed.map((option, index) => {
            return (
              <div key={index} className={styles.pollCard}>
                <h1>{option}</h1>
                <p>Option {index + 1} </p>
              </div>
            );
          })}
        </div>
      )}

      <hr />
    </div>
  );
};

export default SingleQuestion;
