import React, { useState } from "react";
import styles from "./CreateQuiz.module.css";

const CreateQuiz = () => {
  const [type, setType] = useState("");
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.createContainer}>
        <div className={styles.content}>
          <input type="text" placeholder="Quiz name" />
          <div className={styles.quizType}>
            <p className={styles.heading}>Quiz Type</p>
            <p
              className={`${styles.option} ${
                type === "q&a" ? styles.selected : ""
              } `}
              onClick={() => setType("q&a")}
            >
              Q & A
            </p>
            <p
              className={`${styles.option} ${
                type === "poll" ? styles.selected : ""
              } `}
              onClick={() => setType("poll")}
            >
              Poll Type
            </p>
          </div>
        </div>
        <div className={styles.quizBtns}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.continue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
