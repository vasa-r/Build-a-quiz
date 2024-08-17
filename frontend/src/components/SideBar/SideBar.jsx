import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isActive, setIsActive] = useState("dashboard");

  const handleClick = (navItem) => {
    setIsActive(navItem);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.title}>
        <h1>QUIZZIE</h1>
      </div>
      <div className={styles.navLinks}>
        <Link
          to="/dashboard"
          className={isActive === "dashboard" ? styles.activeNav : ""}
          onClick={() => handleClick("dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to="/analytics"
          className={isActive === "analytics" ? styles.activeNav : ""}
          onClick={() => handleClick("analytics")}
        >
          Analytics
        </Link>
        <Link
          to="/createQuiz"
          className={isActive === "createQuiz" ? styles.activeNav : ""}
          onClick={() => handleClick("createQuiz")}
        >
          Create Quiz
        </Link>
      </div>
      <div className={styles.logout}>
        <hr />
        <h1>LOGOUT</h1>
      </div>
    </div>
  );
};

export default SideBar;
