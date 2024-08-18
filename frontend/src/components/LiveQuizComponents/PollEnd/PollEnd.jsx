import React from "react";
import styles from "./PollEnd.module.css";

const PollEnd = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContainer}>
        <h1>
          Thank you <br /> for participating in <br /> the Poll
        </h1>
      </div>
    </div>
  );
};

export default PollEnd;
