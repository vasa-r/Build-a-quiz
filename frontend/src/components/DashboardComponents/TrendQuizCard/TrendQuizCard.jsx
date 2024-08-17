import React from "react";
import styles from "./TrendQuizCard.module.css";
import Eye from "../../../assets/eyes.svg";

const TrendQuizCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.topData}>
        <p className={styles.title}>Quiz 1</p>
        <div className={styles.impressions}>
          <p className={styles.impression}>132</p>
          <img src={Eye} alt="eye icon" />
        </div>
      </div>
      <p className={styles.date}>Created on : 04 Sep, 2023</p>
    </div>
  );
};

export default TrendQuizCard;
