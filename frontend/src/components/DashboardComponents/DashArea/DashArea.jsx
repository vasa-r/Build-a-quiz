import React from "react";
import styles from "./DashArea.module.css";
import TrendQuizCard from "../TrendQuizCard/TrendQuizCard";
import DeleteQuizModal from "../../AnalyticsComponents/DeleteQuizModal/DeleteQuizModal";

const DashArea = () => {
  return (
    <>
      <div className={styles.dashAreaWrapper}>
        <div className={styles.stats}>
          <div className={`${styles.totalQuiz} ${styles.statsContainer}`}>
            <h1>
              <span>12 </span>Quiz <br /> Created
            </h1>
          </div>
          <div className={`${styles.totalQuestions} ${styles.statsContainer}`}>
            <h1>
              <span>120 </span>questions <br /> Created
            </h1>
          </div>
          <div
            className={`${styles.totalImpressions} ${styles.statsContainer}`}
          >
            <h1>
              <span>129 </span>Total <br /> Impressions
            </h1>
          </div>
        </div>
        <div className={styles.trending}>
          <h1>Trending Quizs</h1>
          <div className={styles.trendingQuiz}>
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
            <TrendQuizCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashArea;
