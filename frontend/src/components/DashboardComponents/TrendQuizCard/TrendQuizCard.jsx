import React from "react";
import styles from "./TrendQuizCard.module.css";
import Eye from "../../../assets/eyes.svg";
import { formatNumber, shrinkName } from "../../../utils/constants";

const TrendQuizCard = ({ quizName, createdTime, impressions }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.topData}>
        <p className={styles.title}>{shrinkName(quizName)}</p>
        <div className={styles.impressions}>
          <p className={styles.impression}>{formatNumber(impressions)}</p>
          <img src={Eye} alt="eye icon" />
        </div>
      </div>
      <p className={styles.date}>Created on : {createdTime}</p>
    </div>
  );
};

export default TrendQuizCard;
