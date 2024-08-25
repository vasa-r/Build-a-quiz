import React from "react";
import styles from "./DashboardPage.module.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import DashArea from "../../components/DashboardComponents/DashArea/DashArea";
import CreateQuiz from "../../components/QuizComponents/CreateQuiz/CreateQuiz";
import QnaQuiz from "../../components/QuizComponents/QnaQuiz/QNAquiz";
import PollQuiz from "../../components/QuizComponents/PollQuiz/PollQuiz";
import QuizPublishedLink from "../../components/QuizComponents/QuizPublishedLink/QuizPublishedLink";

const DashboardPage = () => {
  return (
    <>
      {/* {<QnaQuiz />} */}
      {/* {<PollQuiz />} */}
      {<QuizPublishedLink />}
      <div className={styles.dashWrapper}>
        <div className={styles.sidebarContainer}>
          <SideBar />
        </div>
        <Routes>
          <Route path="dashboard" element={<DashArea />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
