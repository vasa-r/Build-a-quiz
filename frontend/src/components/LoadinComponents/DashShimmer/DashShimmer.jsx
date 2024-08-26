import React from "react";
import styles from "./DashShimmer.module.css";

const DashShimmer = () => {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.top}>
        <div className={styles.topCard}></div>
        <div className={styles.topCard}></div>
        <div className={styles.topCard}></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
        <div className={styles.bottomCard}></div>
      </div>
    </div>
  );
};

export default DashShimmer;
