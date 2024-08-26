import React from "react";
import styles from "./QuestionAnalysShimmer.module.css";

const QuestionAnalysShimmer = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.centerItems}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div className={styles.mainContainer} key={`container-${i}`}>
              {Array(4)
                .fill(null)
                .map((_, j) => (
                  <div className={styles.card} key={`card-${i}-${j}`}></div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionAnalysShimmer;
