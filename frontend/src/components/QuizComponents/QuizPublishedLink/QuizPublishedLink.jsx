import React from "react";
import styles from "./QuizPublishedLink.module.css";
import Close from "../../../assets/close.svg";

const QuizPublishedLink = () => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.mainContainer}>
        <img src={Close} alt="close modal" />
        <h1>
          Congrats your Quiz is <br /> Published!
        </h1>
        <div className={styles.link}>your link is here</div>
        <button className={styles.share}>Share</button>
      </div>
    </div>
  );
};

export default QuizPublishedLink;
