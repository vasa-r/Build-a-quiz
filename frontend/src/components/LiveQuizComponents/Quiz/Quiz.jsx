import React, { useState } from "react";
import styles from "./Quiz.module.css";
import sample from "../../../assets/trophy-icon.png";

const Quiz = () => {
  const [selected, setSelected] = useState(1);
  const [optionType, setOptionType] = useState("text");
  return (
    <div className={styles.quizWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.topData}>
          <div className={styles.qstnNumber}>01/04</div>
          <div className={styles.timer}>00:10s</div>
        </div>
        <h1 className={styles.question}>
          Your question text comes here, its a sample text.
        </h1>
        {optionType === "text" && (
          <>
            <div className={styles.answerOptions}>
              <div
                className={`${styles.option} ${
                  selected === 1 ? styles.selectedOption : ""
                }`}
              >
                Option 1
              </div>
              <div className={styles.option}>Option 1</div>
              <div className={styles.option}>Option 1</div>
              <div className={styles.option}>Option 1</div>
            </div>
          </>
        )}
        {optionType === "image" && (
          <>
            <div className={styles.answerImageOptions}>
              <div className={styles.imageOption}>
                <img
                  className={selected === 1 ? styles.selectedOption : ""}
                  src={sample}
                  alt="option 1"
                />
              </div>
              <div className={styles.imageOption}>
                <img src={sample} alt="option 2" />
              </div>
              <div className={styles.imageOption}>
                <img src={sample} alt="option 3" />
              </div>
              <div className={styles.imageOption}>
                <img src={sample} alt="option 4" />
              </div>
            </div>
          </>
        )}
        {optionType === "textNimage" && (
          <>
            <div className={styles.answerImageOptions}>
              <div
                className={`${styles.textNimageOption} ${
                  selected === 1 ? styles.selectedOption : ""
                }`}
              >
                <p>Sample image</p>
                <img src={sample} alt="option 1" />
              </div>
              <div className={styles.textNimageOption}>
                <p>Sample image</p>
                <img src={sample} alt="option 2" />
              </div>
              <div className={styles.textNimageOption}>
                <p>Sample image</p>
                <img src={sample} alt="option 3" />
              </div>
              <div className={styles.textNimageOption}>
                <p>Sample image</p>
                <img src={sample} alt="option 4" />
              </div>
            </div>
          </>
        )}
        <button className={styles.LiveQuizButton}>NEXT</button>
      </div>
    </div>
  );
};

export default Quiz;
