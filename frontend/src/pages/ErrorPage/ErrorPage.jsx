import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import Sad from "../../assets/sad-emoji.png";

const ErrorPage = () => {
  return (
    <div className={styles.mainWrapper}>
      <img src={Sad} alt="sad emoji" className={styles.image} />
      <div className={styles.content}>
        <h2>Undefined is, unfortunately, not a function</h2>
        <p>
          You just <span>404'd</span>. Maybe you should headback to the{" "}
          <Link to={"/main/dashboard"}>Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
