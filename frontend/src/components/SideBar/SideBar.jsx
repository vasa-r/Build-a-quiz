import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SideBar = () => {
  const { logoutContext } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.title}>
        <h1>QUIZZIE</h1>
      </div>
      <div className={styles.navLinks}>
        <Link
          to="/main/dashboard"
          className={isActive("/main/dashboard") ? styles.activeNav : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/main/analytics"
          className={isActive("/main/analytics") ? styles.activeNav : ""}
        >
          Analytics
        </Link>
        <Link
          to="/main/quiz"
          className={isActive("/main/quiz") ? styles.activeNav : ""}
        >
          Create Quiz
        </Link>
      </div>
      <div className={styles.logout}>
        <hr />
        <h1 onClick={() => logoutContext()}>LOGOUT</h1>
      </div>
    </div>
  );
};

export default SideBar;
